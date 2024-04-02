const follow = require('../VideoShort/Shorts')

const reelsList =async (req,res) => {
    try {
        let shortslist = await Shorts.find();
        if (shortslist.length > 0) {
          res.status(200).json({
            status: 200,
            ShortsList: shortslist,
            message: "Shorts list sucessfully",
          });
        } else {
          res.status(500).json({
            status: false,
            error: error.message,
            message: "Something went wrong",
          });
        }
      } catch (error) {
        res.status(500).json({
          status: false,
          error: error.message,
          message: "Something went wrong",
        });
      }
}
module.exports = {reelsList}