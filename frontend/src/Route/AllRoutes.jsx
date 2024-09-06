import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner'
const Home = lazy(() => import('../ComingSoon'));
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
          <Route path='/chat' element={<Appointments />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;