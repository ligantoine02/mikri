import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";
import { timestamps } from "./utils";
import { relations } from "drizzle-orm";

export const tasks = sqliteTable("tasks", {
	id: text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text("title").notNull(),
	description: text("title"),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	...timestamps,
});

export const tasksRelations = relations(tasks, ({ one }) => ({
	user: one(users, {
		fields: [tasks.userId],
		references: [users.id],
	}),
}));
