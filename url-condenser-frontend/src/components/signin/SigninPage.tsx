import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("sessionToken", response.data.token); // Save session token
      dispatch(login({ fullName: response.data.fullName, email: response.data.email })); // Dispatch login action
      navigate("/dashboard"); // Redirect to shorten URL page
    } catch (error) {
      setMessage("Sign-in failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignin}>
        Sign In
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default SigninPage;