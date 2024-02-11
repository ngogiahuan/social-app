const logoutController = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
    return res.send({ msg: "Logged out" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = logoutController;
