import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./db/schema.ts",
  dbCredentials: {
    url: "postgresql://postgres:test123@localhost:5432/postgres",
  },
});
