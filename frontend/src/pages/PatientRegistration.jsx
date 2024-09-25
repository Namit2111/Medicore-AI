import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';


const PatientRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const patientData = { name, email, password };
    
    try {
      const response = await fetch('/patient/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
      
      if (response.ok) {
        alert('Registration Successful!');
        // navigate('/thank-you'); // Uncomment if you have a thank-you page
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div className="w-screen h-full bg-gray-50">
      {/* Header */}
      <header className="h-20 p-4 flex items-center justify-between bg-white shadow-lg">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-700 to-teal-300">
          Medicore
        </div>
        <nav className="hidden md:flex space-x-8">
          <div className="cursor-pointer text-teal-600 hover:text-teal-400 transition duration-300">
            Services
          </div>
          <div className="cursor-pointer text-teal-600 hover:text-teal-400 transition duration-300">
            FAQs
          </div>
        </nav>
        <div className="bg-teal-500 text-lg font-semibold text-white px-6 py-3 rounded-full cursor-pointer hover:bg-teal-400 transition duration-300" onClick={()=>{navigate('login')}}>
          Login
        </div>
      </header>

      {/* Registration Section */}
      <section className="flex flex-col items-center justify-center p-16 bg-gradient-to-br from-teal-100 to-teal-50">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-800 leading-snug">
            Patient Registration
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Join Medicore for personalized healthcare services and easy access to medical professionals.
          </p>
        </div>
        <form className="mt-8 w-full max-w-lg bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-teal-800 text-lg font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-teal-800 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-teal-800 text-lg font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-teal-600 text-lg font-semibold text-white px-10 py-4 rounded-full cursor-pointer hover:bg-teal-500 transition duration-300 shadow-lg"
            >
              Register
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link 
              to="/register-doctor" 
              className="text-teal-600 hover:text-teal-800 transition duration-300"
            >
              Register as a doctor
            </Link>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="p-8 bg-teal-800 text-white text-center">
        <div className="font-extrabold text-4xl mb-4">Medicore</div>
        <p className="max-w-2xl mx-auto text-lg font-light">
          Join Medicore to access quality healthcare services, book appointments, and manage your medical records easily.
        </p>
      </footer>
    </div>
  );
};

export default PatientRegistration;