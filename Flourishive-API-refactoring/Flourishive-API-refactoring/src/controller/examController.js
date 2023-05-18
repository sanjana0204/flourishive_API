const { Exam, Role, Candidate } = require("../../models");

const updateExamStatus = (req, res) => {
	data = req.body;
	Candidate.findByPk(data.CandidateId)
		.then((candidate) => {
			if (candidate) {
				Exam.count({ where: { CandidateId: data.CandidateId } })
					.then((count) => {
						if (count != 0) {
							Exam.update(data, {
								where: { CandidateId: data.CandidateId },
							})
								.then((result) => {
									//TODO: Send Email Message
									res.status(200).send({
										status: "success",
										message: "Exam Result Updated Success",
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
							Exam.create(data)
								.then((result) => {
									//TODO: Send Email Message
									res.status(201).send({
										status: "success",
										message: "Exam Result Updated Success",
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

module.exports = { updateExamStatus };
