import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const ImageInput = () => {
  const [inputImages, setInputImages] = useState({});
  const [gotImages, setGotImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setInputImages(e.target.files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputImages) {
      for (let i = 0; i < inputImages.length; i++) {
        Resizer.imageFileResizer(
          inputImages[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `https://nyx-wolves-freelance-business-solutions.onrender.com/api/images`,
                { image: uri }
              )
              .then((res) => {
                // console.log(res);
                getAllImages();
                setInputImages({});
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  const getAllImages = async () => {
    const res = await axios.get(
      `https://nyx-wolves-freelance-business-solutions.onrender.com/api/images`
    );
    console.log("old", JSON.stringify(gotImages), "new", res.data.images);
    if (JSON.stringify(gotImages) !== JSON.stringify(res.data.images)) {
      setGotImages(res.data.images);
    }
  };
  const handleDelete = async (_id, public_id) => {
    try {
      await axios.delete(
        `https://nyx-wolves-freelance-business-solutions.onrender.com/api/images/${_id}/${public_id}`
      );
      getAllImages();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImages();
  }, [gotImages]);
  return (
    <div>
      <h1>Multiple Image Add</h1>
      <input type="file" multiple accept="image/*" onChange={handleChange} />
      &nbsp;
      <button disabled={loading} onClick={handleSubmit}>
        Submit
      </button>
      <br />
      <br />
      {gotImages.map((item, ind) => {
        {
          /* console.log(item); */
        }
        return (
          <div key={ind}>
            <img
              style={{ height: "500px", width: "420px" }}
              src={item.url}
              alt={ind}
            />
            <button onClick={() => handleDelete(item._id, item.public_id)}>
              Delete
            </button>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ImageInput;
