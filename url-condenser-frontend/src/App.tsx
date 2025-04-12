import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/NavBar";
import ShortenUrl from "./components/shortenurl/ShortenUrl";
import SignupPage from "./components/signup/SignupPage";
import SigninPage from "./components/signin/SigninPage";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/shorten-url" element={<ShortenUrl />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const HomePage = () => {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth as { isAuthenticated: boolean });

  // Redirect to /dashboard if the user is authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }


  return (
    <div className="container text-center mt-5">
      <h1>Welcome to URL Shortener</h1>
      <p>Please sign up, sign in, or continue as a guest.</p>
      <div className="d-flex justify-content-center gap-3">
        <a href="/signup" className="btn btn-primary">Sign Up</a>
        <a href="/signin" className="btn btn-secondary">Sign In</a>
        <a href="/shorten-url" className="btn btn-success">Continue as Guest</a>
      </div>
    </div>
  );
};

export default App;