// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";

const user = "postgres";
const password = "test123";
const host = "localhost";
const port = 5432;
const database = "postgres";

const db = drizzle(
  process.env.DATABASE_URL ??
    `postgresql://${user}:${password}@${host}:${port}/${database}`
);

export default db;
