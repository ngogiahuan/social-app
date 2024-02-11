const Users = require("../../models/userModel");
const bcrypt = require("bcrypt");
const {
  createAccessToken,
  createRefreshAccessToken,
} = require("../../utils/token");

const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Users.findOne({
      $or: [{ userName: userName }, { email: userName }],
    }).populate("followers following", "-password");

    if (!user)
      return res.status(200).send({
        msg: "This userName or email does not exist.",
        isSuccess: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(200)
        .send({ msg: "Password is incorrect.", isSuccess: false });

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshAccessToken({ id: user._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.send({
      msg: "Login successful",
      isSuccess: true,
      data: user,
      accesstoken,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = loginController;
