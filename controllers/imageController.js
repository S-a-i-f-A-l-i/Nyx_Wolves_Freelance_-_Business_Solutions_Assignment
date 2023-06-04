import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import Image from "../models/Image.js";
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
const uploadImage = async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "Please provide a Image" });
  }
  try {
    const response = await cloudinary.uploader.upload(req.body.image, {
      public_id: `myName`,
      resource_type: "auto",
    });
    const { resource_type, url, width, height, format, public_id } = response;
    const img = await Image.create({
      resource_type,
      url,
      width,
      height,
      format,
      public_id,
    });
    res.status(201).json({ image: img });
  } catch (error) {
    console.log("inError", error);
  }
};
const getImages = async (req, res) => {
  const result = Image.find({});
  const images = await result;
  res.status(200).json({ images });
};
const removeImage = async (req, res) => {
  const { dbid: imageId, cloudid: public_id } = req.params;
  try {
    const img = await Image.findOne({ _id: imageId });
    if (!img) {
      return res.status(404).json({ error: `No message with id :${imageId}` });
    }
    await img.deleteOne();
    res.status(200).json({ message: "Success! message deleted" });

    cloudinary.uploader.destroy(public_id, (error, result) => {
      // if (error) return res.json({ success: false, error });
      // res.send("OK");
      // if (error) console.log("not deleted from cloud", error);
      // else console.log("deleted from cloud also",result);
    });
  } catch (error) {
    console.log(error);
  }
};

export { uploadImage, removeImage, getImages };
