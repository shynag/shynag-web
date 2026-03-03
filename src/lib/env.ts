import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "testing", "production"]),
});

export type Env = z.infer<typeof envSchema>;

// Parse environment variables at runtime instead of at module load.
// This avoids throwing during import time (which can break builds/dev server
// when env vars are not yet set). Call getEnv() where you actually need the
// values (e.g. inside server functions).
export function getEnv(): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    // Build a concise error message showing which vars are missing/invalid.
    const formatted = result.error.format();
    throw new Error(
      `Invalid or missing environment variables:\n${JSON.stringify(formatted, null, 2)}`,
    );
  }

  return result.data;
}
