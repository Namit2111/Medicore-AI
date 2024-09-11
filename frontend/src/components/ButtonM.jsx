import React from 'react'

const ButtonM = ({icon,text,action}) => {
  return (
    <div className='border-teal-800 border-2 font-sans font-bold text-xl flex h-12 rounded-xl justify-center place-content-center w-fit p-2 text-teal-800 bg-teal-100  hover:bg-teal-800  hover:cursor-pointer hover:text-white ' onClick={action}>
      <div className="hover:animate-bounce flex w-full h-full"> <div className='place-content-center justify-center align-middle mr-2 w-1/3 h-fit flex'><span className='hover:text-white'>{icon}</span></div>
      <div className='place-content-center justify-center w-fit text-nowrap text-center hover:text-white'>{text}</div></div>
       
    </div>
  )
}

export default ButtonM