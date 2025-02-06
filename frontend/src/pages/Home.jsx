import React from "react";
import ChatList from "../components/Chatlist/ChatList";
import Empty from "../components/Empty";
import Chat from "../components/Chat/Chat";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentChatUser } = useSelector((state) => state.ui);

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />

        {currentChatUser ? <Chat /> : <Empty />}
      </div>
    </>
  );
};

export default Home;
