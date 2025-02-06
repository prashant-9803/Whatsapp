import React from "react";
import ChatList from "../components/Chatlist/ChatList";
import Empty from "../components/Empty";
import Chat from "../components/Chat/Chat";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList/>
        {/* <Empty/> */}
        <Chat/>
      </div>
    </>
  );
};

export default Home;
