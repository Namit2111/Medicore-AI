import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
//   const navigate = useNavigate();

  const specialties = [
    'Gynecologist',
    'Gastroenterologist',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'General Physician',
    'Ophthalmologist',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const doctorData = { name: doctorName, specialty, address };
    
    try {
      const response = await fetch('/doctor/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });
      
      if (response.ok) {
        // Handle success, maybe navigate to a confirmation page
        alert('Registration Successful!');
        // navigate('/thank-you'); // Assuming you have a thank-you page
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
            Testimonials
          </div>
          <div className="cursor-pointer text-teal-600 hover:text-teal-400 transition duration-300">
            FAQs
          </div>
        </nav>
        <div className="bg-teal-500 text-lg font-semibold text-white px-6 py-3 rounded-full cursor-pointer hover:bg-teal-400 transition duration-300">
          Login
        </div>
      </header>

      {/* Registration Section */}
      <section className="flex flex-col items-center justify-center p-16 bg-gradient-to-br from-teal-100 to-teal-50">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-800 leading-snug">
            Doctor Registration
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Join Medicore to provide personalized health guidance to our users.
          </p>
        </div>
        <form className="mt-8 w-full max-w-lg bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-teal-800 text-lg font-semibold mb-2" htmlFor="doctorName">
              Full Name
            </label>
            <input
              type="text"
              id="doctorName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your full name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="mb-6">
            <label className="block text-teal-800 text-lg font-semibold mb-2" htmlFor="specialty">
              Specialty
            </label>
            <select
              id="specialty"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            >
              <option value="" disabled>Select your specialty</option>
              {specialties.map((spec, idx) => (
                <option key={idx} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Address Input */}
          <div className="mb-6">
            <label className="block text-teal-800 text-lg font-semibold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your clinic/hospital address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
        </form>
      </section>

      {/* Footer */}
      <footer className="p-8 bg-teal-800 text-white text-center">
        <div className="font-extrabold text-4xl mb-4">Medicore</div>
        <p className="max-w-2xl mx-auto text-lg font-light">
          Join Medicore as a professional and provide personalized, clear, and concise medical information to users worldwide.
        </p>
      </footer>
    </div>
  );
};

export default DoctorRegister;
