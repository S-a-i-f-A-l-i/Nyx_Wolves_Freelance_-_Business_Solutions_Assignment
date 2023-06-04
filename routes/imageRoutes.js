import express from "express";
const router = express.Router();

import {
  uploadImage,
  removeImage,
  getImages,
} from "../controllers/imageController.js";

router.route("/images").post(uploadImage).get(getImages);
router.route("/images/:dbid/:cloudid").delete(removeImage);

export default router;
