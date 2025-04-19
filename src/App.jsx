import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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

      <div className="info-section">
        <div className='byline'>Your one stop solution for all your <br /> professional assessments!
        </div>
        {/* Sign-up form */}
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
  <div className="phone-row">
    <span className="country-code">+91</span>
    <input
      type="tel"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
    />
  </div>
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
  />
  <button type="submit" className="signup-btn">Sign Up</button>
</form>
      </div>
    </>
  );
}

export default App;
