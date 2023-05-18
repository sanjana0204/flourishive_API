const { Role, Permission } = require("../../models");

const createRole = (req, res) => {
	data = req.body;

	Role.create(data)
		.then((result) => {
			res.status(200).json({
				status: "success",
				message: "Role Created Success",
				data: result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: "error",
				data: error,
			});
		});
};

const updateRole = (req, res) => {
	data = req.body;

	Role.update(data.role, { where: { id: data.id } })
		.then((result) => {
			res.status(200).json({
				status: "success",
				message: "Role Updated Success",
				data: result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: "error",
				data: error,
			});
		});
};

const getRole = (req, res) => {
	Role.findByPk(req.params.id)
		.then((result) => {
			res.status(200).json({
				status: "success",
				message: "Role Feched Success",
				data: result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: "error",
				data: error,
			});
		});
};

const getAllRoles = (req, res) => {
	Role.findAll({ include: [{ model: Permission, as: "permissions" }] })
		.then((results) => {
			if (results.length > 0) {
				res.status(200).json({
					status: "success",
					message: "Roles Feched Success",
					data: results,
				});
			} else {
				res.status(404).json({
					status: "failed",
					message: "Roles Feched Failed",
					data: results,
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				status: "error",
				data: error,
			});
		});
};

const deleteRole = (req, res) => {
	Role.destroy({ where: { id: req.body.id } })
		.then((results) => {
			res.status(200).json({
				status: "success",
				message: "Role Deleted Success",
				data: results,
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: "error",
				data: error,
			});
		});
};

module.exports = {
	createRole,
	updateRole,
	getRole,
	getAllRoles,
	deleteRole,
};
