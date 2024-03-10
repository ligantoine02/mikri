import { Lucia } from "lucia";

import { drizzleAdapter } from "./db.client";

export const lucia = new Lucia(drizzleAdapter, {
	sessionCookie: {
		attributes: {
			secure: false,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			username: string;
		};
	}
}
