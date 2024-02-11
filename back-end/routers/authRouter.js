const express = require("express");
const router = express.Router();

const registerController = require("../controllers/AuthControllers/registerController");
const loginController = require("../controllers/AuthControllers/loginController");
const logoutController = require("../controllers/AuthControllers/logoutController");
const generateAccesstoken = require("../controllers/AuthControllers/generateAccesstoken");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/refresh_token", generateAccesstoken);

module.exports = router;
