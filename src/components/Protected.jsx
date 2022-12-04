import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const Protected = ({ children }) => {
  const { isLoggedIn, loading } = useFirebaseAuth();
  if (isLoggedIn) return children;
  if (loading) return "loading";
  if (loading === false && isLoggedIn === false)
    return <Navigate to="/signin" />;
};
