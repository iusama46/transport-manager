import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { validateEnvironment } from "../apps/web/config/environment.mjs";

test("current shell needs no app variables and tolerates host variables", () => {
  assert.doesNotThrow(() => validateEnvironment({}));
  assert.doesNotThrow(() =>
    validateEnvironment({ PATH: "/bin", NODE_ENV: "production" }),
  );
});

test("required variable validation rejects absent and blank values without disclosure", () => {
  for (const value of [undefined, "", "  "]) {
    assert.throws(
      () => validateEnvironment({ REQUIRED: value }, ["REQUIRED"]),
      {
        message: "Missing required environment variables: REQUIRED",
      },
    );
  }
  assert.doesNotThrow(() =>
    validateEnvironment({ REQUIRED: "test-only-value" }, ["REQUIRED"]),
  );
});

test("public configuration is denied without printing values", () => {
  for (const name of ["NEXT_PUBLIC_TEST", "EXPO_PUBLIC_TEST"]) {
    assert.throws(
      () => validateEnvironment({ [name]: "test-only-value" }),
      (error) => {
        assert.match(error.message, new RegExp(name));
        assert.ok(!error.message.includes("test-only-value"));
        return true;
      },
    );
  }
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
