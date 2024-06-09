const Follow = require("../Friendlist/Follow");
const jwt = require("jsonwebtoken");
const jwtKey = "Funwithsnaptak";

const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.password && req.body.email) {
      let User = await Follow.findOne(req.body).select("-password");
      if (User) {
        jwt.sign({ User }, jwtKey, { expiresIn: "2h" }, (error, token) => {
          if (error) {
            res.send({
              error: "something went wrong",
            });
          }
          res.status(200).json({
            success: 200,
            user: User,
            token: token,
            message: "Login sucessfully",
          });
        });
      } else if (!User) {
        // res.send({
        //   message: "worng credentials",
        // });
        res.status(201).json({
          message: "user and Password not exsits",
        });
      } 
      
      else {
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
