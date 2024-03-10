import { User, InsertUser } from "../db/users";

export default interface Repository {
	/**
	 * Find all users
	 */
	all(): Promise<User[]>;

	/**
	 * Get a single user
	 * @string id
	 */
	find(id: string): Promise<User | undefined>;

	/**
	 * Create a user
	 * @InsertUser user
	 */
	create(user: InsertUser): Promise<User>;
}
