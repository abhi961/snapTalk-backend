const Follow = require("../Friendlist/Follow");

const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.password && req.body.email) {
      let User = await Follow.findOne(req.body).select("-password");
      if (User) {
        res.status(200).json({
          success: 200,
          user: User,
          message: "Login sucessfully",
        });
      } else if (!User) {
        res.send({ user: "worng credentials" });
      } else {
        res.send({ user: "worng credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "user Not Found",
    });
  }
};
module.exports = { userLogin };
