import { getAuth, signOut as signOutOfFirebase } from "firebase/auth";
import { auth } from "../firebase";

export const signOut = async () => {
  try {
    const credential = signOutOfFirebase(auth);
    return credential;
  } catch (error) {
    console.log(error);
  }
};
