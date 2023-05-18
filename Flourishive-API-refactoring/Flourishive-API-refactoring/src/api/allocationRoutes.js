const express = require("express");
const router = express.Router();
const allocationController = require("../controller/allocationController");

router.post("/", allocationController.createAllocation);

module.exports = router;
