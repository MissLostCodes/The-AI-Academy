import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_xrORP6yTgqv0@ep-muddy-firefly-a4tmzu1d-pooler.us-east-1.aws.neon.tech/AI-Study-Bro?sslmode=require",
  },
});