import "fast-text-encoding";
import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const tasks = sqliteTable("tasks", {
	id: text("id")
		.primaryKey()
		.notNull()
		.unique()
		.$defaultFn(() => createId()),
	title: text("title").notNull(),
	description: text("description"),
	completed: integer("completed", { mode: "boolean" }).notNull().default(0),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});

export type Task = typeof tasks.$inferSelect;
