
const Conversations = require('../conversationSch');
const follow = require('../../Friendlist/Follow')

const ConversList = async(req,res) => {
 try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({ members : { $in: [userId] }})
    const conversationUser =Promise.all(conversations.map(async(conversation)=>{
        const recevierId = conversation.members.find(member=> member !== userId);
         const user = await  follow.findById(recevierId)
         return {user: {name: user.name , image: user.image }, conversationId: conversation._id }
    }))
    console.log( await conversationUser,"conversationUser--------->")
    res.status(200).send(await conversationUser)
 } catch (error) {
    console.log(error)
 }
}

module.exports = {ConversList}