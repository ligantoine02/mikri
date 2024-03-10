import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { vValidator } from "@hono/valibot-validator";
import {
	object,
	string,
	toTrimmed,
	nonNullable,
	minLength,
	coerce,
	date,
	nullable,
	optional,
	partial,
} from "valibot";

import { db } from "./lib/db.client";
import { tasks } from "./db/tasks";
import { AuthInput } from "./lib/lucia";

const taskRoutes = new Hono();

/**
 * Create todo schema
 */
const CreateTaskSchema = object({
	title: coerce(string([toTrimmed(), minLength(3)]), String),
	description: optional(string([toTrimmed()])),
	date: optional(date()),
});

/**
 * Create a new task
 */
taskRoutes.post("/", vValidator("json", CreateTaskSchema), async (ctx) => {
	const { title, description, date } = ctx.req.valid("json");
	const { id } = ctx.get("user") as AuthInput;

	// TODO store todo in database
	// TODO validate schema using Valibot
	const task = await db
		.insert(tasks)
		.values({
			title,
			description,
			userId: id,
		})
		.returning();

	return ctx.json({ task: task[0] });
});

/**
 * List tasks
 * @method GET
 */
taskRoutes.get("/", async (ctx) => {
	const { id } = ctx.get("user") as AuthInput;

	// TODO get tasks from database
	const userTasks = await db.query.tasks.findMany({
		where: (tasks, { eq }) => eq(tasks.userId, id),
	});

	// TODO define filters

	return ctx.json({ tasks: userTasks });
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
const UpdateTaskSchema = object({
	id: coerce(string([toTrimmed(), minLength(24)]), String),
});

const UpdateTaskBody = partial(CreateTaskSchema);

/**
 * @todo update task
 * @method PUT
 * @param id string
 */
taskRoutes.put(
	"/:id",
	vValidator("param", UpdateTaskSchema),
	vValidator("json", UpdateTaskBody),
	async (ctx) => {
		const { id } = ctx.req.valid("param");
		const { title, description } = ctx.req.valid("json");

		// TODO validate body

		// TODO store new data

		return ctx.json({ task: {} });
	},
);

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
