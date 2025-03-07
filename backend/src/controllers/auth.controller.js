const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");

const register = async (req, res) => {
	try {
		const hash = bcrypt.hashSync(`${req.body.password}`, 10);
		const user = await userModel.createUser({
			name: req.body.name,
			username: req.body.username,
			password: hash,
		});
		res.status(201).json({ message: "Registered successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res, next) => {
	try {
		const user = await userModel.getUserByUsername(req.body);
		console.log(user);
		if (user && (await bcrypt.compare(req.body.password, user.password))) {
			req.session.user = {
				id: user.id,
			};
			req.session.regenerate(function (err) {
				if (err) next(err);
				req.session.user = {
					id: user.id,
					username: user.username,
					name: user.name,
				};
				req.session.save(function (err) {
					if (err) return next(err);
					res.status(200).json({ message: "Logged in successfully" });
				});
			});
		} else {
			res.status(401).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: error.message });
	}
};

const logout = async (req, res, next) => {
	try {
		req.session.user = null;
		req.session.save(function (err) {
			if (err) next(err);
			req.session.regenerate(function (err) {
				if (err) next(err);
				res.status(200).json({ message: "Logged out successfully" });
			});
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { register, login, logout };
