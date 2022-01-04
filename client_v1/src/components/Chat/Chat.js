import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";


let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    console.log(name, "FROM");

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.off();
    };
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on(
      "message",
      (message) => {
        setMessages([...messages, message]);
      },
      [messages]
    );
  });

  // sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(event.target.value));
    }
    setMessage('')
  };
  

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}></InfoBar>
        <Messages messages={messages} name={name}></Messages>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>

        {/* <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        /> */}
      </div>
    </div>
  );
};

export default Chat;
