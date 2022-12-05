import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useFormik } from "formik";

export const signUp = async ({ email, password }) => {
  try {
    const authRes = await createUserWithEmailAndPassword(auth, email, password);
    return authRes;
  } catch (error) {
    throw Error(error);
  }
};
