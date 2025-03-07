import { serve } from "@hono/node-server";
import { Hono } from "hono";
import db from "../db/connection.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/main", async (c) => {
  const result = await db.execute("select 1");
  return c.text(result.toString());
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
