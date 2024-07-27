const Conversations = require('../conversationSch')

const conversation = async(req,res)=>{
 try {
    const {senderId,recevierId} = req.body;
    // console.log( req.body,"Body")
    if(!senderId || !recevierId)
        return res.status(400).json({
    message:'required senderId and recevierId'})
    const newConversation = new Conversations({members:[senderId, recevierId]});
    await newConversation.save()
    res.status(200).json({
        message:'conversation create suceesully',
        conversation:newConversation
    })

 } catch (error) {
     res.status(500).send('Server error');
 }
}

module.exports = {conversation}