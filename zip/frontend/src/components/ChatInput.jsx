import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const ChatInput = ({ input, setInput, handleSendMessage, textareaRef }) => {
  return (
    <div className="fixed bottom-5 w-2/3 flex items-center text-center justify-center place-items-center space-x-2  bg-teal-100 rounded-full p-2 shadow-md h-20">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.overflow = 'auto';
          e.target.style.scrollbarWidth = 'none';
          e.target.style.msOverflowStyle = 'none'; 
          e.target.style.WebkitScrollbar = 'none'; 
          e.target.style.height = "auto"; // Reset height
          e.target.style.height = `${e.target.scrollHeight}px`;        e.target.style.height = "auto"; // Reset height
          e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on content
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents new line from Enter
            handleSendMessage(); // Call send message function
          }
        }}
        className="flex-1 px-4 py-2 border justify-center place-items-center border-gray-300 rounded-full h-full focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none overflow-auto text-2xl"
        placeholder="Message Medicore"
        rows="1"
        style={{  resize: "none", // Prevent manual resize
          lineHeight: "28px", // Define row height
          maxHeight: "112px", // Maximum height for 4 rows (28px * 4 = 112px)
          overflowY: "auto", }}
      />
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-teal-500 size-14 text-white hover:bg-teal-400 rounded-full flex items-center justify-center"
      >
        <SendRoundedIcon />
      </button>
    </div>
  );
};

export default ChatInput;
