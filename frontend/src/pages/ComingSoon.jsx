import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from "../assets/img1.webp"
import img2 from "../assets/img2.webp"
const ComingSoon = () => {
  const navigate = useNavigate();
  
  const register = () => {
    navigate('/auth');
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
        <div className="bg-teal-500 text-lg font-semibold text-white px-6 py-3 rounded-full cursor-pointer hover:bg-teal-400 transition duration-300" onClick={()=>{navigate('/auth/login')}}>
          Login
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center p-16 bg-gradient-to-br from-teal-100 to-teal-50">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-800 leading-snug">
            Need Personalized Medical Information?
            <br /> Chat with
            <br />
            <span className="text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-br from-teal-600 to-teal-300">
              Medicore
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your health, your way—tailored information just for you, explained in a simple and understandable manner.
          </p>
          <div
            className="mt-8 bg-teal-600 text-lg font-semibold text-white px-10 py-4 rounded-full cursor-pointer hover:bg-teal-500 transition duration-300 shadow-lg"
            onClick={register}
          >
            Get Started
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-800">Why Choose Medicore?</h2>
          <p className="mt-2 text-gray-600">We provide a range of personalized medical services to help you stay informed and healthy.</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <div className="max-w-xs text-center p-6 shadow-lg bg-gray-50 rounded-lg transition hover:shadow-xl">
            <img src={img1} alt="Easy" className="mx-auto h-24 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-700">Easy to Understand</h3>
            <p className="mt-2 text-gray-600">We break down medical information in simple language so everyone can stay informed.</p>
          </div>
          <div className="max-w-xs text-center p-6 shadow-lg bg-gray-50 rounded-lg transition hover:shadow-xl">
            <img src={img2} alt="Secure" className="mx-auto h-24 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-700">Secure & Private</h3>
            <p className="mt-2 text-gray-600">Your health is important. We ensure that your data is protected and private at all times.</p>
          </div>
          <div className="max-w-xs text-center p-6 shadow-lg bg-gray-50 rounded-lg transition hover:shadow-xl">
            <img src={img1} alt="Support" className="mx-auto h-24 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-700">Expert Support</h3>
            <p className="mt-2 text-gray-600">Get guidance from medical professionals to better understand your health and treatments.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-800">How It Works</h2>
          <p className="mt-2 text-gray-600">It’s easy to start your journey to personalized medical knowledge.</p>
        </div>
        <div className="flex flex-wrap justify-around space-y-8 md:space-y-0">
          <div className="max-w-sm text-center p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">1. Start a Chat</h3>
            <p className="text-gray-600">Simply click "Get Started" to begin a chat with Medicore and tell us what you need to know.</p>
          </div>
          <div className="max-w-sm text-center p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">2. Receive Tailored Info</h3>
            <p className="text-gray-600">We’ll provide you with personalized information based on your health concerns and questions.</p>
          </div>
          <div className="max-w-sm text-center p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">3. Stay Informed</h3>
            <p className="text-gray-600">Get regular updates and notifications to keep you informed about your health.</p>
          </div>
        </div>
      </section>

      {/* Footer with Newsletter */}
      <footer className="p-8 bg-teal-800 text-white text-center">
        <div className="font-extrabold text-4xl mb-4">Medicore</div>
        <p className="max-w-2xl mx-auto text-lg font-light">
          At Medicore, we believe everyone should understand their body in the simplest terms possible. Stay informed with personalized, clear, and concise medical information.
        </p>
        <div className="mt-8 space-y-4">
          <p className="text-xl font-semibold">Get Weekly Updates</p>
          <p className="text-lg">Subscribe to Our Newsletter</p>
          <form className="flex justify-center items-center space-x-4 mt-4">
            <input
              type="email"
              className="p-3 w-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-white text-teal-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Notify Me
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
