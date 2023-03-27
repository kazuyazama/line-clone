//チャットやり取り画面

import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { useChat } from "../context/chatContext";

const Message = ({ message }) => {
  const { data } = useChat();
  const { currentUser } = useAuth();


  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>
          {message.senderId === currentUser.uid
            ? currentUser.displayName
            : data.user.displayName}
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
