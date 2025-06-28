import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./token";
import { toaster } from "@/components/ui/toaster";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    toaster.create({
      title: "Sesi Anda telah berakhir atau belum dimulai. Silakan login terlebih dahulu",
      type: "warning",
    });
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
