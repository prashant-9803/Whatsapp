const Message = require("../models/Message");

exports.addMessage = async (req, res) => {
  try {
    const { message, from, to } = req.body;
    // onlineusers todo
    const getUser = onlineUsers ? onlineUsers.get(to) : null;

    //from to parseInt
    if (message && from && to) {
      const newMessage = await Message.create({
        sender: from,
        receiver: to,
        message,
        status: getUser ? "delivered" : "sent",
      }).then((message) => message.populate(["sender", "receiver"]));

      return res.status(200).json({
        success: true,
        result: "Message added successfully",
        message: newMessage,
      });
    }

    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from },
      ],
    })
      .populate(["sender", "receiver"])
      .sort({ _id: 1 });

    const unreadMessages = [];

    messages.forEach((message, index) => {
      if (message.status !== "read" && message.sender._id.toString() === to) {
        messages[index].status = "read";
        unreadMessages.push(message._id);
      }
    });

    await Message.updateMany(
      { _id: { $in: unreadMessages } },
      { $set: { status: "read" } }
    );

    return res.status(200).json({
      success: true,
      result: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
