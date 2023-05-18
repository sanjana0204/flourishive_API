const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Candidate } = require("../../models");
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		Candidate.findByPk(decoded.id)
			.then((candidate) => {
				const { password, ...result } = candidate;
				req.user = result;
				next();
			})
			.catch((err) => {
				console.log(err);
				return res.status(401).json({
					status: "error",
					message: "Auth Failed",
				});
			});
	} catch (error) {
		return res.status(401).json({
			status: "error",
			message: "Auth Failed",
		});
	}
};
