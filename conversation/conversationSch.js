const mongoose = require('mongoose')
const conversationSchema = mongoose.Schema({
   
    members:Array,
    createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model("conversations", conversationSchema);