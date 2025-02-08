const Message = require("../models/Message");
const renameSync = require("fs").renameSync;

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

exports.addImageMessage = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (req.file) {
      console.log("files:, ", req.file);
      const date = Date.now();
      const getUser = onlineUsers ? onlineUsers.get(to) : null;

      const originalName = req.file.originalname;
      let fileName = "uploads/images/" + date + "_" + originalName;
      console.log(fileName);
      console.log(req.file.path);

      renameSync(req.file.path, fileName);

      if (from && to) {
        // Determine the type based on the file extension
        const fileType = originalName.endsWith('.pdf') ? 'file' : 'image';

        const message = await Message.create({
          sender: from,
          receiver: to,
          message: fileName,
          type: fileType, // Use the determined file type
          status: getUser ? "delivered" : "sent",
        }).then((message) => message.populate(["sender", "receiver"]));

        return res.status(200).json({
          success: true,
          result: "Image added successfully",
          message,
        });
      }

      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
    return res.status(400).json({
      success: false,
      error: "Image is Required",
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addAudioMessage = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (req.file) {
      console.log("files:, ", req.file);
      const date = Date.now();
      const getUser = onlineUsers ? onlineUsers.get(to) : null;

      const originalName = req.file.originalname;
      let fileName = "uploads/recordings/" + date + "_" + originalName;
      console.log(fileName);
      console.log(req.file.path);

      renameSync(req.file.path, fileName);

      if (from && to) {

        const message = await Message.create({
          sender: from,
          receiver: to,
          message: fileName,
          type: "audio", // Use the determined file type
          status: getUser ? "delivered" : "sent",
        }).then((message) => message.populate(["sender", "receiver"]));

        return res.status(200).json({
          success: true,
          result: "Audio added successfully",
          message,
        });
      }

      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
    return res.status(400).json({
      success: false,
      error: "Audio is Required",
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}