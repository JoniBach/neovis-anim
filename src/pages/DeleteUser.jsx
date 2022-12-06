import { useState } from "react";
import { Bar } from "../components/Bar";
import { Input } from "../components/Input";
import { Splash } from "../components/Splash";
import { removeUser } from "../api/user/deleteUser";

export const DeleteUser = () => {
  const [confirm, setConfirm] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [responseMessage, setresponseMessage] = useState("");

  const handleDelete = ({ message, email, password }) => {
    if (message === "DELETE MY ACCOUNT") {
      removeUser({ email, password })
        .then((e) => setresponseMessage(e))
        .catch((err) => setresponseMessage(err.message));
    }
  };

  return (
    <Splash>
      <h2>
        enter your details and type DELETE MY ACCOUNT to remove all your data
      </h2>
      <Bar>
        <Input
          label="email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
        <Input
          label="password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <Input
          label="message"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
        />
        <button
          onClick={() => handleDelete({ message: confirm, email, password })}
        >
          submit
        </button>
      </Bar>
      {responseMessage}
    </Splash>
  );
};
