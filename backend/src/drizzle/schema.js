const { mysqlTable: table } = require("drizzle-orm/mysql-core");
const t = require("drizzle-orm/mysql-core");

const users = table(
	"users",
	{
		id: t.int().primaryKey().autoincrement(),
		name: t.varchar({ length: 256 }).notNull(),
		username: t.varchar({ length: 256 }).notNull(),
		password: t.varchar({ length: 256 }).notNull(),
	},
	(table) => [t.uniqueIndex("username_idx").on(table.username)]
);

module.exports = { users };
