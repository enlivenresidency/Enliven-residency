import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import EnlivenPatia from "./pages/EnlivenPatia";
import EnlivenNiladri from "./pages/EnlivenNiladri";
import AghranRestaurant from "./pages/AghranRestaurant";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AboutUs from "./pages/AboutUs";
import RefundPolicy from "./pages/RefundPolicy";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage once on mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (role && username && token) {
      setUser({ token, role, username });
    }
  }, []);

  const isLoggedIn = Boolean(user?.token && user?.role && user?.username);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/enliven-patia" element={<EnlivenPatia />} />
        <Route path="/enliven-patia/payment" element={<PaymentPage />} />
        <Route path="/enliven-niladri" element={<EnlivenNiladri />} />
        <Route path="/enliven-niladri/payment" element={<PaymentPage />} />
        <Route path="/aghran-restaurant" element={<AghranRestaurant />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardPage user={user} setUser={setUser} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />

        {/* Catch all unknown routes */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
