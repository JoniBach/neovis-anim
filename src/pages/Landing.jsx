import { useNavigate } from "react-router-dom";
import { Splash } from "../components/Splash";

export const Landing = () => {
  const goto = useNavigate();
  return (
    <Splash>
      <h1>Welcome to NEO</h1>
      <button onClick={() => goto("/signin")}>Sign In</button>
      <button onClick={() => goto("/signup")}>Sign Up</button>
    </Splash>
  );
};
