import React from "react";
import Avatar from "../common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { setContactsPage } from "../../slices/uiSlice";

const ChatListHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAllContactsPage = () => {
    dispatch(setContactsPage(true));
  }

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center ">
      <div className="cursor-pointer">
        <Avatar type="sm" image={user?.profilePicture} />
      </div>
      <div>
        <div className="flex gap-6 ">
          <BsFillChatLeftTextFill
            className="text-panel-header-icon cursor-pointer text-xl "
            title="New chat"
            onClick={handleAllContactsPage}
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
