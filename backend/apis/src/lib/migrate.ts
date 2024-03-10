import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

async function main() {
	const db = drizzle(createClient({ url: "http://127.0.0.1:8080" }));

	console.info("Running migrations");
	await migrate(db, { migrationsFolder: "drizzle" });

	console.info("Migrated successfully");
	process.exit(0);
}

main().catch((e) => {
	console.error("Migration failed");
	console.error(e);
	process.exit(1);
});
