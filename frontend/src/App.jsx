import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FindDonors from "./pages/FindDonors";
import RequestBlood from "./pages/RequestBlood";
import BloodRequests from "./pages/BloodRequests";

function Protected({ children }) {
  return localStorage.getItem("donorgo_token")
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/find-donors" element={<Protected><FindDonors /></Protected>} />
      <Route path="/request-blood" element={<Protected><RequestBlood /></Protected>} />
      <Route path="/requests" element={<Protected><BloodRequests /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
