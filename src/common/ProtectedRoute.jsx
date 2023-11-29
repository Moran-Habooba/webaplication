import React from "react";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, onlyBiz = false, onlyAdmin = false }) => {
//   const { user } = useAuth();

//   if (
//     !user ||
//     (onlyBiz && !user.isBusiness && !user?.isAdmin) ||
//     (onlyAdmin && !user?.isAdmin)
//   ) {
//     return <Navigate to="/sign-in" />;
//   }
//   return children;
// };
const ProtectedRoute = ({ children, onlyBiz = false, onlyAdmin = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/sign-in" />;

  if (onlyBiz && (!user.isBusiness || user.isAdmin))
    return <Navigate to="/sign-in" />;

  if (onlyAdmin && !user.isAdmin) return <Navigate to="/sign-in" />;
  return children;
};

export default ProtectedRoute;
