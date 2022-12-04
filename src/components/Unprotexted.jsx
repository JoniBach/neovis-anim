import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const Unprotected = ({ children }) => {
  const { isLoggedIn } = useFirebaseAuth();

  if (!isLoggedIn) return children;
  if (isLoggedIn) return <Navigate to="/dash" />;
};
