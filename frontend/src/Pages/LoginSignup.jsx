import React, { useState } from 'react';
import './css/LoginSignup.css';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" }); // 'type' can be 'error' or 'success'

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setMessage({ text: "", type: "" }); // Reset message when switching modes
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!formData.email || !formData.password) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }
    
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      setMessage({ text: "Login successful!", type: "success" });
      setTimeout(() => window.location.replace("/"), 2000);
    } else {
      setMessage({ text: responseData.errors, type: "error" });
    }
  };

  const signup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }

    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      setMessage({ text: "Signup successful! Log in now.", type: "success" });
    } else {
      setMessage({ text: responseData.errors, type: "error" });
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
        <div className="loginsignup-fields">
          {isSignup && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Your Name'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Your Email ID'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>

        {/* Success/Error Message Box */}
        {message.text && (
          <div className={`message-box ${message.type}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="message-icon"
            >
              {message.type === "success" ? (
                <path d="M9 16.17L4.83 12a1 1 0 0 0-1.41 1.41l5 5a1 1 0 0 0 1.41 0l10-10a1 1 0 0 0-1.41-1.41L10 14.83l-2.59-2.59a1 1 0 0 0-1.41 1.41l4 4a1 1 0 0 0 1.41 0z" />
              ) : (
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-5h2v2h-2zm0-10h2v6h-2z" />
              )}
            </svg>
            <span>{message.text}</span>
          </div>
        )}

        <button onClick={isSignup ? signup : login}>
          {isSignup ? "Continue" : "Log In"}
        </button>
        <p className="loginsignup-login">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={toggleMode} style={{ cursor: 'pointer' }}>
            {isSignup ? "Log in here" : "Sign up here"}
          </span>
        </p>
        {isSignup && (
          <div className="loginsignup-agree">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
