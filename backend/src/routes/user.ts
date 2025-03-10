import { Hono, type Context } from "hono";
import db from "../../db/connection.js";
import { users } from "../../db/schema.js";
import { eq, lt, gte, ne, and } from "drizzle-orm";
import type { BlankEnv, BlankInput } from "hono/types";

const userRoute = new Hono();

async function login(c: Context<BlankEnv, "/login", BlankInput>) {
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
        first_name: mainUser.firstName,
        last_name: mainUser.lastName,
      },
      message: "Login successful",
    },
    200
  );
}

async function signup(c: Context<BlankEnv, "/signin", BlankInput>) {
  const { email, password, firstName, lastName, username, bio } =
    await c.req.json();
  if (!email || !password || !firstName || !lastName || !username || !bio)
    return c.json("Missing email or password", 400);

  // TODO: Check if user exists and password is correct
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email) || eq(users.username, username));
  if (user.length) return c.json("User already exists", 409);

  // TODO: Create user
  const newUser = await db
    .insert(users)
    .values({
      email,
      password,
      firstName,
      lastName,
      username,
      bio,
    })
    .returning();

  return c.json(
    {
      user: {
        id: newUser[0].id,
        bio: newUser[0].bio,
        email: newUser[0].email,
        profilePic: newUser[0].profilePic,
        createdAt: newUser[0].createdAt,
        username: newUser[0].username,
        first_name: newUser[0].firstName,
        last_name: newUser[0].lastName,
      },
      message: "Signin successful",
    },
    200
  );
}

userRoute.post("/login", login);
userRoute.post("/signup", signup);

export default userRoute;
