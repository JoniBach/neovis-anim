import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export const resetPassword = async ({ email }) => {
  try {
    const credential = await sendPasswordResetEmail(auth, email);
    return credential;
  } catch (error) {
    throw Error(error);
  }
};
