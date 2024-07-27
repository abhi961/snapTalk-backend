const express = require("express");
const app = express();
app.use(express.json());
require("./DB/config");
const multer = require("multer");
const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
const bodyParser = require("body-parser");
app.use(cors());
const { createUser } = require("./userController/createUser");
const { userList } = require("./userListController/userList");
const { createReels } = require("./createReelsController/createReels");
const { reelsList } = require("./reelsLIstController/reelsList");
const { userLogin } = require("./Login/Login");
const { verifyToken } = require("./token/verifytoken");
const {conversation} = require('./conversation/controller/Conversations')
const {ConversList} = require('./conversation/controller/conversationList')
const {chatMessage} = require("./Message/controller/ChatMessage")
const {getChat} = require('./Message/controller/chatList')

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

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage1 });
app.use(bodyParser.json());

// app.post("/api/user", upload.single("image"), createUser);
app.post("/api/user", upload.single("image"), createUser);
app.post("/api/login", userLogin);

app.get("/api/list", verifyToken, userList);

app.post("/api/shorts", uploads.single("video"), createReels);

app.get("/api/shortslist", verifyToken, reelsList);
app.post('/api/conversation', conversation);

app.get('/api/conversationList/:userId',verifyToken,ConversList)
app.post('/api/message', chatMessage);

app.get('/api/getChat/:conversationId', getChat)

app.listen(8000, () => {
  console.log(`server is running on 8000`);
});
   