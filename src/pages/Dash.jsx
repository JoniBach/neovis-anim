import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const Dash = () => {
  const user = useFirebaseAuth();

  return <div>Signed in as {user.email}</div>;
};
