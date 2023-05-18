const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");

router.post("/", profileController.createProfile);
// router.get("/", candidateController.getAllCandidate);
// router.delete("/", candidateController.deleteCandidate);
// router.get("/getByEmail", candidateController.getCandidateByEmail);
// router.get("/:id", candidateController.getCandidateById);
router.put("/", profileController.updateProfile);
router.post("/verify-mobilenumber", profileController.verifyMobileNum);
router.post("/verify-otp", profileController.verifyOtp);

module.exports = router;
