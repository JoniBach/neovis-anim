import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signIn = async ({ email, password }) => {
  try {
    const credential = signInWithEmailAndPassword(auth, email, password);
    return credential;
  } catch (error) {
    throw Error(error);
  }
};
