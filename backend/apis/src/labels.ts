import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const labelRoutes = new Hono();

/**
 * @todo create a label
 * @method POST
 * @returns Label
 */
const createLabelSchema = z.object({
	title: z.coerce.string().trim().min(3),
	description: z.coerce.string().trim().nullable(),
});

labelRoutes.post("/", zValidator("json", createLabelSchema), async (ctx) => {
	const { title, description } = ctx.req.valid("json");

	// TODO generate a slug

	// TODO store in database

	return ctx.json({ label: {} });
});

/**
 * @todo list all labels
 * @method GET
 * @returns Array<Label>
 */
labelRoutes.get("/", async (ctx) => {
	// TODO get labels from database

	// TODO design filters

	return ctx.json({ labels: [] });
});

/**
 * @todo find a label
 * @method GET
 * @param id string
 * @return Label
 */
const findLabelSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

labelRoutes.get("/:id", zValidator("param", findLabelSchema), async (ctx) => {
	const { id } = ctx.req.valid("param");

	// TODO retrieve label from database

	// TODO design filters

	return ctx.json({ label: {} });
});

/**
 * @todo update a label
 * @method PUT
 * @param id string
 * @returns Label
 */
const updateLabelSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

labelRoutes.put("/:id", zValidator("param", updateLabelSchema), async (ctx) => {
	const { id } = ctx.req.valid("param");

	// TODO validate body

	// TODO store data

	return ctx.json({ label: {} });
});

/**
 * @todo delete a label
 * @method DELETE
 * @param id string
 */
const deleteLabelSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

labelRoutes.delete(
	"/:id",
	zValidator("param", deleteLabelSchema),
	async (ctx) => {
		const { id } = ctx.req.valid("param");

		// TODO soft delete label

		return ctx.json({ deleted: true });
	},
);

export default labelRoutes;
