const mongoose = require('mongoose');
const FollowSchema = mongoose.Schema({
    name:String,
    age:Number,
    level:Number,
    distance:Number,
    bio:String,
    image:String,
    createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('followerlists', FollowSchema)