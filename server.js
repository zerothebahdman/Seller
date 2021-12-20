const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config(`./.env`);

const app = require("./src/app");

const port = process.env.APP_PORT || 3000;
app.listen(port, async () => {
  console.log(`App is running on port ${port}...`);
  // This looks at our models folder and creates database tables according to the table we have.
  await sequelize.authenticate(); //when changes are made in the model file it will automatically update
  console.log(`Database Connected`);
});
