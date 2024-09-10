import React from 'react'

const ButtonM = ({icon,text,action}) => {
  return (
    <div className='border-fuchsia-800 border-2 text-xl flex h-12 rounded-xl justify-center place-content-center w-fit p-2 bg-fuchsia-100  hover:bg-fuchsia-300  hover:cursor-pointer' onClick={action}>
        <div className='place-content-center justify-center align-middle mr-2 w-1/3 h-fit flex'><span>{icon}</span></div>
        <div className='place-content-center justify-center w-fit text-nowrap text-center'>{text}</div>
    </div>
  )
}

export default ButtonM