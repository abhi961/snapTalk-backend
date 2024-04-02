const Shorts = require("../VideoShort/Shorts");
const path = require('path')

const createReels = async(req,res) => {
    try {
        const { desc, name } = req.body;
        const video = path.join("uploads", req.file.filename);
        let ShortsList = new Shorts({
          name,
          video,
          desc,
        });
    
        let uploadVideo = await ShortsList.save();
    
        res.status(200).json({
          success: 200,
          shorts: uploadVideo,
          message: "Shorts add sucessfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message,
          message: "Something went wrong",
        });
      }
} 

module.exports = {createReels}