import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";
export const removeUser = async ({ email, password }) => {
  console.log(auth);
  const user = auth.currentUser;
  try {
    const credential = await EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    deleteUser(user);
    return "successfully deleted account";
  } catch (error) {
    throw Error(error);
  }
};
