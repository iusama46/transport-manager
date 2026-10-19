import "server-only";
import { parseServerConfig } from "../../../config/environment.mjs";

export type {
  AppEnvironment,
  ServerConfig,
  SupabaseConfig,
  CloudinaryConfig,
} from "../../../config/environment.mjs";

/** Read a validated immutable snapshot; never serialize or log this object. */
export function getServerConfig() {
  return parseServerConfig(process.env);
}
