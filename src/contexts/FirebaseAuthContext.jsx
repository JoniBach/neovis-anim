import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../api/firebase";

const FirebaseAuthContext = createContext();

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (usr) => {
    setLoading(true);
    setUser(usr);
    if (usr) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
    return usr;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user, isLoggedIn, loading }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}

export { FirebaseAuthProvider, useFirebaseAuth };
