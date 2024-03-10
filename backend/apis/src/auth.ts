import { Hono } from "hono";
import { vValidator } from "@hono/valibot-validator";
import { email, minLength, object, parse, string, toTrimmed } from "valibot";
import { hashPassword, verifyPassword } from "./lib/password";
import { db } from "./lib/db.client";
import { users } from "./db/users";
import { lucia } from "./lib/lucia";
import { eq, or } from "drizzle-orm";

/**
 * User login schema
 */
const LoginSchema = object({
	username: string([toTrimmed(), minLength(1)]),
	password: string([minLength(1)]),
});

const authRoutes = new Hono();

/**
 * User login
 */
authRoutes.post("/login", vValidator("json", LoginSchema), async (ctx) => {
	const { username, password } = ctx.req.valid("json");

	// TODO check if username is type an email or a username

	// TODO validate password
	const user = await db
		.select({
			id: users.id,
			email: users.email,
			username: users.username,
			password: users.password,
		})
		.from(users)
		.where(or(eq(users.email, username), eq(users.username, username)))
		.limit(1);

	if (user.length === 0) {
		return ctx.json({ message: "Invalid credentials" }, 400);
	}

	// TODO generate JWT token or bearer token
	const validPassword = await verifyPassword(user[0].password, password);
	if (!validPassword) {
		return ctx.json({ message: "Invalid credentials" }, 400);
	}

	const session = await lucia.createSession(user[0].id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	ctx.header("Set-Cookie", sessionCookie.serialize());
	return ctx.json({ user: user[0], cookie: sessionCookie.serialize() }, 302);
});

/**
 * User registration schema
 */
const RegistrationSchema = object({
	email: string([toTrimmed(), email(), minLength(5)]),
	username: string([toTrimmed(), minLength(3)]),
	password: string([minLength(8)]),
});

/**
 * User registration
 */
authRoutes.post(
	"/register",
	vValidator("json", RegistrationSchema),
	async (ctx) => {
		const { email, username, password } = ctx.req.valid("json");
		// TODO check if email is already taken

		// TODO hash password
		const hashedPassword = await hashPassword(password);

		// TODO create user and generate jwt or bearer token
		try {
			const validUser = parse(RegistrationSchema, {
				email,
				username,
				password: hashedPassword,
			});
			if (!validUser) {
				ctx.status(400);
				return ctx.json({ message: "Invalid user data" }, 400);
			}

			const user = await db.insert(users).values(validUser).returning();
			const session = await lucia.createSession(user[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			ctx.header("Set-Cookie", sessionCookie.serialize());
			return ctx.json(
				{ user: user[0], cookie: sessionCookie.serialize() },
				302,
			);
		} catch (err) {
			console.error(err);
			return ctx.json({ message: "Invalid user data" }, 400);
		}
	},
);

export default authRoutes;
