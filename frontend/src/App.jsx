import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Onboarding from "./pages/Onboarding";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="684826987684-dv7j8vjf1gu93047vnik5d4jn2mdh0d5.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    );
  };

  const PrivateRoute = ({ children }) => {
    if (isAuthenticated) {
      return children;
    } else {
      return <Login />;
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>

      <div id="photo-picker-element"></div>
    </div>
  );
}

export default App;
