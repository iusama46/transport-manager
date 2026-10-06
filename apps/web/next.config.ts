import type { NextConfig } from "next";
import { validateEnvironment } from "./config/environment.mjs";

// Next loads app-local environment files before evaluating this configuration.
validateEnvironment(process.env);

const nextConfig: NextConfig = {
  transpilePackages: ["@transport-manager/shared"],
};
export default nextConfig;
