const { CandidateRole, Role, Candidate } = require("../../models");

const addRoles = async (req, res) => {
	data = req.body;
	const bulkData = [];
	const candidate = await Candidate.findByPk(data.candidateId);
	if (candidate) {
		for (let i = 0; i < data.roleId.length; i++) {
			const role = await Role.findByPk(data.roleId[i]);
			if (role) {
				bulkData.push({ CandidateId: candidate.id, RoleId: role.id });
			} else {
				res.status(404).send({ status: "Failed", message: "Role not Exist" });
			}
		}
		CandidateRole.destroy({
			where: {
				CandidateId: candidate.id,
			},
		}).then((m) => {
			CandidateRole.bulkCreate(bulkData)
				.then((result) => {
					if (result) {
						res.status(201).send({
							status: "success",
							message: "Roles added to Candidate successfully",
							data: result,
						});
					}
				})
				.catch((err) => {
					res.status(500).send({ status: "failed", message: err.message });
				});
		});
	} else {
		res.status(404).send({ status: "Failed", message: "Candidate not Exist" });
	}
};

module.exports = {
	addRoles,
};
