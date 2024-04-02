const follow = require('../Friendlist/Follow')

const userList =async (req,res)=>{
    try {
        let followerlist = await follow.find();
        if (followerlist.length > 0) {
          // res.send(followerlist);
          res.status(200).json({
            status: 200,
            follow: followerlist,
            message: "Follower list sucessfully",
          });
        } else {
          res.status(500).json({
            status: false,
            error: error.message,
            message: "Error creating player",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message,
          message: "Somthing went wrong",
        });
      }
}
module.exports = {userList}