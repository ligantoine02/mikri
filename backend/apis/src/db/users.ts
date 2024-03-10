import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "./utils";

export const users = sqliteTable(
	"users",
	{
		id: text("id")
			.notNull()
			.unique()
			.primaryKey()
			.$defaultFn(() => createId()),
		username: text("username").notNull().unique(),
		name: text("name"),
		email: text("email").notNull().unique(),
		password: text("password").notNull(),
		...timestamps,
	},
	(table) => ({
		usernameIdx: index("username_index").on(table.username),
		emailIdx: index("email_index").on(table.email),
	}),
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferSelect;

// TODO Valibot schemas

export const sessions = sqliteTable("sessions", {
	id: text("id").notNull().unique().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at").notNull(),
	...timestamps,
});
