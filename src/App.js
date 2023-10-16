// App.js
import React, { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import Dashboard from "./components/common/Dashboard";
import Login from "./pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        // Redirect to the Dashboard when the user is logged in
        console.log("here2");
        // navigate("/");
      } else {
        setLoggedIn(false);
        console.log("here1");
        // Navigate to the Login page if not logged in
        // navigate("/Login");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route
        path="*"
        element={
          loggedIn === null ? (
            // Loading state or some other component if needed
            <p className="text-center items-center justify-center text-4xl">
              ...Loading
            </p>
          ) : loggedIn ? (
            // Render Dashboard if loggedIn is true
            <Dashboard />
          ) : (
            <Login />
          ) // No need to render anything here, navigation happens above
        }
      />
    </Routes>
  );
}

export default App;
