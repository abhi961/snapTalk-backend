const Conversations = require("../conversationSch");
const follow = require("../../Friendlist/Follow");
const Message = require("../../Message/Message"); 

const ConversList = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all conversations where the user is a member
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });

    // Fetch the latest message for each conversation
    const conversationDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await follow.findById(receiverId);

        // Fetch the latest message
        const latestMessage = await Message.findOne({
          conversationId: conversation._id,
        }).sort({ createdAt: -1 }); // Sort by most recent message

        return {
          user: { name: user.name, image: user.image, id: user._id , latestMessage: latestMessage ? latestMessage.message : ""},
          conversationId: conversation._id,
        };
      })
    );

    res.status(200).json({
      conversationList: conversationDetails,
      message: "List getting successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { ConversList };
