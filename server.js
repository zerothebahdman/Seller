const dotenv = require("dotenv");

dotenv.config(`./.env`);

const app = require("./src/app");

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
