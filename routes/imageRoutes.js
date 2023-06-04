import express from "express";
const router = express.Router();

import { uploadImage, removeImage } from "../controllers/imageController";

router.route("/images").post(uploadImage);
router.route("/images").post(removeImage);
