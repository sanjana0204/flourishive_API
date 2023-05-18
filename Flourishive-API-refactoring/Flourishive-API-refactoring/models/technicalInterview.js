module.exports = (sequelize, DataTypes) => {
	return sequelize.define("TechnicalInterview", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},
		interviewLink: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		dateOfInterview: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		timeOfInterview: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		interviewStatus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		interviewResults: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		interviewMarks: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		approvedDomain: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		managerApproval: {
			type: DataTypes.STRING,
			defaultValue: "PENDING",
		},
		interviewer: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		remarks: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		interviewProofLink: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	});
};
