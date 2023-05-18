module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"CandidateRole",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
