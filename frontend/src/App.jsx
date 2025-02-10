import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Onboarding from "./pages/Onboarding";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Home from "./pages/Home";
import Logout from "./pages/Logout";

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
      <div id="photo-picker-element"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/logout" element={<Logout />} />
      </Routes>

    </div>
  );
}

export default App;
