const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    conversationId:String,
    senderId:String,
    message:String,
    createdAt: { type: Date, default: Date.now },
    
})

module.exports = mongoose.model('Messages', messageSchema)