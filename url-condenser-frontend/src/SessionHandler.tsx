import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const SessionHandler = ({ children, guestOnly }: { children: React.ReactNode; guestOnly?: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    // Show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  if (isAuthenticated && !guestOnly) {
    // Redirect authenticated users to their dashboard
    const userId = "12345"; // Replace with logic to extract userId from the token if needed
    return <Navigate to={`/${userId}/dashboard`} />;
  }

  if (!isAuthenticated && guestOnly) {
    // Redirect guests to the home page if they try to access authenticated routes
    return <Navigate to="/" />;
  }

  // Render the children if the session state matches the route's requirements
  return <>{children}</>;
};

export default SessionHandler;