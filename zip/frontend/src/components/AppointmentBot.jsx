import React from 'react';
import { Widget, addResponseMessage, handleNewUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './AppointmentBot.css'; // Custom CSS for appointment bot

const AppointmentBot = ({ switchToChatbot }) => {
  React.useEffect(() => {
    addResponseMessage('Welcome to the appointment scheduler! Type "chat" to switch back to the chatbot.');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    if (newMessage.toLowerCase() === 'chat') {
      switchToChatbot();
    } else {
      addResponseMessage(`You said: ${newMessage}`);
    }
  };

  return (
    <div className="appointment-bot-container">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
};

export default AppointmentBot;
