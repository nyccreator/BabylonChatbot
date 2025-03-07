import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/drizzle/schema.js",
	out: "./migrations",
	dialect: "mysql",
	dbCredentials: {
		host: process.env.TIDB_HOST,
		user: process.env.TIDB_USERNAME,
		password: process.env.TIDB_PASSWORD,
		port: process.env.TIDB_PORT,
		database: process.env.TIDB_DATABASE,
		ssl: { rejectUnauthorized: true },
	},
});
