const mongoose = require("mongoose");
const FollowSchema = mongoose.Schema({
  
  name: String,
  email: String,
  phone: Number,
  password: String,
  image: String,
  age: Number,
  bio: String,

  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("followerlists", FollowSchema);
