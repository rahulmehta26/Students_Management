/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Loader from "./components/Loader";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Students />} />
          <Route path="students" element={<Students />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
