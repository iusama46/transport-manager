import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  parseServerConfig,
  validateEnvironment,
} from "../apps/web/config/environment.mjs";

const environments = [
  "development",
  "preview",
  "staging",
  "production",
  "test",
];
const supabase = {
  SUPABASE_ENV: "test",
  SUPABASE_URL: "https://synthetic-test.supabase.invalid",
  SUPABASE_PUBLISHABLE_KEY: "synthetic-publishable-key",
  SUPABASE_SERVICE_ROLE_KEY: "synthetic-private-service-key",
};
const cloudinary = {
  CLOUDINARY_ENV: "test",
  CLOUDINARY_CLOUD_NAME: "synthetic-test-cloud",
  CLOUDINARY_API_KEY: "synthetic-api-key",
  CLOUDINARY_API_SECRET: "synthetic-private-cloud-secret",
};

function rejectsWithoutValues(input, name) {
  assert.throws(
    () => parseServerConfig(input),
    (error) => {
      assert.match(error.message, new RegExp(name));
      for (const value of Object.values(input)) {
        // Compare sensitive/invalid input sentinels, not common environment words.
        if (value && value.length >= 8 && !environments.includes(value)) {
          assert.ok(!error.message.includes(value));
        }
      }
      assert.equal(error.cause, undefined);
      return true;
    },
  );
}

test("explicit environments parse independently of Node production compilation mode", () => {
  for (const appEnv of environments) {
    const input = Object.freeze({
      APP_ENV: appEnv,
      NODE_ENV: "production",
      PATH: "/bin",
    });
    const result = parseServerConfig(input);
    assert.deepEqual(result, { appEnv, supabase: null, cloudinary: null });
    assert.ok(Object.isFrozen(result));
    assert.equal(validateEnvironment(input), undefined);
  }
});

test("APP_ENV is required with no NODE_ENV or host fallback", () => {
  for (const value of [undefined, "", "  "]) {
    assert.throws(
      () =>
        validateEnvironment({
          APP_ENV: value,
          NODE_ENV: "production",
          VERCEL_ENV: "production",
        }),
      {
        message: "Missing required server configuration: APP_ENV",
      },
    );
  }
});

test("invalid APP_ENV never leaks the supplied value", () => {
  for (const APP_ENV of [
    "synthetic-invalid-environment",
    "PRODUCTION",
    " development",
    "preview/staging",
  ]) {
    assert.throws(() => parseServerConfig({ APP_ENV }), {
      message: "Invalid server configuration: APP_ENV",
    });
  }
});

test("production is rejected in a development/test Node runtime", () => {
  for (const NODE_ENV of ["development", "test"]) {
    rejectsWithoutValues({ APP_ENV: "production", NODE_ENV }, "APP_ENV");
  }
});

test("Vercel scope and APP_ENV must agree, including production-mode previews", () => {
  for (const [VERCEL_ENV, allowed] of [
    ["development", ["development"]],
    ["preview", ["preview", "staging"]],
    ["production", ["production"]],
    ["synthetic-unknown-scope", []],
  ]) {
    for (const APP_ENV of environments) {
      const input = { APP_ENV, VERCEL_ENV, NODE_ENV: "production" };
      if (allowed.includes(APP_ENV))
        assert.doesNotThrow(() => parseServerConfig(input));
      else rejectsWithoutValues(input, "APP_ENV, VERCEL_ENV");
    }
  }
});

test("complete provider contracts parse into immutable server-only snapshots", () => {
  const input = Object.freeze({ APP_ENV: "test", ...supabase, ...cloudinary });
  const config = parseServerConfig(input);
  assert.deepEqual(config, {
    appEnv: "test",
    supabase: {
      environment: "test",
      url: supabase.SUPABASE_URL,
      publishableKey: supabase.SUPABASE_PUBLISHABLE_KEY,
      serviceRoleKey: supabase.SUPABASE_SERVICE_ROLE_KEY,
    },
    cloudinary: {
      environment: "test",
      cloudName: cloudinary.CLOUDINARY_CLOUD_NAME,
      apiKey: cloudinary.CLOUDINARY_API_KEY,
      apiSecret: cloudinary.CLOUDINARY_API_SECRET,
    },
  });
  assert.ok(Object.isFrozen(config.supabase));
  assert.ok(Object.isFrozen(config.cloudinary));
  assert.throws(() => {
    config.supabase.serviceRoleKey = "changed";
  }, TypeError);
  assert.equal(
    input.SUPABASE_SERVICE_ROLE_KEY,
    supabase.SUPABASE_SERVICE_ROLE_KEY,
  );
});

test("every missing or blank provider field rejects a partial group without disclosure", () => {
  for (const group of [supabase, cloudinary]) {
    for (const name of Object.keys(group)) {
      for (const value of [undefined, "", "  "]) {
        rejectsWithoutValues(
          { APP_ENV: "test", ...group, [name]: value },
          name,
        );
      }
    }
  }
  rejectsWithoutValues({ APP_ENV: "test", SUPABASE_URL: "" }, "SUPABASE_ENV");
  rejectsWithoutValues(
    { APP_ENV: "test", CLOUDINARY_API_SECRET: "" },
    "CLOUDINARY_ENV",
  );
});

test("provider environment cannot silently select a different logical environment", () => {
  for (const APP_ENV of environments) {
    for (const environment of environments) {
      for (const group of [supabase, cloudinary]) {
        const name = group === supabase ? "SUPABASE_ENV" : "CLOUDINARY_ENV";
        const input = { APP_ENV, ...group, [name]: environment };
        if (APP_ENV === environment)
          assert.doesNotThrow(() => parseServerConfig(input));
        else rejectsWithoutValues(input, name);
      }
    }
  }
});

test("malformed/credential-bearing/non-origin Supabase URLs fail without disclosure", () => {
  for (const SUPABASE_URL of [
    "synthetic-invalid-url",
    "ftp://synthetic.invalid",
    "http://synthetic.invalid",
    "https://user:synthetic-password@synthetic.invalid",
    "https://synthetic.invalid/path",
    "https://synthetic.invalid/?key=synthetic-secret",
    "https://synthetic.invalid/#synthetic-fragment",
  ]) {
    rejectsWithoutValues(
      { APP_ENV: "test", ...supabase, SUPABASE_URL },
      "SUPABASE_URL",
    );
  }
});

test("HTTP loopback is restricted to explicit development/test, never preview or production", () => {
  for (const APP_ENV of environments) {
    for (const url of [
      "http://localhost:54321",
      "http://127.0.0.1:54321",
      "http://[::1]:54321",
      "https://localhost",
    ]) {
      const input = {
        APP_ENV,
        ...supabase,
        SUPABASE_ENV: APP_ENV,
        SUPABASE_URL: url,
      };
      if (["development", "test"].includes(APP_ENV))
        assert.doesNotThrow(() => parseServerConfig(input));
      else rejectsWithoutValues(input, "SUPABASE_URL");
    }
  }
});

test("obvious placeholders and padded secrets fail without disclosure", () => {
  for (const name of [
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ]) {
    for (const value of [
      "<insert-key>",
      "your-key",
      "replace-me",
      "changeme",
      "placeholder",
      "todo",
      "...",
      " synthetic-private-key ",
      "synthetic\nprivate",
    ]) {
      rejectsWithoutValues(
        { APP_ENV: "test", ...supabase, [name]: value },
        name,
      );
    }
  }
  rejectsWithoutValues(
    {
      APP_ENV: "test",
      ...supabase,
      SUPABASE_URL: "https://<project-ref>.supabase.co",
    },
    "SUPABASE_URL",
  );
  rejectsWithoutValues(
    { APP_ENV: "test", ...cloudinary, CLOUDINARY_API_SECRET: "<api-secret>" },
    "CLOUDINARY_API_SECRET",
  );
});

test("unsupported provider aliases/operations credentials fail rather than being silently consumed", () => {
  for (const name of [
    "CLOUDINARY_URL",
    "SUPABASE_ACCESS_TOKEN",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_ANON_KEY",
    "SUPABASE_URl",
  ]) {
    rejectsWithoutValues(
      { APP_ENV: "test", [name]: "synthetic-private-secret" },
      name,
    );
  }
});

test("public configuration is denied without printing values", () => {
  for (const name of ["NEXT_PUBLIC_TEST", "EXPO_PUBLIC_TEST"]) {
    assert.throws(
      () => validateEnvironment({ APP_ENV: "test", [name]: "test-only-value" }),
      (error) => {
        assert.match(error.message, new RegExp(name));
        assert.ok(!error.message.includes("test-only-value"));
        return true;
      },
    );
  }
});

test("parsing another environment cannot reuse stale credentials or mutate supplied state", () => {
  const first = parseServerConfig({ APP_ENV: "test", ...supabase });
  const second = parseServerConfig(Object.freeze({ APP_ENV: "development" }));
  assert.equal(
    first.supabase.serviceRoleKey,
    supabase.SUPABASE_SERVICE_ROLE_KEY,
  );
  assert.equal(second.supabase, null);
  assert.equal(second.cloudinary, null);
  assert.deepEqual(Object.keys(second).sort(), [
    "appEnv",
    "cloudinary",
    "supabase",
  ]);
});

test("actual env files are ignored at all workspace depths, exact templates allowed", () => {
  for (const directory of [
    "",
    "apps/web/",
    "apps/mobile/",
    "packages/shared/",
    "apps/web/nested/",
  ]) {
    for (const filename of [
      ".env",
      ".env.local",
      ".env.production",
      ".env.example.local",
    ]) {
      assert.doesNotThrow(() =>
        execFileSync("git", [
          "check-ignore",
          "--no-index",
          "--quiet",
          directory + filename,
        ]),
      );
    }
    assert.throws(
      () =>
        execFileSync("git", [
          "check-ignore",
          "--no-index",
          "--quiet",
          directory + ".env.example",
        ]),
      { status: 1 },
    );
  }
});
