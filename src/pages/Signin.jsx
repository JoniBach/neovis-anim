import { Login, Repeat } from "@styled-icons/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/user/signIn";

export const Signin = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Sign In</h1>
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
      <button onClick={() => signIn({ email, password })}>
        <Login size={20} /> sign in
      </button>
      <button onClick={() => goto("/signup")}>
        {" "}
        <Repeat size={20} /> or sign up
      </button>
    </div>
  );
};
