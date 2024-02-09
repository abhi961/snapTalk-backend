const express = require("express");
const app = express();
require("./DB/config");
const follow = require("./Friendlist/Follow");
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
      message: "Error creating player",
    });
  }
});

app.listen(8000, () => {
  console.log(`server is running on 8000`);
});
