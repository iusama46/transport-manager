// Node-only configuration: never import this module into UI or shared packages.
import "node:process";

/** Validate names without logging values or returning the ambient environment. */
export function validateEnvironment(environment, requiredNames = []) {
  const missing = requiredNames.filter(
    (name) =>
      typeof environment[name] !== "string" || !environment[name].trim(),
  );
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  // No public configuration is currently consumed by either app. Fail closed
  // until a reviewed, explicitly named public allowlist is needed.
  const publicNames = Object.keys(environment).filter(
    (name) =>
      name.startsWith("NEXT_PUBLIC_") || name.startsWith("EXPO_PUBLIC_"),
  );
  if (publicNames.length) {
    throw new Error(
      `Unapproved public environment variables: ${publicNames.join(", ")}. Remove them; credentials must remain server-only.`,
    );
  }
}
