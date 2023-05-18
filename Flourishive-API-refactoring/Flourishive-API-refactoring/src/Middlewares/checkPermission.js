const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Candidate, Role, Permission, Profile } = require("../../models");
const _ = require("underscore");

module.exports = (permissionId) => {
	return (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];

			let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

			Candidate.findByPk(decoded.id, {
				attributes: { exclude: ["password"] },
				include: [
					{ model: Profile },
					{
						model: Role,
						as: "roles",
						include: [
							{
								model: Permission,
								as: "permissions",
								attributes: ["id", "name"],
							},
						],
						attributes: ["id"],
					},
				],
			})
				.then((candidate) => {
					if (candidate) {
						const permissions = _.uniq(
							_.flatten(
								candidate.roles.map((role) => {
									return role.permissions.map((permission) => {
										return permission.id;
									});
								})
							)
						);
						const data = _.contains(permissions, permissionId);

						if (data) {
							req.user = candidate;
							req.userPermissions = permissions;

							next();
						} else {
							return res.status(401).json({
								status: "error",
								message: "Authorisation Failed",
							});
						}
					} else {
						return res.status(404).json({
							status: "failed",
							message: "candidate not found",
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
		} catch (error) {
			return res.status(401).json({
				status: "error",
				message: "Auth Failed",
			});
		}
	};
};
