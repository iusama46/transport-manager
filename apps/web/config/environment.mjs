// @ts-check
// Pure Node parser shared by Next configuration and the protected runtime entry.
// Application code imports src/server/config, never this bootstrap module.
import "node:process";

/** @typedef {import("./environment.mjs").AppEnvironment} AppEnvironment */
/** @typedef {import("./environment.mjs").EnvironmentInput} EnvironmentInput */
/** @typedef {import("./environment.mjs").ServerConfig} ServerConfig */

const environments = [
  "development",
  "preview",
  "staging",
  "production",
  "test",
];
const supabaseNames = [
  "SUPABASE_ENV",
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];
const cloudinaryNames = [
  "CLOUDINARY_ENV",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

/** @param {string} name @returns {never} */
function invalid(name) {
  // Never include parser exceptions, received values or ambient configuration.
  throw new Error(`Invalid server configuration: ${name}`);
}

/** @param {EnvironmentInput} input @param {string} name */
function required(input, name) {
  const value = input[name];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing required server configuration: ${name}`);
  }
  if (
    value !== value.trim() ||
    /[<>\r\n]/.test(value) ||
    /^(?:your[-_ ].*|replace[-_ ].*|change[-_ ]?me|placeholder|todo|\.{3,})$/i.test(
      value,
    )
  )
    invalid(name);
  return value;
}

/** @param {EnvironmentInput} input @param {string} name @returns {AppEnvironment} */
function readEnvironment(input, name) {
  const value = required(input, name);
  if (!environments.includes(value)) invalid(name);
  return /** @type {AppEnvironment} */ (value);
}

/** @param {EnvironmentInput} input @param {string[]} names */
function hasGroup(input, names) {
  // Even a supplied empty group is a configuration error, not a disabled provider.
  return names.some((name) => input[name] !== undefined);
}

/** @param {EnvironmentInput} input @param {string} name @param {AppEnvironment} appEnv */
function providerEnvironment(input, name, appEnv) {
  const environment = readEnvironment(input, name);
  if (environment !== appEnv) invalid(name);
  return environment;
}

/** @param {string} value @param {AppEnvironment} appEnv */
function supabaseUrl(value, appEnv) {
  let url;
  try {
    url = new URL(value);
  } catch {
    invalid("SUPABASE_URL");
  }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const localEnvironment = appEnv === "development" || appEnv === "test";
  if (
    (url.protocol !== "https:" &&
      !(url.protocol === "http:" && local && localEnvironment)) ||
    (local && !localEnvironment) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    invalid("SUPABASE_URL");
  return url.origin;
}

/**
 * Parse an explicit input without reading/mutating process.env or making connections.
 * Provider groups are absent until configured; a partial group always fails closed.
 * @param {EnvironmentInput} input
 * @returns {ServerConfig}
 */
export function parseServerConfig(input) {
  // No public configuration is currently consumed by either app. Fail closed
  // until a reviewed, explicitly named public allowlist is needed.
  const publicNames = Object.keys(input).filter(
    (name) =>
      name.startsWith("NEXT_PUBLIC_") || name.startsWith("EXPO_PUBLIC_"),
  );
  if (publicNames.length) {
    throw new Error(
      `Unapproved public environment variables: ${publicNames.join(", ")}. Remove them; credentials must remain server-only.`,
    );
  }

  const appEnv = readEnvironment(input, "APP_ENV");
  if (
    appEnv === "production" &&
    ["development", "test"].includes(input.NODE_ENV ?? "")
  ) {
    invalid("APP_ENV");
  }
  // Vercel's deployment scope is independent of NODE_ENV (preview builds use production mode).
  if (input.VERCEL_ENV !== undefined) {
    const compatible =
      input.VERCEL_ENV === "preview"
        ? appEnv === "preview" || appEnv === "staging"
        : input.VERCEL_ENV === "production"
          ? appEnv === "production"
          : input.VERCEL_ENV === "development" && appEnv === "development";
    if (!compatible) invalid("APP_ENV, VERCEL_ENV");
  }
  const unknownProviders = Object.keys(input).filter(
    (name) =>
      /^(SUPABASE_|CLOUDINARY_)/.test(name) &&
      ![...supabaseNames, ...cloudinaryNames].includes(name),
  );
  if (unknownProviders.length) {
    throw new Error(
      `Unsupported server configuration: ${unknownProviders.join(", ")}`,
    );
  }

  const supabase = hasGroup(input, supabaseNames)
    ? Object.freeze({
        environment: providerEnvironment(input, "SUPABASE_ENV", appEnv),
        url: supabaseUrl(required(input, "SUPABASE_URL"), appEnv),
        publishableKey: required(input, "SUPABASE_PUBLISHABLE_KEY"),
        // Future administrative use only; never a database runtime credential.
        serviceRoleKey: required(input, "SUPABASE_SERVICE_ROLE_KEY"),
      })
    : null;
  const cloudinary = hasGroup(input, cloudinaryNames)
    ? Object.freeze({
        environment: providerEnvironment(input, "CLOUDINARY_ENV", appEnv),
        cloudName: required(input, "CLOUDINARY_CLOUD_NAME"),
        apiKey: required(input, "CLOUDINARY_API_KEY"),
        apiSecret: required(input, "CLOUDINARY_API_SECRET"),
      })
    : null;
  return Object.freeze({ appEnv, supabase, cloudinary });
}

/** Bootstrap validation deliberately returns no secret-bearing object. @param {EnvironmentInput} input */
export function validateEnvironment(input) {
  parseServerConfig(input);
}
