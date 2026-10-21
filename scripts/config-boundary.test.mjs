import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

test("Next enforces configuration bootstrap and the server/client boundary", async (t) => {
  const fixture = mkdtempSync(join(tmpdir(), "transport-config-boundary-"));
  // Own temporary synthetic fixture only; never touch live build caches/env files.
  t.after(() => rmSync(fixture, { recursive: true, force: true }));
  const paths = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: root, encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean);
  for (const path of new Set(paths)) {
    if (
      /^(?:.*\/)?\.env(?:\..*)?$/.test(path) &&
      !path.endsWith("/.env.example") &&
      path !== ".env.example"
    ) {
      throw new Error("Refusing to copy an actual environment file");
    }
    const source = join(root, path);
    if (!existsSync(source)) continue;
    const target = join(fixture, path);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
  symlinkSync(
    resolve(root, "node_modules"),
    join(fixture, "node_modules"),
    "dir",
  );
  const environment = Object.fromEntries(
    ["PATH", "HOME", "TMPDIR", "SystemRoot"]
      .filter((key) => process.env[key] !== undefined)
      .map((key) => [key, process.env[key]]),
  );
  environment.NEXT_TELEMETRY_DISABLED = "1";
  const sentinels = [
    "synthetic-private-service-boundary-sentinel",
    "synthetic-private-cloud-boundary-sentinel",
    "synthetic-private-db-boundary-sentinel",
  ];
  const configured = {
    ...environment,
    APP_ENV: "preview",
    VERCEL_ENV: "preview",
    SUPABASE_ENV: "preview",
    SUPABASE_URL: "https://synthetic-preview.supabase.invalid",
    SUPABASE_PUBLISHABLE_KEY: "synthetic-publishable-key",
    SUPABASE_SERVICE_ROLE_KEY: sentinels[0],
    DATABASE_ENV: "preview",
    DATABASE_PROJECT_REF: "abcdefghijklmnopqrst",
    DATABASE_URL: `postgresql://tm_runtime.abcdefghijklmnopqrst:${sentinels[2]}@aws-0-test.pooler.supabase.com:6543/postgres`,
    CLOUDINARY_ENV: "preview",
    CLOUDINARY_CLOUD_NAME: "synthetic-preview-cloud",
    CLOUDINARY_API_KEY: "synthetic-api-key",
    CLOUDINARY_API_SECRET: sentinels[1],
  };
  const build = (env) => {
    const result = spawnSync("npm", ["run", "build"], {
      cwd: fixture,
      env,
      encoding: "utf8",
      timeout: 180_000,
      maxBuffer: 5 * 1024 * 1024,
    });
    assert.ifError(result.error);
    return { status: result.status, output: result.stdout + result.stderr };
  };

  await t.test(
    "build fails fast for missing APP_ENV without printing supplied secrets",
    () => {
      const { APP_ENV: omitted, ...missingEnvironment } = configured;
      assert.equal(omitted, "preview");
      const result = build(missingEnvironment);
      assert.notEqual(result.status, 0);
      assert.match(
        result.output,
        /Missing required server configuration: APP_ENV/,
      );
      for (const value of sentinels) assert.ok(!result.output.includes(value));
    },
  );

  await t.test(
    "the shell builds with APP_ENV only and no provider credentials",
    () => {
      const result = build({ ...environment, APP_ENV: "test" });
      assert.equal(result.status, 0, result.output);
      const html = readFileSync(
        join(fixture, "apps/web/.next/server/app/index.html"),
        "utf8",
      );
      assert.match(html, /No operational data is displayed/);
    },
  );

  const probe = join(
    fixture,
    "apps/web/src/app/config-boundary-probe/page.tsx",
  );
  mkdirSync(dirname(probe), { recursive: true });
  writeFileSync(
    probe,
    `import { getServerConfig } from "@/server/config";
export default function Probe() {
  return <p>Configuration environment: {getServerConfig().appEnv}</p>;
}
`,
  );

  await t.test(
    "server import builds in preview mode and browser bundles exclude privileged configuration",
    () => {
      const result = build(configured);
      assert.equal(result.status, 0, result.output);
      const output = join(fixture, "apps/web/.next");
      const html = readFileSync(
        join(output, "server/app/config-boundary-probe.html"),
        "utf8",
      );
      assert.match(html, /Configuration environment: .*preview/);
      const scripts = readdirSync(join(output, "static"), {
        recursive: true,
      }).filter((path) => path.endsWith(".js"));
      assert.ok(scripts.length > 0);
      for (const path of scripts) {
        const content = readFileSync(join(output, "static", path), "utf8");
        for (const forbidden of [
          ...sentinels,
          "SUPABASE_SERVICE_ROLE_KEY",
          "CLOUDINARY_API_SECRET",
          "DATABASE_URL",
          "tm_runtime.abcdefghijklmnopqrst",
          "Invalid server configuration:",
        ]) {
          assert.ok(
            !content.includes(forbidden),
            `Privileged configuration reached browser bundle ${path}`,
          );
        }
      }
    },
  );

  await t.test(
    "a transitive Client Component import of the runtime getter is rejected by Next",
    () => {
      writeFileSync(
        join(dirname(probe), "config-access.ts"),
        'export { getServerConfig } from "@/server/config";\n',
      );
      writeFileSync(
        probe,
        `"use client";
import { getServerConfig } from "./config-access";
export default function Probe() {
  return <p>{getServerConfig().appEnv}</p>;
}
`,
      );
      const result = build(configured);
      assert.notEqual(result.status, 0);
      assert.match(result.output, /server-only/);
      assert.match(result.output, /only available in Server Components/);
      assert.match(result.output, /src\/server\/config\/index\.ts/);
      assert.match(result.output, /config-boundary-probe\/config-access\.ts/);
      assert.match(result.output, /config-boundary-probe\/page\.tsx/);
      for (const value of sentinels) assert.ok(!result.output.includes(value));
    },
  );
  await t.test(
    "DB imports are lazy and safe for server rendering with no connectivity",
    () => {
      writeFileSync(
        probe,
        `import { database } from "@/server/db";
export default function Probe() {
  return <p>Database capability: {typeof database.withTransaction}</p>;
}
`,
      );
      const result = build(configured);
      assert.equal(result.status, 0, result.output);
      const output = join(fixture, "apps/web/.next");
      const html = readFileSync(
        join(output, "server/app/config-boundary-probe.html"),
        "utf8",
      );
      assert.match(html, /Database capability: .*function/);
      for (const path of readdirSync(join(output, "static"), {
        recursive: true,
      }).filter((path) => path.endsWith(".js"))) {
        const content = readFileSync(join(output, "static", path), "utf8");
        for (const forbidden of [
          ...sentinels,
          "DATABASE_URL",
          "tm_runtime.abcdefghijklmnopqrst",
          "SELECT 1 AS ok",
        ]) {
          assert.ok(
            !content.includes(forbidden),
            `DB configuration/code reached browser bundle ${path}`,
          );
        }
      }
      const checked = spawnSync("npm", ["run", "typecheck"], {
        cwd: fixture,
        env: { ...environment, APP_ENV: "test" },
        encoding: "utf8",
        timeout: 60_000,
      });
      assert.ifError(checked.error);
      assert.equal(checked.status, 0, checked.stdout + checked.stderr);
    },
  );

  await t.test(
    "a transitive Client Component DB import fails at the real compiler boundary",
    () => {
      writeFileSync(
        join(dirname(probe), "db-access.ts"),
        'export { database } from "@/server/db";\n',
      );
      writeFileSync(
        probe,
        `"use client";
import { database } from "./db-access";
export default function Probe() {
  return <p>{typeof database.withTransaction}</p>;
}
`,
      );
      const result = build(configured);
      assert.notEqual(result.status, 0);
      assert.match(result.output, /server-only/);
      assert.match(result.output, /only available in Server Components/);
      assert.match(result.output, /src\/server\/db\/index\.ts/);
      assert.match(result.output, /config-boundary-probe\/db-access\.ts/);
      for (const value of sentinels) assert.ok(!result.output.includes(value));
    },
  );
});
