const Users = require("../../models/userModel");
const bcrypt = require("bcrypt");
const {
  createAccessToken,
  createRefreshAccessToken,
} = require("../../utils/token");

const registerController = async (req, res) => {
  try {
    const { userName, fullName, email, password, gender } = req.body;
    const newUserName = userName.toLowerCase().replace(/ /g, "");
    const existeduserName = await Users.findOne({ userName: newUserName });
    if (existeduserName)
      return res
        .status(200)
        .send({ msg: "This username already exists.", isSuccess: false });

    const newEmail = email.toLowerCase();
    const existedEmail = await Users.findOne({ email: newEmail });
    if (existedEmail)
      return res
        .status(200)
        .send({ msg: "This email already exists.", isSuccess: false });

    if (password.length < 8)
      return res.status(200).send({
        msg: "Password must be at least 8 characters.",
        isSuccess: false,
      });
    const hashedPassword = await bcrypt.hash(password, 13);

    const newUser = new Users({
      userName: newUserName,
      fullName,
      email: newEmail,
      password: hashedPassword,
      gender,
    });

    const accesstoken = createAccessToken({ id: newUser._id });
    const refreshtoken = createRefreshAccessToken({ id: newUser._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    await newUser.save();
    res.send({
      msg: "Register successful",
      isSuccess: true,
      data: newUser,
      accesstoken,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = registerController;
