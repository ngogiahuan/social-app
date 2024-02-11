const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESSTOKENSECRET, { expiresIn: "1d" });
};

const createRefreshAccessToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESHTOKENSECRET, {
    expiresIn: "30d",
  });
};

module.exports = { createAccessToken, createRefreshAccessToken };
