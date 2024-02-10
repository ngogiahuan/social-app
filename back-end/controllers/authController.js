const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const { userName, fullName, email, password, gender } = req.body;

      //check if the user already exists
      const newUserName = userName.toLowerCase().replace(/ /g, "");
      const existeduserName = await Users.findOne({ userName: newUserName });
      if (existeduserName)
        return res.status(400).send({ msg: "This username already exists." });

      //check if the email already exists
      const newEmail = email.toLowerCase();
      const existedEmail = await Users.findOne({ email: newEmail });
      if (existedEmail)
        return res.status(400).send({ msg: "This email already exists." });

      //password length should be at least 8 characters
      if (password.length < 8)
        return res
          .status(400)
          .send({ msg: "Password must be at least 8 characters." });
      const hashedPassword = await bcrypt.hash(password, 13);

      //create new user
      const newUser = new Users({
        userName: newUserName,
        fullName,
        email: newEmail,
        password: hashedPassword,
        gender,
      });

      //create access token and refresh token
      const acesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshAccessToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      });

      //save user to database
      await newUser.save();
      res.send({
        msg: "test register",
        data: newUser,
        acesstoken,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;

      //check user in database by userName or email
      const user = await Users.findOne({
        $or: [{ userName: userName }, { email: userName }],
      }).populate("followers following", "-password");

      //if user does not exist
      if (!user)
        return res
          .status(400)
          .send({ msg: "This userName or email does not exist." });

      //if user exists, check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({ msg: "Password is incorrect." });

      //if login is successful, create access token and refresh token
      const acesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshAccessToken({ id: user._id });

      //send refresh token as a cookie
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.send({
        msg: "Login successful",
        data: user,
        acesstoken,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.send({ msg: "Logged out" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  generateAccesstoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).send({ msg: "Please login now!" });

      jwt.verify(
        rf_token,
        process.env.REFRESHTOKENSECRET,
        async (err, user) => {
          if (err) return res.status(400).send({ msg: "Please login now!" });

          const findUser = await Users.findById(user.id)
            .select("-password")
            .populate("followers following", "-password");

          if (!findUser)
            return res.status(400).send({ msg: "This user does not exist." });
          const acesstoken = createAccessToken({ id: user.id });
          res.send({ acesstoken });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESSTOKENSECRET, { expiresIn: "1d" });
};

const createRefreshAccessToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESHTOKENSECRET, {
    expiresIn: "30d",
  });
};

module.exports = authController;
