import React from 'react'

const ButtonM = ({icon,text,action}) => {
  return (
    <div className='border-black border flex m-2 h-12 rounded-xl justify-center place-content-center w-fit p-2 bg-fuchsia-100' onClick={action}>
        <div className='place-content-center mr-2 w-1/3 border h-full border-black flex'><span>{icon}</span></div>
        <div className='place-content-center justify-center w-fit text-nowrap text-center'>{text}</div>
    </div>
  )
}

export default ButtonM