const Conversations = require("./../../conversation/conversationSch");
const Message = require("../Message");

const chatMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message, recevierId = "" } = req.body;
    console.log(conversationId, "CovoId");
    console.log(senderId, "sender");
    console.log(message, "msg");
    console.log(recevierId, "recevierId");
    if (!senderId || !message)
      return res.status(400).json({
        message: "please fill the senderId and Message",
      });
    if (!conversationId && recevierId) {
      const newConversation = new Conversations({
        members: [senderId, recevierId],
      });
      await newConversation.save();
      const newMessage = new Message({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).json({
        message: "Message send Successfully",
      });
    } else if (!conversationId && !recevierId) {
      res.status(400).json({
        message: "Please fill the Required Field",
      });
    }

    const newMessage = new Message({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).json("Message send Sucessfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { chatMessage };
