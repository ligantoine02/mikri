import { Lucia } from "lucia";
import { Input, object, string } from "valibot";

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

export const AuthSchema = object({
	email: string(),
	id: string(),
	username: string(),
});

export type AuthInput = Input<typeof AuthSchema>;
