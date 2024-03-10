import { Hono } from "hono";

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
 * @todo
 */

export default meRoutes;
