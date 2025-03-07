const userModel = require("../models/user.model");

const getAuthenticatedUser = async (req, res) => {
	try {
		const { id, name, username } = await userModel.getUserById(
			req.session.user
		);
		res.json({ id, name, username });
	} catch (error) {
		res.json({ error: error.message });
	}
};

module.exports = { getAuthenticatedUser };
