const express = require("express");
const app = express();
require("./DB/config");
const follow = require("./Friendlist/Follow");
const Shorts = require("./VideoShort/Shorts");
const path = require("path");
const multer = require("multer");
app.use(express.json());
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
const bodyParser = require("body-parser");
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());

// short upload video multer section //

const videoStorage = multer.diskStorage({
  diskStorage: (req, file, cb) => {
    const uploadPath = "ShortVideo";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const videoUpload = multer({ storage: videoStorage });
app.use(bodyParser.json());

app.post("/api/uploads", upload.single("image"), async (req, res) => {
  try {
    const { name, age, distance, level, bio } = req.body;
    const image = path.join("uploads", req.file.filename);

    let followerlist = new follow({
      name,
      age,
      distance,
      level,
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
});

app.get("/api/list", async (req, res) => {
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
});

// upload shorts video //

app.post("/api/shorts", videoUpload.single("video"), async (req, res) => {
  try {
    const { desc, name } = req.body;
    const video = path.join("ShortVideo", req.file.filename);
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
});

app.get("/api/shortslist", async (req, res) => {
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
});

app.listen(8000, () => {
  console.log(`server is running on 8000`);
});
