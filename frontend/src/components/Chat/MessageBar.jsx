import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

const MessageBar = () => {
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
          <input type="text" placeholder="Type a Message" className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"/>
        </div>

        <div className="w-10 items-center flex justify-center">
          <button>
            <MdSend className="text-panel-header-icon cursor-pointer text-xl" title="Send message"/>
            {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title="Record"/> */}
          </button>
        </div>
      </>
    </div>
  );
};

export default MessageBar;
