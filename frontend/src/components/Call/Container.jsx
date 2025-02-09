import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../context/SocketContext";
import { MdOutlineCallEnd } from "react-icons/md";
import { setEndCall } from "../../slices/uiSlice";

const Container = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  console.log("Data:", data);
  const [callAccepted, setCallAccepted] = useState(false);

  const endCall = () => {
    const id = data?._id;
    if (data.callType === "voice") {
      socket.current.emit("reject-voice-call", { from: id });}
    else {
      socket.current.emit("reject-video-call", { from: id });
    }
    dispatch(setEndCall());
  };

  return (
    <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center ">
        <span className="text-5xl capitalize">{data?.name}</span>
        <span className="text-lg">
          {callAccepted && data?.callType !== "video"
            ? "Ongoing Call"
            : "Calling..."}
        </span>
      </div>
      {(!callAccepted || data?.callType === "audio") && (
        <div className="my-24">
          <img
            src={data?.profilePicture}
            alt="avatar"
            height={300}
            width={300}
            className="rounded-full"
          />
        </div>
      )}

      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full ">
        <MdOutlineCallEnd
          onClick={endCall}
          className="text-3xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Container;
