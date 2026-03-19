import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "../pages/Home/HomePage";
import RestaurantPage from "../pages/Restaurant/RestaurantPage";
import CartPage from "../pages/Cart/CartPage";
import OrderPage from "../pages/Order/OrderPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RecommendationPage from "../pages/Recommendations/RecommendationPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((s) => s.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((s) => s.user.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes - Redirects to Home if already logged in */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

      {/* Free open routes - Accessible by anyone (guests & logged in) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants" element={<HomePage />} />
      <Route path="/restaurants/:id" element={<RestaurantPage />} />

      {/* Protected routes - Requires authentication */}
      <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
      <Route path="/orders/:id" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/recommendations" element={<PrivateRoute><RecommendationPage /></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
