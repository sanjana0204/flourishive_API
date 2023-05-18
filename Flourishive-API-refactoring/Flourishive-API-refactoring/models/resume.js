module.exports = (sequelize, DataTypes) => {
	return sequelize.define("ResumeShortlisting", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},

		status: {
			type: DataTypes.STRING,
			defaultValue: true,
		},
	});
};
