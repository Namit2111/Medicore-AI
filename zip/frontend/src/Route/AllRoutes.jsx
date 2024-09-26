import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner'
import DoctorRegister from '../pages/DoctorRegister';
import ChatWithBot from '../pages/ChatWithBot';
import Signup from '../pages/PatientRegistration';
import PatientLogin from '../pages/PatientLogin';
const Home = lazy(() => import('../pages/ComingSoon'));
const Appointments = lazy(() => import('../pages/Chatbot'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className='h-screen w-screen flex place-content-center justify-center'><RotatingLines
  visible={true}
  height="96"
  width="96"
  color="purple"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  // wrapperStyle={{align:center}}
  wrapperClass=""
  /></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<ChatWithBot/>} />
          <Route path='/auth' element={<Signup/>}/>
          <Route path='/auth/login' element={<PatientLogin/>}/>
          <Route path = '/register-doctor' element={<DoctorRegister/>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
