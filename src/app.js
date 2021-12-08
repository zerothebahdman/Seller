const express = require("express");

const app = express();

// Middleware that performs body Parsering, reading data from the request body and storing it in req.body
app.use(express.json());

module.exports = app;
