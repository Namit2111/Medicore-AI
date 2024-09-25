import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginData = { email, password };
    console.log(loginData)
      try {
        const response = await fetch('http://localhost:5000/patient/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
    
        const data = await response.json();

        if (response.ok) {
          if (data.message && data.message.name) {
            const patientName = data.message.name.trim();
            console.log('Extracted name:', patientName);
            alert('Login Successful!');
    
            // Navigate to the chat page with the extracted name
            navigate('/chat', {
              state: { name: patientName },
            });
          } else {
            console.error('Could not extract name from message');
            alert('Login successful, but there was an issue with the data. Please try again.');
          }
        } else {
          console.error('Login failed:', data.error || 'Unknown error');
          alert('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again.');
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
        <div className="bg-teal-500 text-lg font-semibold text-white px-6 py-3 rounded-full cursor-pointer hover:bg-teal-400 transition duration-300" onClick={()=>{navigate('/auth')}}>
          Register
        </div>
      </header>

      {/* Login Section */}
      <section className="flex flex-col items-center justify-center p-16 bg-gradient-to-br from-teal-100 to-teal-50">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-800 leading-snug">
            Patient Login
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Access your Medicore account for personalized healthcare services.
          </p>
        </div>
        <form className="mt-8 w-full max-w-lg bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
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
              Login
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <a href="#" className="text-teal-600 hover:text-teal-800 transition duration-300">
              Forgot your password?
            </a>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="p-8 bg-teal-800 text-white text-center">
        <div className="font-extrabold text-4xl mb-4">Medicore</div>
        <p className="max-w-2xl mx-auto text-lg font-light">
          Medicore provides easy access to quality healthcare services, appointment booking, and medical record management.
        </p>
      </footer>
    </div>
  );
};

export default PatientLogin;