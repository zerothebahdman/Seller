const jwt = require("jsonwebtoken");
const path = require("path");
const { readFileSync } = require("fs");

const PRIV_KEY = readFileSync(
  path.join(__dirname, "../certs/private.pem"),
  "utf-8"
);

const jwtToken = (uuid) =>
  jwt.sign({ uuid }, PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: process.env.JWT_EXPIRATION,
  });

module.exports = jwtToken;
