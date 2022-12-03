import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

export const signUp = async ({ email, password }) => {
  //   const document = collection(db, "users");

  try {
    const authRes = await createUserWithEmailAndPassword(auth, email, password);
    console.log(authRes);

    // if (authRes?.user) {
    //   const {
    //     email,
    //     uid,
    //     providerId,
    //     providerData,
    //     photoURL,
    //     metadata: { createdAt, creationTime, lastLoginAt, lastSignInTime },
    //     phoneNumber,
    //     isAnonymous,
    //     emailVerified,
    //   } = authRes.user;

    //   const payload = {
    //     email,
    //     uid,
    //     providerId,
    //     providerData,
    //     photoURL,
    //     metadata: {
    //       createdAt,
    //       creationTime,
    //       lastLoginAt,
    //       lastSignInTime,
    //     },
    //     phoneNumber,
    //     isAnonymous,
    //     emailVerified,
    //   };
    //   const ref = await addDoc(document, payload);
    //   console.log(ref);
    //   return ref;
    // }
  } catch (error) {
    console.log(error);
  }
};
