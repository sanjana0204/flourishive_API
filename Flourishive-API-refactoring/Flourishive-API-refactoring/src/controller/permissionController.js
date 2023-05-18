const { Permission } = require("../../models");

const createPermission = (req, res) => {
	data = req.body;

	Permission.create(data)
		.then((result) => {
			res.status(200).json({
				status: "success",
				message: "Permission Created Success",
				data: result,
			});
		})
		.catch((error) => {
			res.status(500).json({
				status: "error",
				message: "Internal server error",
				data: error,
			});
		});
};

const updatePermission = (req, res) => {
	data = req.body;

	Permission.update(data.permission, { where: { id: data.id } })
		.then((result) => {
			res.status(200).json({
				status: "success",
				message: "Permission Updated Success",
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

const getPermission = (req, res) => {
	Permission.findByPk(req.params.id)
		.then((result) => {
			res.status(200).json({
				status: "success",
				message: "Permission Feched Success",
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

const getAllPermissions = (req, res) => {
	Permission.findAll()
		.then((results) => {
			if (results.length > 0) {
				res.status(200).json({
					status: "success",
					message: "Permissions Feched Success",
					data: results,
				});
			} else {
				res.status(200).json({
					status: "failed",
					message: "Permissions Feched Failed",
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

const deletePermission = (req, res) => {
	Permission.destroy({ where: { id: req.body.id } })
		.then((results) => {
			res.status(200).json({
				status: "success",
				message: "Permissions Deleted Success",
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
	createPermission,
	updatePermission,
	getPermission,
	getAllPermissions,
	deletePermission,
};
