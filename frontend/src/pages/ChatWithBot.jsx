import React, { useState, useEffect, useRef } from 'react';
import Typewriter from '../components/Typewriter';
const ChatWithBot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);
  const [waitingForAppointment, setWaitingForAppointment] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for both messages and results
  const [resultLoading, setResultLoading] = useState(false);
  const messagesEndRef = useRef(null); // Ref to handle auto scroll

  const doctors = [
    {
      name: "Namit Jain",
      specialty: "Gastroenterologist",
      address: "2D 122, Sector 3, Meerut"
    },
    {
      name: "Nimritpreetsingh",
      specialty: "Cardiologist",
      address: "Jalandhar, Punjab"
    }
  ];

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Auto-scrolls when new messages are added

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Display user's message
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    // Handle scheduling appointment if waiting for a response
    if (waitingForAppointment) {
      if (input.toLowerCase().includes("yes")) {
        showDoctorsList();
      } else if (!isNaN(input.trim()) && doctors[parseInt(input.trim()) - 1]) {
        const selectedDoctor = doctors[parseInt(input.trim()) - 1];
        setMessages(prev => [...prev, {
          text: `Appointment scheduled with Dr. ${selectedDoctor.name}, ${selectedDoctor.specialty}, at ${selectedDoctor.address}`,
          sender: "bot"
        }]);
        setWaitingForAppointment(false);
      } else {
        setMessages(prev => [...prev, { text: "Please select a valid option.", sender: "bot" }]);
      }
      setInput("");
      return;
    }

    // Clear the input field
    setInput("");

    // Set loading to true while fetching
    setLoading(true);

    // Send the message to the backend using fetch
    try {
      const response = await fetch('/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
        credentials: 'include', // Important to send cookies with request
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const { response: responseText, flag: gotAllInfo } = await response.json();

      // Add bot's response to the chat
      setMessages(prev => [...prev, { text: responseText, sender: "bot" }]);

      // Update the flag
      if (gotAllInfo) {
        setFlag(true);
        getResult();
      }
    } catch (error) {
      console.error('Error while sending message:', error);
    } finally {
      // Hide loading spinner (for sending message)
      setLoading(false);
    }
  };

  const getResult = async () => {
    setResultLoading(true);
    try {
      const resultResponse = await fetch('/chat/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!resultResponse.ok) {
        throw new Error('Failed to fetch result');
      }

      const resultData = await resultResponse.json();

      // Update messages state in a single call
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        
        if (resultData && resultData.response) {
          const resultText = `Possible Disease: ${resultData.response.disease || 'Unknown'}
            
            Cure: ${resultData.response.cure || 'No cure provided'}

            would you like to schedule an appointment with a doctor?
          `;
          
          newMessages.push({ text: resultText, sender: "bot" });
          // newMessages.push({ text: "Would you like to schedule an appointment with a doctor?", sender: "bot" });
        } else {
          newMessages.push({ text: JSON.stringify(resultData), sender: "bot" });
        }
        
        return newMessages;
      });

      // Set waiting for appointment after updating messages
      setWaitingForAppointment(true);
    } catch (error) {
      console.error('Error while fetching result:', error);
      // Optionally add an error message to the chat
      setMessages(prev => [...prev, { text: "An error occurred while fetching the result.", sender: "bot" }]);
    } finally {
      setResultLoading(false);
    }
  };

  const showDoctorsList = () => {
    const doctorOptions = doctors
      .map((doc, index) => `${index + 1}. Dr. ${doc.name}, ${doc.specialty}, at ${doc.address}`)
      .join("\n");
    setMessages(prev => [...prev, { text: `Available doctors:\n${doctorOptions}\nPlease type the number of the doctor you want to schedule with.`, sender: "bot" }]);
  };

  return (
    <div className="w-screen h-screen bg-teal-100 flex flex-col justify-between items-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4">
        <div className="font-bold text-3xl text-teal-700 text-center">Medicore Chat</div>
        
        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-scroll flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-xs ${msg.sender === 'bot' ? 'bg-teal-200 text-teal-900 self-start' : 'bg-teal-600 text-white self-end'}`}
            >
             {msg.sender === "bot" ? (
          <Typewriter text={msg.text}/>
        ) : (
          msg.text
        )}
            </div>
          ))}
          {/* Loading spinner */}
          {(loading || resultLoading) && (
            <div className="self-start p-4 rounded-lg bg-teal-200 text-teal-900">
              <div className="animate-spin h-5 w-5 border-4 border-teal-600 border-t-transparent rounded-full"></div>
            </div>
          )}
          {/* Element to auto-scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="flex-grow p-3 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Message Medicore"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="p-3 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithBot;
