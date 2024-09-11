import React from 'react';
import './ComingSoon.css';
import { Appbar } from '../components/Appbar';
import { useNavigate } from 'react-router-dom';
const ComingSoon = () => {
  const navigate=useNavigate()
  const register=()=>{
    navigate('/chat')
  }
  return (
    <div className='w-screen h-screen'>
     <div className='h-20  m-3 w-full border-b-2 border-dashed border-teal-400 flex place-content-between align-middle'><div className='font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-br from-teal-700 to-teal-300 place-self-center'>Medicore</div><div className='rounded-full border-teal-900 border w-1/4 h-14 flex invisible place-self-center place-items-center justify-evenly '><div className="justify-center place-items-center">Testimonials</div><div>FAQs</div></div><div  className='bg-teal-300 flex align-middle font-bold text-lg place-items-center justify-center w-32 rounded-full h-14 hover:cursor-pointer hover:bg-teal-500 hover:text-white place-self-center' >Login</div></div>
     <div className='h-screen w-screen flex justify-center place-items-center'>
     <div className='h-4/5 flex w-screen place-content-center justify-center'> <div className="w-full justify-evenly place-content-between flex flex-col m-2 ">
     {/* <div className='font-extrabold text-9xl text-transparent bg-clip-text bg-gradient-to-br from-teal-700 to-teal-600 place-self-center'>MAI</div> */}
     <div className='text-7xl font-bold text-wrap text-teal-800'>Want <br/> Personalized Medical Information<br/> Just have a Chat with <br/><span className="text-transparent text-9xl bg-clip-text bg-gradient-to-br from-teal-700 to-teal-400">Medicore</span></div>
     <div className='bg-teal-600 flex align-middle font-bold text-lg place-items-center justify-center w-52 rounded-full h-20 hover:cursor-pointer hover:bg-teal-500 place-self-center' onClick={register}>Get Started</div></div></div>
     </div>
    <div className="flex items-center min-w-[100vw] justify-between min-h-[60vh] font-sans text-center p-2 bg-gradient-to-br from-teal-700 to-teal-400">
     <div><div className='font-extrabold text-5xl text-white'>Medicore</div>
     <div>We at Medicore believe in that every person should know what&apos;s going on with their body in a simplest language possible</div>
     </div>
    <div className="content">
      {/* <h1>Coming Soon</h1>
      <p>We&apos;re working hard to give you a better experience!</p> */}
      <div className="countdown">
        <div className="time-section">
          <span className="time">Get Weekly Updates</span>
          <span className="label">Subscribe to Our Newsletter</span>
        </div>
      </div>
      <form className="email-form">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Notify Me</button>
      </form>
    </div>
  </div>
</div>
      );
};

export default ComingSoon;
