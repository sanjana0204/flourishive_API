const express = require("express");
const router = express.Router();
const permissionController = require("../controller/permissionController");

router.post("/", permissionController.createPermission);
router.get("/", permissionController.getAllPermissions);
router.delete("/", permissionController.deletePermission);
router.put("/", permissionController.updatePermission);
router.get("/:id", permissionController.getPermission);

module.exports = router;
