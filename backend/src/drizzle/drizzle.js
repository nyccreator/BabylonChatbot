const { drizzle } = require("drizzle-orm/tidb-serverless");

const db = drizzle({
	connection: {
		url: `${process.env.TIDB_URL}?ssl={"rejectUnauthorized":true}`,
	},
});

module.exports = { db };
