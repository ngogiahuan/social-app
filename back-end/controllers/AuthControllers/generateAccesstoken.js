const Users = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../../utils/token");

const generateAccesstoken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).send({ msg: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESHTOKENSECRET, async (err, user) => {
      if (err) return res.status(400).send({ msg: "Please login now!" });

      const findUser = await Users.findById(user.id)
        .select("-password")
        .populate("followers following", "-password");

      if (!findUser)
        return res.status(400).send({ msg: "This user does not exist." });
      const acesstoken = createAccessToken({ id: user.id });
      res.send({ acesstoken });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = generateAccesstoken;
