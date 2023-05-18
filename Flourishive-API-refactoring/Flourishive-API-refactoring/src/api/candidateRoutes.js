const express = require("express");
const router = express.Router();
const checkPermission = require("../middlewares/checkPermission");
const candidateController = require("../controller/candidateController");
const candRoleController = require("../controller/candRoleController");
const resumeController = require("../controller/resumeController");
const examController = require("../controller/examController");
const technicalInterviewController = require("../controller/technicalInterviewController");
const verifyToken = require("../Middlewares/checkAuth");

router.post("/register", candidateController.registerCandidate);
router.get("/", candidateController.getAllCandidate);
router.get(
	"/get-permissions",
	candidateController.getAllPermissionsToCandidate
);
router.delete("/", candidateController.deleteCandidate);
router.get("/get-by-email", candidateController.getCandidateByEmail);
router.post("/update/resume-shortlisting", resumeController.updateResumeStatus);
router.post("/update/exam-results", examController.updateExamStatus);
router.post("/update/ti-Status", technicalInterviewController.updateTIStatus);
router.post("/approve-ti-Status", technicalInterviewController.approveTIStatus);
router.post("/add-roles", candRoleController.addRoles);
router.get("/:id", candidateController.getCandidateById);
router.put("/:id", candidateController.updateCandidateById);
router.post("/login",candidateController.login);
router.post("/all",candidateController.getAllCandidate);
router.post("/verify",verifyToken,candidateController.verCad);
router.post("/forgot-password",candidateController.forgotPassword);
router.get("/reset-password/:id/:token", candidateController.resetPasswordGet);
router.post("/reset-password/:id/:token", candidateController.resetPasswordPost);

module.exports = router;
