import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../api/firebase";

const FirebaseAuthContext = createContext();

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
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
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };
