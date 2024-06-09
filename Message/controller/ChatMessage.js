const Message= require('../Message')

const chatMessage = async(req,res) => {
   try {
    const { conversationId, senderId, message} = req.body;
    const newMessage = new Message({ conversationId, senderId, message});
   const result =  await newMessage.save()
   res.status(200).json({
       Chat : result,
       message: "Message send Sucessfully"
   })

   } catch (error) {
       console.log(error)
   }
}

module.exports = {chatMessage}

