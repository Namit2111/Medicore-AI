import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const AllRoutes = () => {
    const Home=import('../ComingSoon')
    const Appointments=import('../pages/Appointments')
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/schedule' element={<Appointments/>}/>
        </Routes>
    </Router>
  )
}

export default AllRoutes