import Message from "../models/Message.js";

const createMessage = async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Please provide a valid message" });
  }
  const mess = await Message.create({ message });
  res.status(201).json({ message: mess });
};
const readMessage = async (req, res) => {
  let result = Message.find({});
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const messages = await result;
  const totalMessages = await Message.countDocuments({});
  const numberOfPages = Math.ceil(totalMessages / limit);
  res.status(200).json({ messages, totalMessages, numberOfPages });
};
const updateMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Please provide a valid message" });
  }
  const mess = await Message.findOneAndUpdate(
    { _id: messageId },
    { message },
    {
      new: true,
    }
  );
  res.status(200).json({ updatedMessage: mess });
};
const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const mess = await Message.findOne({ _id: messageId });
  if (!mess) {
    return res.status(404).json({ error: `No message with id :${messageId}` });
  }
  await mess.deleteOne();
  res.status(200).json({ message: "Success! message deleted" });
};

export { createMessage, readMessage, updateMessage, deleteMessage };
