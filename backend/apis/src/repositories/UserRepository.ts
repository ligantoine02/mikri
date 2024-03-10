import { InsertUser, User, users } from "../db/users";
import { db } from "../lib/db.client";
import Repository from "./Repository";

export default class UserRepository implements Repository {
	async all(): Promise<User[]> {
		return await db.query.users.findMany();
	}

	// FIXME Find a single user
	async find(id: string): Promise<User> {
		return (await db.query.users.findMany())[0];
	}

	async create(user: InsertUser): Promise<User> {
		return (await db.insert(users).values(user).returning())[0];
	}
}
