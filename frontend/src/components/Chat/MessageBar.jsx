import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE_ROUTE } from "../../utils/ApiRoutes";

const MessageBar = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const { currentChatUser } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.message);

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        from: user?._id,
        to: currentChatUser?._id,
        message,
      });
      socket.current.emit("send-msg", {
        from: user?._id,
        to: currentChatUser?._id,
        message: data.message,
      });
      setMessage("");
    } catch (error) {
      console.log("error while sending message controller", error);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative ">
      <>
        <div className="flex gap-6 ">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach File"
          />
        </div>

        <div className="w-full rounded-lg flex items-center h-10">
          <input
            type="text"
            placeholder="Type a Message"
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="w-10 items-center flex justify-center">
          <button>
            <MdSend
              onClick={sendMessage}
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Send message"
            />
            {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title="Record"/> */}
          </button>
        </div>
      </>
    </div>
  );
};

export default MessageBar;
