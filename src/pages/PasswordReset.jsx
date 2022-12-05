import { ArrowBack, Send } from "@styled-icons/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/user/resetPassword";
import { Bar } from "../components/Bar";
import { Input } from "../components/Input";
import { Splash } from "../components/Splash";

export const PasswordReset = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSuccess = () => {
    alert(
      `we have sent a password reset link to ${email}... please allow for up to an hour and remember to check your spam folder`
    );
    goto("/");
  };
  return (
    <Splash>
      <h1>Reset password</h1>
      <Bar>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="email"
        />
        <button
          onClick={() =>
            resetPassword({ email })
              .then((e) => handleSuccess())
              .catch((e) => setError(e.message))
          }
        >
          <Send size={20} /> send reset link
        </button>
        <button onClick={() => goto(-1)}>
          {" "}
          <ArrowBack size={20} /> or return
        </button>
      </Bar>
      {error}
    </Splash>
  );
};
