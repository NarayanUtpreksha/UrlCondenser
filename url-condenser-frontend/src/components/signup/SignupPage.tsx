import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/signup`, user);
        setMessage("Signup successful! You can now sign in.");
        window.location.href = "/signin";
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <div className="mb-3">
        <input
          type="text"
          name="fullName"
          className="form-control"
          placeholder="Full Name"
          value={user.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignup}>
        Sign Up
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default SignupPage;