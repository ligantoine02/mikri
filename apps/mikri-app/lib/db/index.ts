import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

import * as TasksSchema from "./schemas/tasks";

const mikriDb = openDatabaseSync("./mikri.db");

export const db = drizzle(mikriDb, {
	schema: {
		...TasksSchema,
	},
});
