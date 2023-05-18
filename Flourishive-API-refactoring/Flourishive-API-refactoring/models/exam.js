module.exports = (sequelize, DataTypes) => {
	return sequelize.define("ExamResult", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},
		examLink: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		dateOfExam: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		timeOfExam: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		examStatus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		examResults: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		examMarks: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		remarks: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	});
};
