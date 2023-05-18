module.exports = (sequelize, DataTypes) => {
	return sequelize.define("Role", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		updatedBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			default: true,
		},
	});
};
