import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext);

  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;