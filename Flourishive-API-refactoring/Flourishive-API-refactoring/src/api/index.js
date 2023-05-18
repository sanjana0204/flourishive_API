const express = require("express");

const emojis = require("./emojis");
const candidateRoutes = require("./candidateRoutes");
const profileRoutes = require("./profileRoutes");
const permissionRoutes = require("./permissionRoutes");
const roleRoutes = require("./roleRoutes");
const allocationRoutes = require("./allocationRoutes");
const candidateController = require("../controller/candidateController");

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "API - 👋🌎🌍🌏",
	});
});
router.post("/login", candidateController.login);

router.use("/emojis", emojis);
router.use("/candidate", candidateRoutes);
router.use("/profile", profileRoutes);
router.use("/permission", permissionRoutes);
router.use("/role", roleRoutes);
router.use("/allocation", allocationRoutes);

module.exports = router;
