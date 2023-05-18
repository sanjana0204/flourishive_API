module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Allocation",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
