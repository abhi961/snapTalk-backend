const follow = require("../Friendlist/Follow");
const path = require('path')

const createUser = async(req,res) => {
    try {
        const { name,email, phone, age, bio,password } = req.body;
        const image = path.join("uploads", req.file.filename);
    
        let followerlist = new follow({
          name,
          age,
          email,
          password,
          phone,
          bio,
          image,
        });
    
        let result = await followerlist.save();
        // res.send(result);
        res.status(200).json({
          success: 200,
          follow: result,
          message: "Follower add sucessfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message,
          message: "Error creating player",
        });
      }
}
module.exports = {createUser}