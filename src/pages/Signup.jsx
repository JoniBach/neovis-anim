import { Backup, Repeat } from "@styled-icons/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/user/signUp";
import { Input } from "../components/Input";
import { Splash } from "../components/Splash";

export const Signup = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Splash>
      <h1>Sign Up</h1>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="email"
      />
      <Input
        type="passwprd"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label="password"
      />
      <button onClick={() => signUp({ email, password })}>
        <Backup size={20} /> sign up
      </button>
      <button onClick={() => goto("/signin")}>
        {" "}
        <Repeat size={20} /> or sign in
      </button>
    </Splash>
  );
};
