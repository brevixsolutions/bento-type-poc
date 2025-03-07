import { Hono } from "hono";
import db from "../../db/connection.js";
import { users } from "../../db/schema.js";
import { eq, lt, gte, ne } from "drizzle-orm";

const userRoute = new Hono();

userRoute.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) return c.json("Missing email or password", 400);

  // TODO: Check if user exists and password is correct
  const user = await db.select().from(users).where(eq(users.email, email));

  if (!user.length) return c.json("User not found", 404);
  if (user[0].password !== password) return c.json("Incorrect password", 401);
  const mainUser = user[0];
  return c.json(
    {
      user: {
        id: mainUser.id,
        bio: mainUser.bio,
        email: mainUser.email,
        profilePic: mainUser.profilePic,
        createdAt: mainUser.createdAt,
        username: mainUser.username,
      },
      message: "Login successful",
    },
    200
  );
});

export default userRoute;
