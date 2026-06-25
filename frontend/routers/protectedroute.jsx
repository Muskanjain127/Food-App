import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("userRole");       
  const partnerRole = localStorage.getItem("partnerRole"); 

  if (role === "user") {
    if (userRole === "user") {
      return children; 
    } else {
      return <Navigate to="/user/login" replace />; 
    }
  }

  if (role === "partner") {
    if (partnerRole === "foodpartner") {
      return children; 
    } else {
      return <Navigate to="/foodpartner/login" replace />; 
    }
  }

  return <Navigate to="/" replace />;
}