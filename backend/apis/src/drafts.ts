import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const draftRoutes = new Hono();

/**
 * Create draft validator
 */
const createDraftSchema = z.object({
	title: z.coerce.string().trim().min(5),
	description: z.coerce.string().nullable(),
});

/**
 * New draft route
 * @method POST
 */
draftRoutes.post("/", zValidator("json", createDraftSchema), async (ctx) => {
	const { title, description } = ctx.req.valid("json");

	// TODO store draft in database

	return ctx.json({ draft: {} });
});

/**
 * List all drafts
 */
draftRoutes.get("/", async (ctx) => {
	// TODO find drafts from database

	// TODO design filters

	return ctx.json({ drafts: [] });
});

/**
 * Find draft schema
 */
const findDraftSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

/**
 * Get a draft
 *
 * @method GET
 * @param id string
 */
draftRoutes.get("/:id", zValidator("param", findDraftSchema), async (ctx) => {
	const { id } = ctx.req.valid("param");

	// TODO get draft from database

	// TODO assign relations and filters

	return ctx.json({ draft: id });
});

/**
 * Update draft schema
 */
const updateDraftSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

/**
 * @todo update draft
 *
 * @method PUT
 * @param id string
 */
draftRoutes.put("/:id", zValidator("param", updateDraftSchema), async (ctx) => {
	const { id } = ctx.req.valid("param");
	// TODO find draft

	// TODO update items

	return ctx.json({ draft: { id } });
});

/**
 * Delete draft schema
 */
const deleteDraftSchema = z.object({
	id: z.coerce.string().trim().min(12),
});

/**
 * @todo delete draft
 * @method DELETE
 * @param id string
 */
draftRoutes.delete(
	"/:id",
	zValidator("param", deleteDraftSchema),
	async (ctx) => {
		const { id } = ctx.req.valid("param");

		// TODO soft delete draft

		return ctx.json({ deleted: true });
	},
);

export default draftRoutes;
