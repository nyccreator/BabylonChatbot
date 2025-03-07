const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAuthenticated } = require("../middleware/authenticator");

router.get("/", isAuthenticated, userController.getAuthenticatedUser);

module.exports = router;
