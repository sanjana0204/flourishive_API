const { TechnicalInterview, Role, Candidate } = require("../../models");

const updateTIStatus = (req, res) => {
	data = req.body;
	Candidate.findByPk(data.CandidateId)
		.then((candidate) => {
			if (candidate) {
				TechnicalInterview.count({ where: { CandidateId: data.CandidateId } })
					.then((count) => {
						if (count != 0) {
							TechnicalInterview.update(data, {
								where: { CandidateId: data.CandidateId },
							})
								.then((result) => {
									//TODO: Send Email Message
									res.status(200).send({
										status: "success",
										message: "TI Updated Success",
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
							TechnicalInterview.create(data)
								.then((result) => {
									//TODO: Send Email Message
									res.status(200).send({
										status: "success",
										message: "TI Updated Success",
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

const approveTIStatus = (req, res) => {
	data = req.body;
	Candidate.findByPk(data.CandidateId)
		.then((candidate) => {
			if (candidate) {
				TechnicalInterview.count({ where: { CandidateId: data.CandidateId } })
					.then((count) => {
						if (count != 0) {
							TechnicalInterview.update(data, {
								where: { CandidateId: data.CandidateId },
							})
								.then((result) => {
									//TODO: Send Email Message
									res.status(200).send({
										status: "success",
										message: "TI Status Updated Success",
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
							res.status(404).json({
								status: "failed",
								message: "Record not found",
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
module.exports = { updateTIStatus, approveTIStatus };
