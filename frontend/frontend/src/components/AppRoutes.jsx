import { Navigate, Route, Routes } from "react-router-dom";
import AddTransaction from "../pages/AddTransaction";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
 import About from "../pages/About";
import Contact from "../pages/Contact";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Application routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-transaction" element={<AddTransaction />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/edit/:id" element={<AddTransaction />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile" element={<Profile />} />


      <Route path="/about" element={<About />} />

<Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default AppRoutes;
