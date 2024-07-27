const mongoose = require("mongoose");
const conversationSchema = mongoose.Schema({
  members: [],
  createdAt: { type: Date, default: Date.now },

  
});
module.exports = mongoose.model("conversations", conversationSchema);
