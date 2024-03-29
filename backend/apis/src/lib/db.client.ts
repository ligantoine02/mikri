import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

import * as userSchema from "../db/users";
import * as taskSchema from "../db/tasks";

const client = createClient({
	url: "http://127.0.0.1:8080",
});

const schema = { ...userSchema, ...taskSchema };

export const db = drizzle(client, { schema });

export const drizzleAdapter = new DrizzleSQLiteAdapter(
	db,
	userSchema.sessions,
	userSchema.users,
);
