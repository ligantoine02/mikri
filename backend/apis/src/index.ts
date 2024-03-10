import { Hono } from "hono";
import { env } from "hono/adapter";

// Dev packages
import { prettyJSON } from "hono/pretty-json";

// Routes
import authRoutes from "./auth";
import taskRoutes from "./tasks";
import draftRoutes from "./drafts";
import labelRoutes from "./labels";
import meRoutes from "./me";
import { lucia } from "./lib/lucia";

const app = new Hono();

app.use(prettyJSON({ space: 2 }));

app.get("/", (ctx) => {
	return ctx.json({ hello: "hello" });
});

app.route("/auth", authRoutes);

// Bearer middleware
app.use(async (ctx, next) => {
	const authorizationHeader = ctx.req.header("Authorization");
	const sessionId = lucia.readBearerToken(authorizationHeader ?? "");

	console.info("Authorization", sessionId);
	if (!sessionId) {
		return ctx.json({ message: "Unauthorized" }, 401);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (!session) {
		return ctx.json({ message: "Unauthorized" }, 401);
	}

	ctx.set("session", session);
	ctx.set("user", user);

	return next();
});

app.route("/tasks", taskRoutes);
app.route("/drafts", draftRoutes);
app.route("/labels", labelRoutes);
app.route("/me", meRoutes);

export default app;
