import React from 'react'
import Typewriter from './Typewriter'
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ButtonM from './ButtonM'
const ChatIntro = () => {
    const talkToAi=()=>{}
    const scheduleAppointment=()=>{}
    
  return (
    <div className="flex flex-col h-2/3 justify-center items-center  p-6 m-4 rounded-lg" >
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
  )
}

export default ChatIntro