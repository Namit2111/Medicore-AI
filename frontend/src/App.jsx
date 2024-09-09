import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css';
import AllRoutes from "./Route/AllRoutes";

const App = () => {
  const [isAppointmentBot, setIsAppointmentBot] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    const newMessages = [...messages, { from: 'user', text: message }];
    setMessages(newMessages);

    if (isAppointmentBot) {
      handleAppointmentBotResponse(message, newMessages);
    } else {
      handleChatbotResponse(message, newMessages);
    }
  };

  const handleChatbotResponse = (message, newMessages) => {
    if (message.toLowerCase() === 'appointment') {
      setIsAppointmentBot(true);
      newMessages.push({ from: 'bot', text: 'Switched to appointment scheduling bot.' });
      setMessages(newMessages);
    } else {
      newMessages.push({ from: 'bot', text: `You said: ${message}` });
      setMessages(newMessages);
    }
  };

  const handleAppointmentBotResponse = (message, newMessages) => {
    if (message.toLowerCase() === 'chat') {
      setIsAppointmentBot(false);
      newMessages.push({ from: 'bot', text: 'Switched to general chatbot.' });
      setMessages(newMessages);
    } else {
      newMessages.push({ from: 'bot', text: `Appointment scheduling: ${message}` });
      setMessages(newMessages);
    }
  };

  const switchBot = () => {
    setIsAppointmentBot(!isAppointmentBot);
  };

  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
};

export default App;
