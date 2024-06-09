const Conversations = require('../conversationSch')

const conversation = async(req,res)=>{
 try {
    const {senderId,recevierId} = req.body;
    const newConversation = new Conversations({members:[senderId,recevierId]});
    await newConversation.save()
    res.status(200).json({
        message:'conversation create suceesully'
    })

 } catch (error) {
     res.status(500).send('Server error');
 }
}

module.exports = {conversation}