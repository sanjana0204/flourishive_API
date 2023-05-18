"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

// fs.readdirSync(__dirname)
// 	.filter((file) => {
// 		return (
// 			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
// 		);
// 	})
// 	.forEach((file) => {
// 		const model = require(path.join(__dirname, file))(
// 			sequelize,
// 			Sequelize.DataTypes
// 		);
// 		db[model.name] = model;
// 	});

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });

db.Candidate = require("./candidate")(sequelize, Sequelize);
db.Profile = require("./profile")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.Allocation = require("./allocation")(sequelize, Sequelize);
db.Permission = require("./permission")(sequelize, Sequelize);
db.CandidateRole = require("./candidateRole")(sequelize, Sequelize);
db.Resume = require("./resume")(sequelize, Sequelize);
db.Exam = require("./exam")(sequelize, Sequelize);
db.TechnicalInterview = require("./technicalInterview")(sequelize, Sequelize);
db.Otp = require("./otp")(sequelize,Sequelize);

//one to one relationship profile to candidate

db.Candidate.hasOne(db.Profile, { onDelete: "CASCADE" });
db.Profile.belongsTo(db.Candidate);

//one to one relationship candidate to resume

db.Candidate.hasOne(db.Resume, { onDelete: "CASCADE" });
db.Resume.belongsTo(db.Candidate);

//one to one relationship candidate to exam

db.Candidate.hasOne(db.Exam, { onDelete: "CASCADE" });
db.Exam.belongsTo(db.Candidate);

//one to one relationship candidate to TechnicalInterview

db.Candidate.hasOne(db.TechnicalInterview, { onDelete: "CASCADE" });
db.TechnicalInterview.belongsTo(db.Candidate);

//Many to many user and permissions

db.Candidate.belongsToMany(db.Role, {
	as: "roles",
	through: db.CandidateRole,
});
db.Role.belongsToMany(db.Candidate, {
	as: "Candidates	",
	through: db.CandidateRole,
});

//many to many for role and permissions

db.Role.belongsToMany(db.Permission, {
	as: "permissions",
	through: db.Allocation,
});
db.Permission.belongsToMany(db.Role, {
	as: "roles",
	through: db.Allocation,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
