import React from "react";
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

const ChatListHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center ">
      <div className="cursor-pointer">
        <Avatar type="sm" image={user?.profilePicture} />
      </div>
      <div>
        <div className="flex gap-6 ">
          <BsFillChatLeftTextFill
            className="text-panel-header-icon cursor-pointer text-xl "
            title="newChat"
          />
          <>
            <BsThreeDotsVertical
              className="text-panel-header-icon cursor-pointer text-xl "
              title="menu"
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default ChatListHeader;
