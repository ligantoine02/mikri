import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const taskRoutes = new Hono();

/**
 * Create todo schema
 */
const createTaskSchema = z.object({
	title: z.coerce.string().min(3),
	description: z.coerce.string().nullable(),
	date: z.coerce.string().nullable(),
});

/**
 * Create a new task
 */
taskRoutes.post("/", zValidator("json", createTaskSchema), async (ctx) => {
	const { title, description, date } = ctx.req.valid("json");

	// TODO store todo in database

	return ctx.json({ task: title });
});

/**
 * List tasks
 * @method GET
 */
taskRoutes.get("/", async (ctx) => {
	// TODO get tasks from database

	// TODO define filters

	return ctx.json({ tasks: [] });
});

/**
 * Find task schema
 */
const findTaskSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

/**
 * Find a task
 * @method GET
 * @param id string
 */
taskRoutes.get("/:id", zValidator("param", findTaskSchema), async (ctx) => {
	const { id } = ctx.req.valid("param");

	// TODO get task from database

	// TODO define filters and relations

	return ctx.json({ task: { id } });
});

/**
 * Update task schema
 */
const updateTaskSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

/**
 * @todo update task
 * @method PUT
 * @param id string
 */
taskRoutes.put("/:id", zValidator("param", updateTaskSchema), async (ctx) => {
	const { id } = ctx.req.valid("param");

	// TODO validate body

	// TODO store new data

	return ctx.json({ task: {} });
});

/**
 * Delete task schema
 */
const deleteTaskSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

/**
 * @todo delete task
 * @method DELETE
 * @param id string
 */
taskRoutes.delete(
	"/:id",
	zValidator("param", deleteTaskSchema),
	async (ctx) => {
		const { id } = ctx.req.valid("param");

		// TODO soft delete task

		return ctx.json({ deleted: true });
	},
);

/**
 * @todo store task external links
 */

/**
 * @todo sync task with a GitHub project
 */

export default taskRoutes;
