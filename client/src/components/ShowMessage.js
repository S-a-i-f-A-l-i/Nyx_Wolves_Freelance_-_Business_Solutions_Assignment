import React, { useState } from "react";
import axios from "axios";
const ShowMessage = ({ message, id, handleAfterDelete }) => {
  const [getMessage, setGetMessage] = useState(message);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [editMessage, setEditMessage] = useState(message);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMessage) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
    try {
      const res = await axios.patch(`http://localhost:5000/api/message/${id}`, {
        message: editMessage,
      });
      // console.log(res);
      message = res.data.updatedMessage.message;
      setGetMessage(res.data.updatedMessage.message);
      setEditMessage("");
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/message/${id}`);
      console.log(res);
      handleAfterDelete();
    } catch (error) {
      console.log(error);
    }
  };
  const pStyle = {
    color: "red",
  };
  return (
    <div>
      {edit ? (
        <div>
          <br />
          {alert ? (
            <p style={pStyle}>Please enter a valid message</p>
          ) : (
            <p>Enter updated message</p>
          )}
          <input
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
          />
          &nbsp;
          <button onClick={handleSubmit}>submit</button>
          <br />
          <br />
        </div>
      ) : (
        <h3>{getMessage}</h3>
      )}
      {!edit && (
        <div>
          <button
            onClick={() => setEdit(true)}
            style={{ backgroundColor: "yellow" }}
          >
            Edit
          </button>
          &nbsp;
          <button
            onClick={() => {
              handleDelete();
            }}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowMessage;
