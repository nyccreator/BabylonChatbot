const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { RedisStore } = require("connect-redis");
const session = require("express-session");
const { createClient } = require("redis");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const app = express();
const port = 3000;
const client = createClient({
	url: `rediss://default:${process.env.UPSTASH_REDIS_PASSWORD}@${process.env.UPSTASH_REDIS_ENDPOINT}:${process.env.UPSTASH_REDIS_PORT}`,
});

client
	.on("error", function (err) {
		throw err;
	})
	.connect();

app.use(
	cors({
		origin: [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN],
		credentials: true,
	})
);
app.use(logger("dev"));
app.use(express.json());
app.use(
	session({
		name: "SESSION",
		store: new RedisStore({ client }),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			sameSite: "lax",
		},
	})
);

app.get("/", (req, res) => res.send("Hello world!"));
app.use("/auth", authRouter);
app.use("/me", userRouter);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
