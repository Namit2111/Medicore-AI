import React, { useState, useEffect, useRef, Suspense } from 'react';
import {ThreeDots} from 'react-loader-spinner'
import ButtonM from '../components/ButtonM';
function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const somefunc=()=>{
    console.log('somefunc called')
  }
  // useEffect(() => {
  //   // Fetch messages from the server
  //   fetch('http://localhost:5000//api/v1/mai/messages')
  //     .then(response => response.json())
  //     .then(data => setMessages(data))
  //     .catch(error => console.error('Error fetching messages:', error));
  // }, []);

  const handleSendMessage = () => {
    // if (input.trim()) {
    //   // Send message to the server
    //   fetch('http://localhost:5000//api/v1/mai/messages', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ sender: 'user', text: input }),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       setMessages([...messages, data]);
    //       setInput('');
    //     })
    //     .catch(error => console.error('Error sending message:', error));
    // }
  };
  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (<div className='relative w-screen flex flex-col h-screen place-content-center justify-center justify-items-center border border-black place-items-center'>
    
    <div className='h-32 text-center w-full justify-center align-middle border border-black text-pink-800 font-extrabold text-7xl place-content-center place-self-center sticky top-0 flex'><div>Medicore</div></div>
     <div className="flex flex-col h-full w-1/2 border border-gray-300 rounded-full">
      <div className="flex flex-col overflow-y-auto p-4 bg-white h-full">
        <div className='h-2/3 border border-black m-4 justify-center place-content-center'>
        <span className='m-auto'>Hi I am Medicore an AI assistant to help with your medical issues</span>
        <div className='grid grid-cols-2 w-5/6 border border-black m-auto'>
          <ButtonM icon={"icon"} text={"Consult with me"} action={somefunc}/>
          <ButtonM icon={"icon"} text={"Schedule appointment"} action={somefunc}/>
        </div>
        </div>
        {messages.map((msg, index) => (
          <div  key={index} className={`w-full h-fit flex flex-col ${msg.sender!='bot'?'justify-start':'justify-end'}`}>
            <Suspense fallback={<ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#6e1e86"
  radius="5"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />}>
            <div className={`mb-2 p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'} place-content-center w-fit`}>
            {msg.text}
          </div></Suspense></div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center sticky bottom-16">
        <textarea
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? handleSendMessage() : null}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full mr-2"
          placeholder="Type a message..."
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
        >
          Send
        </button>
      </div>
    </div>
  </div>
   
  );
}

export default ChatBot;
