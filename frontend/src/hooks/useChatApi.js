import { useState } from "react";
import { fetchChat } from "../services/chatService";

const useChatAPI = (initialUrl) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stateUrl, setStateUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    try {
      const newMessage = {
        sender: "user",
        text: input,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIsLoading(true);

      // Fetch bot's response
      const response = await fetchChat(stateUrl, input);

      // Handle bot response
      if (response && response.flag) {
        // Handle special flag cases
      }
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: response.text }]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message", error);
      setIsLoading(false);
    }
  };

  return { messages, setMessages, input, setInput, handleSendMessage, setStateUrl };
};

export default useChatAPI;
