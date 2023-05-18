const { Allocation, Role, Permission } = require("../../models");

const createAllocation = async (req, res) => {
	data = req.body;
	const bulkData = [];
	const role = await Role.findByPk(data.roleId);
	if (role) {
		for (let i = 0; i < data.permissionId.length; i++) {
			const permission = await Permission.findByPk(data.permissionId[i]);
			if (permission) {
				bulkData.push({ RoleId: role.id, PermissionId: permission.id });
			} else {
				res
					.status(403)
					.send({ status: "Failed", message: "Permission not Exist" });
			}
		}
		Allocation.destroy({
			where: {
				RoleId: role.id,
			},
		}).then((m) => {
			Allocation.bulkCreate(bulkData)
				.then((result) => {
					if (result) {
						res.status(201).send({
							status: "success",
							message: "Permission added to role successfully",
							data: result,
						});
					}
				})
				.catch((err) => {
					res.status(500).send({ status: "failed", message: err.message });
				});
		});
	} else {
		res.status(404).send({ status: "Failed", message: "Role not Exist" });
	}
};

module.exports = {
	createAllocation,
};
