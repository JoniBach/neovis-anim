import { useNavigate } from "react-router-dom";
import { signOut } from "../api/user/signOut";
import { Bar } from "../components/Bar";
import { Splash } from "../components/Splash";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const Landing = () => {
  const goto = useNavigate();
  const { isLoggedIn } = useFirebaseAuth();
  return (
    <Splash>
      <h1>Welcome to NEOvis</h1>
      <h2>Find Near Earth Objects within a given timeframe</h2>
      <h5>
        {isLoggedIn ? "Welcome back" : "Sign In or Sign Up to get started"}
      </h5>
      <span></span>
      <Bar></Bar>
      {isLoggedIn ? (
        <>
          <button onClick={() => goto("/dash")}>Go to dashboard</button>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <button onClick={() => goto("/signin")}>Sign In</button>
          <button onClick={() => goto("/signup")}>Sign Up</button>
        </>
      )}
    </Splash>
  );
};
