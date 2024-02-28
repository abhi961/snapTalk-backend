const mongoose = require('mongoose');
const shortsSchema = mongoose.Schema({
    name:String,
    desc:String,
    video:String,
    image:String,
    createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('shortslists', shortsSchema)