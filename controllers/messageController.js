import Message from "../models/Message.js";
import mongoose from "mongoose";

const createMessage = async (req, res) => {
  res.status(200).json({ message: "Request came in createMessage" });
};
const readMessage = async (req, res) => {
  res.status(200).json({ message: "Request came in readMessage" });
};
const updateMessage = async (req, res) => {
  res.status(200).json({ message: "Request came in updateMessage" });
};
const deleteMessage = async (req, res) => {
  res.status(200).json({ message: "Request came in deleteMessage" });
};

export { createMessage, readMessage, updateMessage, deleteMessage };
