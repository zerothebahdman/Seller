const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(`./.env`);
const db = process.env.ATLAS_DB.replace(
  "<PASSWORD>",
  process.env.ATLAS_DB_PASSWORD
);

mongoose
  .connect(db)
  .then(() => {
    console.log(`App connected to database`);
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = require("./src/app");

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
