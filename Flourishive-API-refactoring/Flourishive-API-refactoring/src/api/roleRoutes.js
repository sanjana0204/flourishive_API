const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController");

router.post("/", roleController.createRole);
router.get("/", roleController.getAllRoles);
router.delete("/", roleController.deleteRole);
router.put("/", roleController.updateRole);
router.get("/:id", roleController.getRole);

module.exports = router;
