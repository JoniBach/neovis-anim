import { Backup, Repeat } from "@styled-icons/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/user/signUp";

export const Signup = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Sign Up</h1>
      <label>
        email
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        password
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button onClick={() => signUp({ email, password })}>
        <Backup size={20} /> sign up
      </button>
      <button onClick={() => goto("/signin")}>
        {" "}
        <Repeat size={20} /> or sign in
      </button>
    </div>
  );
};
