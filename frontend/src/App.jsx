import React, { useState } from 'react';
import './App.css';
import AssessmentPage from './components/AssessmentPage';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      alert('Please fill in all fields.');
      return; // Stop form submission
    }

    try {
      const response = await fetch('http://localhost:8081/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form data sent successfully!');
        setIsLogin(true); // Switch to login form
        // Optionally, reset the form after successful submission
        setFormData({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          password: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to send form data:', errorData);
        alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      alert('An unexpected error occurred.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please enter email and password');
      return;
    }
    try {
      const response = await fetch('http://localhost:8081/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        console.log('Login successful!');
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      } else {
        console.error('Login failed:', response.status);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred during login.');
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          CoreAlign AI
        </div>
        <div className="navbar-links">
          Svalbard
          <div className="menu-icon">☰</div>
        </div>
      </nav>
      {isLoggedIn ? (
        <AssessmentPage /> // Render AssessmentPage after login
      ) : (
        <div className="info-section">
          <div className='byline'>Your new age solution for all your <br /> professional assessments!
          </div>
          {!isLogin ? ( // SIGN UP FORM
            <form className="signUp" onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              <button type="submit" className="signup-btn">Sign Up</button>
              <button type="button" className="toggle-btn" onClick={toggleForm}>
                Already have an account? Login
              </button>
            </form>
          ) : ( // LOGIN FORM
            <form className="signUp" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              <button type="submit" className="signup-btn">Login</button>
              <button type="button" className="toggle-btn" onClick={toggleForm}>
                Don't have an account? Sign up
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default App;
