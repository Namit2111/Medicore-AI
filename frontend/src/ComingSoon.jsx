import React from 'react';
import './ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="content">
        <h1>Coming Soon</h1>
        <p>We're working hard to give you a better experience!</p>
        {/* <div className="countdown">
          <div className="time-section">
            <span className="time">12</span>
            <span className="label">Days</span>
          </div>
          <div className="time-section">
            <span className="time">14</span>
            <span className="label">Hours</span>
          </div>
          <div className="time-section">
            <span className="time">58</span>
            <span className="label">Minutes</span>
          </div>
          <div className="time-section">
            <span className="time">23</span>
            <span className="label">Seconds</span>
          </div>
        </div> */}
        {/* <form className="email-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Notify Me</button>
        </form> */}
      </div>
    </div>
  );
};

export default ComingSoon;
