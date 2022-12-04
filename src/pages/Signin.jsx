import { Login, Repeat } from "@styled-icons/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/user/signIn";
import { Bar } from "../components/Bar";
import { Input } from "../components/Input";
import { Splash } from "../components/Splash";

export const Signin = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Splash>
      <h1>Sign In</h1>
      <Bar>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="email"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          label="password"
        />
        <button onClick={() => signIn({ email, password })}>
          <Login size={20} /> sign in
        </button>
        <button onClick={() => goto("/signup")}>
          {" "}
          <Repeat size={20} /> or sign up
        </button>
      </Bar>
    </Splash>
  );
};
