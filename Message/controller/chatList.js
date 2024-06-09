const Message = require("../Message");

const getChat = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const message = await Message.find({ conversationId });
    res.status(200).json({
      chat: await message,
      message: "message list",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getChat };
