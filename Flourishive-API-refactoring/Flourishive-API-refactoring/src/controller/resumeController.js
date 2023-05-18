const { Resume, Role, Candidate } = require("../../models");

const updateResumeStatus = (req, res) => {
	data = req.body;
	Candidate.findByPk(data.CandidateId)
		.then((candidate) => {
			if (candidate) {
				Resume.count({ where: { CandidateId: data.CandidateId } })
					.then((count) => {
						if (count != 0) {
							Resume.update(
								{ status: data.status },
								{
									where: { CandidateId: data.CandidateId },
								}
							)
								.then((result) => {
									//TODO: Send Email Message
									res.status(200).send({
										status: "success",
										message: "Resume Shortlisting Updated Success",
										data: result,
									});
								})
								.catch((error) => {
									res.status(500).json({
										status: "failed",
										message: "Database error",
										error: error,
									});
								});
						} else {
							Resume.create(data)
								.then((result) => {
									//TODO: Send Email Message
									res.status(200).send({
										status: "success",
										message: "Resume Shortlisting Updated Success",
										data: result,
									});
								})
								.catch((error) => {
									res.status(500).json({
										status: "failed",
										message: "Database error",
										error: error,
									});
								});
						}
					})
					.catch((error) => {
						return res.status(500).json({
							status: "failed",
							message: "Database error",
							error: error,
						});
					});
			} else {
				res.status(404).json({
					status: "failed",
					message: "Candidate not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				status: "failed",
				message: "Database error",
				error: error,
			});
		});
};

module.exports = { updateResumeStatus };
