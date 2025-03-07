const { eq } = require("drizzle-orm");
const { db: drizzle } = require("../drizzle/drizzle");
const { users } = require("../drizzle/schema");

const createUser = async ({ name, username, password }) => {
	return await drizzle
		.insert(users)
		.values({ name, username, password })
		.$returningId();
};

const getUsers = async () => {
	return await drizzle.select().from(users);
};

const getUserById = async ({ id }) => {
	const result = await drizzle.select().from(users).where(eq(users.id, id));
	return result[0];
};

const getUserByUsername = async ({ username }) => {
	const result = await drizzle
		.select()
		.from(users)
		.where(eq(users.username, username));
	return result[0];
};

module.exports = { createUser, getUsers, getUserById, getUserByUsername };
