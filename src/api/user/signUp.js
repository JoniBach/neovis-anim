import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signUp = async ({ email, password }) => {
  try {
    const authRes = await createUserWithEmailAndPassword(auth, email, password);
    return authRes;
  } catch (error) {
    throw Error(error);
  }
};
