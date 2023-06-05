import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowMessage from "./ShowMessage";
import PaginationButton from "./PaginationButton";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [alert, setAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pages = Array.from({ length: totalPage }, (_, index) => {
    return index + 1;
  });
  const getAllMessage = async () => {
    const res = await axios.get(
      `https://nyx-wolves-freelance-business-solutions.onrender.com/api/message?page=${currentPage}`
    );
    setAllMessage(res.data.messages);
    setTotalPage(res.data.numberOfPages);
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
      const res = await axios.post(
        "https://nyx-wolves-freelance-business-solutions.onrender.com/api/message",
        {
          message,
        }
      );
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
  }, [setAllMessage, currentPage]);
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
      <br />
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((item, index) => {
        return (
          <PaginationButton
            key={index}
            page={item}
            currentPage={currentPage}
            handlePage={setCurrentPage}
          />
        );
      })}
      <button
        disabled={currentPage >= totalPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default MessageInput;
