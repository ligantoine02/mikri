import type { Config } from "drizzle-kit";

export default ({
	schema: "./src/db/*.ts",
	out: "./drizzle",
	driver: "turso",
	dbCredentials: {
		url: "http://127.0.0.1:8080",
	},
	verbose: true,
	strict: true,
} satisfies Config);
