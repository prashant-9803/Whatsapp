import React, { useEffect } from "react";
import ChatList from "../components/Chatlist/ChatList";
import Empty from "../components/Empty";
import Chat from "../components/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_MESSAGES_ROUTE } from "../utils/ApiRoutes";
import {setMessages} from '../slices/messageSlice'

const Home = () => {
  
  const { currentChatUser } = useSelector((state) => state.ui);
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async() => {
      const {data: {messages}} = await axios.get(`${GET_MESSAGES_ROUTE}/${user._id}/${currentChatUser._id}`)
      console.log({messages})
      dispatch(setMessages(messages))
    }
    if(currentChatUser) getMessages()
  }, [currentChatUser]);

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
