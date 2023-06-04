import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowMessage from "./ShowMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [alert, setAlert] = useState(false);
  const getAllMessage = async () => {
    const res = await axios.get("http://localhost:5000/api/message");
    setAllMessage(res.data.messages);
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/message", {
        message,
      });
      setMessage("");
      getAllMessage();
    } catch (error) {
      console.log(error);
    }
  };
  const hStyle = {
    color: "red",
  };
  useEffect(() => {
    getAllMessage();
  }, [setAllMessage]);
  return (
    <div>
      {alert ? (
        <h1 style={hStyle}>Please add a valid message</h1>
      ) : (
        <h1>Add a Message</h1>
      )}
      <form>
        <input
          type="text"
          placeholder="Enter a Message"
          value={message}
          onChange={handleChange}
        />
        &nbsp;
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <br />
      {allMessage &&
        allMessage.map((item, index) => {
          return (
            <ShowMessage
              key={item._id}
              id={item._id}
              message={item.message}
              handleAfterDelete={getAllMessage}
            />
          );
        })}
    </div>
  );
};

export default MessageInput;
