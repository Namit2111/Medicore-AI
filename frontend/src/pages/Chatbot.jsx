import React, { useState, useEffect, useRef, Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import ButtonM from "../components/ButtonM";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Typewriter from '../components/Typewriter'
function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const scheduleAppointment = async () => {
    console.log("inside function");
    try {
      const newMessage = {
        sender: "user", // Adjust if your backend sends the sender info
        text: "I want to consult with a doctor. Can you help me schedule appointment",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      const response = await fetch("http://localhost:5000/chat/", {
        method: "POST", // Specify the request method if you're sending data
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ message: input }), // Replace 'userMessage' with the actual message you want to send
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();

      // Ensure data['response'] is formatted as { sender: 'bot', text: 'response text' }
      if (data && data.response) {
        const newMessage = {
          sender: "bot", // Adjust if your backend sends the sender info
          text: data.response,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Unexpected response format:", data);
      }
      setInput("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const talkToAi = async () => {
    console.log("inside function");
    try {
      const newMessage = {
        sender: "user", // Adjust if your backend sends the sender info
        text: "I want your Help. I am not feeling well",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      const response = await fetch("http://localhost:5000/chat/", {
        method: "POST", // Specify the request method if you're sending data
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ message: input }), // Replace 'userMessage' with the actual message you want to send
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();

      // Ensure data['response'] is formatted as { sender: 'bot', text: 'response text' }
      if (data && data.response) {
        const newMessage = {
          sender: "bot", // Adjust if your backend sends the sender info
          text: data.response,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Unexpected response format:", data);
      }
      setInput("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const [showMessages, setShowMessages] = useState(false);

  // Simulate delay in showing messages
  useEffect(() => {
    const timer = setTimeout(() => setShowMessages(true), 2000); // Delay for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    console.log("inside function");
    try {
      const newMessage = {
        sender: "user", // Adjust if your backend sends the sender info
        text: input,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      const response = await fetch("http://localhost:5000/chat/", {
        method: "POST", // Specify the request method if you're sending data
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ message: input }), // Replace 'userMessage' with the actual message you want to send
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();

      // Ensure data['response'] is formatted as { sender: 'bot', text: 'response text' }
      if (data && data.response) {
        const newMessage = {
          sender: "bot", // Adjust if your backend sends the sender info
          text: data.response,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Unexpected response format:", data);
      }
      setInput("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex flex-col place-content-center justify-center justify-items-center place-items-center">
      <div className="h-32 text-center w-full justify-center align-middle bg-purple-700 z-1000 text-white font-extrabold text-7xl place-content-center place-self-center fixed top-0 flex">
        <div>Medicore</div>
      </div>
      <div className="flex flex-col h-full w-1/2 border border-gray-300 rounded-full">
        <div className="flex flex-col h-fit p-4 bg-white">
          <div className="h-2/3 m-4 justify-center place-content-center">
            <span className="m-auto text-2xl">
              Hi!! I am Medicore an AI assistant to help with your medical
              issues
            </span>
            <div className="grid grid-cols-2 w-fit p-2 m-auto justify-center">
              <ButtonM
                icon={<AutoAwesomeIcon className="text-amber-600" />}
                text={"Consult with me"}
                action={talkToAi}
              />
              <ButtonM
                icon={<DateRangeIcon className="text-teal-500" />}
                text={"Schedule appointment"}
                action={scheduleAppointment}
              />
            </div>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`border-2 text-md flex h-fit rounded-xl justify-center place-content-center w-fit flex-col ${
                msg.sender != "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <Suspense
                fallback={
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                }
              >
                <div
                  className={`m-auto p-3 rounded-lg ${
                    msg.sender === "bot"
                      ? "bg-fuchsia-200 text-fuchsia-700"
                      : "bg-fuchsia-700 text-white"
                  } place-content-center w-fit`}
                >
                  {msg.sender === "bot" ? (
        <Typewriter text={msg.text} />
      ) : (
        msg.text
      )}
                </div>
              </Suspense>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center fixed bottom-10 border border-black z-1000">
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full mr-2"
            placeholder="Message"
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 h-10 w-14 bg-purple-500 text-white hover:bg-purple-400 rounded-full"
          >
            <SendRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
