const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config(`./.env`);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect((err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log(`Connected to mysql server at ${process.env.DB_HOST}`);
});

const app = require("./src/app");

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
