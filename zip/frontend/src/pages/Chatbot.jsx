import React, { useState, useEffect, useRef, Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import ButtonM from "../components/ButtonM";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Typewriter from "../components/Typewriter";

function ChatBot() {
  const[appointment,setAppointment]=useState(false) 
  const [finishedtyping, setFinishedTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const textareaRef = useRef(null);
  const[schedule_f,setSchedule]=useState(false)
  const[stateUrl,setStateurl]=useState('http://localhost:5000/chat/')
  const [input, setInput] = useState("");
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
      let newMsg;
  
      if (datanew.response === "No conversation found") {
        newMsg = {
          sender: "bot",
          text: datanew.response,
        };
      } else {
        newMsg = {
          sender: "bot",
          text: `Possible reasons of your Health:\n ${datanew.response.disease}\n\nRemedies:\n${datanew.response.cure}`,
        };
      }
  
      setMessages((prevMessages) => [...prevMessages, newMsg]);
  
      // After showing the result, ask if they want to schedule an appointment
     setAppointment(true);
      const appointmentPrompt = {
        sender: "bot",
        text: "Would you like to schedule an appointment?",
      };
      if(appointment && finishedtyping){
        setMessages((prevMessages) => [...prevMessages, appointmentPrompt]);
      }
      
    } catch (error) {
      console.error("Error fetching chat result:", error);
    }
  };
  
  const scheduleAppointment = async () => {
    console.log("inside function");
    try {
      const newMessage = {
        sender: "user", // Adjust if your backend sends the sender info
        text: "I want to consult with a doctor. Can you help me schedule appointment",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      const response = await fetch(stateurl, {
        method: "POST", // Specify the request method if you're sending data
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ message: input }), // Replace 'userMessage' with the actual message you want to send
        credentials: "include",
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
      const Messageuser = {
        sender: "user", // Adjust if your backend sends the sender info
        text: "I want your Help. I am not feeling well",
      };
      setMessages((prevMessages) => [...prevMessages, Messageuser]);
      const Messagebot={ sender: "bot", // Adjust if your backend sends the sender info
        text: "Yes! Please share what problems are you facing?"};
        setMessages((prevMessages) => [...prevMessages, Messagebot]);
        if (textareaRef.current) {
          textareaRef.current.focus();
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
      setStateurl('http://localhost:5000/chat/schedule')
      // fetchscheduleResult();
    }
  }, [schedule_f]);
  const handleSendMessage = async () => {
    // Add user message to the chat
    const newMessage = {
      sender: "user",
      text: input,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    // Check if user response is 'yes' for scheduling appointment
    if (input.toLowerCase().includes("yes")) {
      showDoctorOptions(); // This will show doctor options
    } 
    // Check if the user input is a number to select a doctor
    else if (parseInt(input) > 0 && parseInt(input) <= doctors.length) {
      const selectedDoctor = doctors[parseInt(input) - 1]; // Select doctor
      const confirmationMessage = {
        sender: "bot",
        text: `Appointment scheduled with Dr. ${selectedDoctor.name}.`,
      };
      setMessages((prevMessages) => [...prevMessages, confirmationMessage]);
    } 
    else {
      // If not "yes" or a valid number, proceed with regular message handling
      try {
        const response = await fetch(stateUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Handle bot response and special cases (flag or scheduling)
        if (data && data.response) {
          const botMessage = {
            sender: "bot",
            text: data.response,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
  
        if (data.flag) {
          setFlag(true);  // Trigger additional actions like fetching a result
        }
  
        if (data.schedule_f) {
          setSchedule(true);  // Trigger the appointment scheduling flow
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  
    // Reset input after sending message
    setInput("");
  };
  
  

  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const doctors = [
    { name: "Namit Jain", specialty: "Gastroenterologist", address: "2D 122, sector 3, meerut" },
    { name: "Nimritpreetsingh", specialty: "Cardiologist", address: "Jalandhar, Punjab" },
    // More doctors can be added here...
  ];

  const showDoctorOptions = () => {
    const introMessage = {
      sender: "bot",
      text: "Here is the list of available doctors. Please choose a number:",
    };
    const doctorMessages = doctors.map((doc, index) => ({
      sender: "bot",
      text: `${index + 1}. Dr. ${doc.name} - ${doc.specialty}, ${doc.address}`,
    }));
  
    setMessages((prevMessages) => [...prevMessages, introMessage,...doctorMessages]); // Add doctor list to the chat
  };

  const handleComplete = () => {
    console.log('Typing completed');
};
  return (
    <div className="relative flex flex-col items-center bg-teal-200">
    {/* Header */}
    <div className="w-8/12 rounded-full fixed top-2 h-20 flex items-center justify-center border-4 border-teal-800 bg-teal-700 bg-opacity-40 backdrop-blur-md text-white font-extrabold font-serif text-7xl z-50">
      <div>Medicore</div>
    </div>
  
    {/* Main Content */}
    <div className="flex flex-col w-8/12 mt-32 bg-white  rounded-xl mb-32">
      <div className="flex flex-col h-full p-6">
        <div className="flex flex-col h-2/3 justify-center items-center  p-6 m-4 rounded-lg">
          <span className="text-left text-3xl mb-4 text-emerald-700 font-bold font-sans">
            <Typewriter text={`Hi!!\nI am Medicore, an AI assistant to help you\nwith your medical issues.`}/>
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
    <Suspense
      fallback={
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      }
    >
      <div
        className={`text-xl rounded-b-3xl font-bold font-sans max-w-md p-4 shadow  ${
          msg.sender !== "bot"
            ? "place-self-end  rounded-tl-3xl bg-teal-700 text-white"
            : "place-self-start rounded-tr-3xl bg-teal-200 text-teal-700"
        }`}
      >
        {msg.sender === "bot" ? (
          <Typewriter text={msg.text} onComplete={handleComplete}/>
        ) : (
          msg.text
        )}
      </div>
    </Suspense>
  </div>
))}

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
