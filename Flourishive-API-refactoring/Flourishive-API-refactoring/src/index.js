const app = require("./app");
const db = require("../models");
const port = process.env.PORT || 5000;

// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
db.sequelize.sync();

app.listen(port, () => {
	console.log(`Listening: http://localhost:${port}`);
});
