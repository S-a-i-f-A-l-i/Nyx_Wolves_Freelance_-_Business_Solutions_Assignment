import express from "express";
const router = express.Router();

import {
  createMessage,
  readMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";

router.route("/message").post(createMessage).get(readMessage);
router.route("/message/:id").delete(deleteMessage).patch(updateMessage);

export default router;
