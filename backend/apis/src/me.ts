import { Hono } from "hono";
import { AuthInput, lucia } from "./lib/lucia";

const meRoutes = new Hono();

/**
 * @todo find profile data
 * @method GET
 * @returns User
 */
meRoutes.get("/", async (ctx) => {
	return ctx.json({ me: {} });
});

/**
 * @todo update user profile
 * @method PUT
 * @returns User
 */
meRoutes.put("/", async (ctx) => {
	return ctx.json({ me: {} });
});

/**
 * @todo update password
 */

/**
 * @todo logout user
 * @method POST
 */
meRoutes.post("/logout", async (ctx) => {
	/**
	 * @todo validate global context input types
	 */
	const user = ctx.get("user") as AuthInput;
	await lucia.invalidateUserSessions(user.id);

	return ctx.json({ logout: true }, 200);
});

export default meRoutes;
