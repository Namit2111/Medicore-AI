import React, { useState, useEffect, useRef, Suspense,lazy } from "react";
import { ThreeDots } from "react-loader-spinner";
import ButtonM from "../components/ButtonM";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Typewriter from "../components/Typewriter";

// Simulating a delay using a promise
const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lazy loading with delay
const LazyTypewriter = lazy(() =>
  simulateDelay(2000).then(() => ({ default: Typewriter }))
);
function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const chatcontainerRef=useRef(null)
  const textareaRef = useRef(null);
  const[schedule_f,setSchedule]=useState(false)
  const[stateUrl,setStateurl]=useState('http://localhost:5000/chat/')
  const [input, setInput] = useState("");
  const [showbutton,setShowbutton]=useState(false)
  const fetchChatResult = async () => {
    try {
      const response_cure = await fetch('http://localhost:5000/chat/result', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "result" }),
        credentials: "include",
      });
  
      if (!response_cure.ok) {
        throw new Error("Network response was not ok");
      }
  
      const datanew = await response_cure.json();
      console.log("Data from /chat/result:", datanew);
      // Check if the response is "No conversation found"
      if (datanew.response === "No conversation found") {
        setMessages((prevMessages) => [...prevMessages, {
          sender: "bot",
          text: datanew.response, // Directly use the response
        }]);
      } else {
        // Assuming `datanew.response` is an object with `disease` and `cure` properties
        setMessages((prevMessages) => [...prevMessages, {
          sender: "bot",
          text: `Possible reasons of your Health:\n ${datanew.response.disease}\n\nRemedies:\n${datanew.response.cure}`, // Format the response
        }]);
        setMessages((prevMessages) => [...prevMessages, {
          sender: "bot",
          text: `${datanew.response.appt}`, // Format the response
        }]);
      setShowbutton(true);
      ;
      }
    } catch (error) {
      console.error("Error fetching chat result:", error);
    }
  };
  const scheduleAppointment = async () => {
    console.log("inside function");
    try {
     setStateurl('http:/localhost:5000/schedule/')
     setShowbutton(false);
     setInput("I want to consult with a doctor. Can you help me schedule appointment");
    //  setMessages((prevMessages) => [...prevMessages,   {
    //     sender: "user",
    //     text: input,
    //   }]);
      // setMessages((prevMessages) => [...prevMessages,   {
      //   sender: "bot",
      //   text: "Yes! sure ",
      // }]);
      if (textareaRef.current) {
        textareaRef.current.focus();
        titleref.current.innerHTML='';
      }
      // fetchschedule();
      
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const talkToAi = async () => {
    console.log("inside function");
    try {
      setMessages((prevMessages) => [...prevMessages, {
        sender: "user",
        text: "I want your Help. I am not feeling well",
      }]);
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", // Adjust if your backend sends the sender info
          text: "Yes! Please share what problems are you facing?"}]);
        if (textareaRef.current) {
          textareaRef.current.focus();
          titleref.current.innerHTML='';
        }
      
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
  const [flag, setFlag] = useState(false);  // State to track when flag is true

  // useEffect to watch `flag` and trigger the result-fetching function
  useEffect(() => {
    if (flag) {
      fetchChatResult();
    }
  }, [flag]);
  useEffect(() => {
    if (schedule_f) {
      setStateurl('http://localhost:5000/schedule')
      // fetchscheduleResult();
    }
  }, [schedule_f]);
  const handleSendMessage = async () => {
    try {
      const newMessage = {
        sender: "user", // This is the user's message
        text: input,
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
      // Send the user's message to the server
      const response = await fetch(stateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
        credentials: "include",
      });
      setInput("");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data, data.flag);
      
      // If the bot responds with a regular message
      if (data && data.response) {
        const botMessage = {
          sender: "bot",
          text: data.response,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
      // If the data.flag is true (indicating a special case, like fetching more data)
      if (data.flag) {
        setFlag(true);  // This will trigger the useEffect to call fetchChatResult
      }
      if (data.schedule_f){
        setSchedule(true);
      }
      else {
        console.error("Unexpected response format:", data);
      }
  
      // Reset input field after sending the message
     
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
  const titleref=useRef(null)
  return (
    <div className="relative flex flex-col items-center bg-gradient-to-br from-teal-100 to-teal-50 ">
    {/* Header */}
    <div className="w-8/12 rounded-full fixed top-2 h-20 flex items-center border border-teal-900 justify-center bg-white font-bold font-sans text-5xl z-50">
      <div className="text-transparent bg-clip-text bg-gradient-to-br from-teal-700 to-teal-300 ">Medicore</div>
    </div>
  
    {/* Main Content */}
    <div className="flex flex-col w-8/12 mt-32 bg-white  rounded-xl mb-32">
      <div className="flex flex-col h-full p-6">
        <div className="flex flex-col h-2/3 justify-center items-center  p-6 m-4 rounded-lg" ref={titleref}>
        <span className="text-center text-2xl text-emerald-700 font-bold font-sans"><Typewriter text={`Hi!!`}/></span>
          <span className="text-left text-2xl mb-4 text-emerald-700 font-bold font-sans">
            <Typewriter text={`I am Medicore, an AI assistant to help you\nwith your medical issues.`}/>
          </span>
          <div className="grid grid-cols-2 box-border gap-0 p-0 w-fit justify-center place-items-center ">
            <div className=" w-fit"><ButtonM
              icon={<AutoAwesomeIcon className="text-orange-400 "/>}
              text="Consult with me"
              action={talkToAi}
            /></div>
            <div className=" w-fit"><ButtonM
              icon={<DateRangeIcon className="text-cyan-500"/>}
              text="Schedule appointment"
              action={scheduleAppointment}
            /></div>
          </div>
        </div>
  
        {/* Messages */}
        <div className="flex flex-col space-y-4">
        {messages.map((msg, index) => (
  <div
    key={index}
    className="w-full h-fit  flex flex-col p-2"
  >
    
      <div
        className={`text-xl rounded-b-3xl font-bold font-sans max-w-md p-4 shadow  ${
          msg.sender !== "bot"
            ? "place-self-end  rounded-tl-3xl bg-teal-700 text-white"
            : "place-self-start rounded-tr-3xl bg-teal-200 text-teal-700"
        }`}
      ><Suspense
      fallback={
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="teal"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      }
    >
        {msg.sender === "bot" ? (
          <LazyTypewriter text={msg.text} />
        ) : (
          msg.text
        )}</Suspense>
      </div>
    
  </div>
))}
<div  ref={chatcontainerRef}>{showbutton &&(<div className="w-full h-fit  flex flex-col p-2<"><div><ButtonM
              icon={<DateRangeIcon className="text-cyan-500"/>}
              text="Schedule appointment"
              action={scheduleAppointment}
            /></div></div>)}</div>
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  
    {/* Input Area */}
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
          e.target.style.height = `${e.target.scrollHeight}px`; // Adjust based on content
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents the default behavior of Enter (which would add a new line)
            handleSendMessage(); // Call the send message function
          }
        }}
        className="flex-1 px-4 py-2 border justify-center place-items-center border-gray-300 rounded-full h-full focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none overflow-auto text-2xl"
        placeholder="Message Medicore"
        rows="1" // Initial height
        style={{  resize: "none", // Prevent manual resize
          lineHeight: "28px", // Define row height
          maxHeight: "112px", // Maximum height for 4 rows (28px * 4 = 112px)
          overflowY: "auto", }}
      />
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-teal-500 size-14 text-white hover:bg-teal-400 rounded-full flex items-center justify-center"
      >
        <SendRoundedIcon/>
      </button>
    </div>
  </div>
  
  );
}

export default ChatBot;
