import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoute from "./routes/user.js";

const app = new Hono();

// Enable CORS for all origins
app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/users", userRoute);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
