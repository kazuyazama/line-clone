import { IconDots, IconUserPlus, IconVideo } from "@tabler/icons-react";
import React from "react";
import { useChat } from "../context/chatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useChat();
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <IconVideo />
          <IconUserPlus />
          <IconDots />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
