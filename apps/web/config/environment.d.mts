export type AppEnvironment =
  "development" | "preview" | "staging" | "production" | "test";
export type EnvironmentInput = Readonly<Record<string, string | undefined>>;

export type SupabaseConfig = Readonly<{
  environment: AppEnvironment;
  url: string;
  publishableKey: string;
  serviceRoleKey: string;
}>;
export type CloudinaryConfig = Readonly<{
  environment: AppEnvironment;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}>;
export type DatabaseConfig = Readonly<{
  environment: AppEnvironment;
  connectionString: string;
  projectRef: string;
  local: boolean;
  ca: string | undefined;
}>;
export type ServerConfig = Readonly<{
  appEnv: AppEnvironment;
  supabase: SupabaseConfig | null;
  cloudinary: CloudinaryConfig | null;
  database: DatabaseConfig | null;
}>;

export function parseServerConfig(input: EnvironmentInput): ServerConfig;
export function validateEnvironment(input: EnvironmentInput): void;
