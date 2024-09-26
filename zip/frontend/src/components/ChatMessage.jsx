import React, { Suspense, lazy } from "react";
import { ThreeDots } from "react-loader-spinner";

const LazyTypewriter = lazy(() => import("./Typewriter"));

const ChatMessage = ({ msg }) => {
  return (
    <div className="w-full h-fit  flex flex-col p-2">
      <div
        className={`text-xl rounded-b-3xl font-bold font-sans max-w-md p-4 shadow  ${
          msg.sender !== "bot"
            ? "place-self-end  rounded-tl-3xl bg-teal-700 text-white"
            : "place-self-start rounded-tr-3xl bg-teal-200 text-teal-700"
        }`}
      >
        <Suspense fallback={<ThreeDots height="40" width="40" color="teal" />}>
          {msg.sender === "bot" ? <LazyTypewriter text={msg.text} /> : msg.text}
        </Suspense>
      </div>
    </div>
  );
};

export default ChatMessage;