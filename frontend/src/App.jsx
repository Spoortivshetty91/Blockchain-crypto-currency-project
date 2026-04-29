import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ReceiveCrypto from "./pages/ReceiveCrypto";
import Transactions from "./pages/Transactions";
import Receipt from "./pages/Receipt";

// 🔐 Protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Pages WITHOUT navbar */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/receive" element={<><Navbar /><ReceiveCrypto /></>} />
      <Route path="/transactions" element={<><Navbar /><Transactions /></>} />
      <Route path="/receipt" element={<><Navbar /><Receipt /></>} />

      {/* Protected Pages WITH navbar */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/receive"
        element={
          <PrivateRoute>
            <Navbar />
            <ReceiveCrypto />
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Navbar />
            <Transactions />
          </PrivateRoute>
        }
      />

      <Route
        path="/receipt"
        element={
          <PrivateRoute>
            <Navbar />
            <Receipt />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;