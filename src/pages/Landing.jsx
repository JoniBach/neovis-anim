import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../api/user/deleteUser";
import { signOut } from "../api/user/signOut";
import { Bar } from "../components/Bar";
import { Input } from "../components/Input";
import { Splash } from "../components/Splash";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const Landing = () => {
  const goto = useNavigate();
  const { isLoggedIn } = useFirebaseAuth();
  const [isDelete, setIsDelete] = useState(false);
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
      {isDelete ? (
        <div>
          <h2>
            enter your details and type DELETE MY ACCOUNT to remove all your
            data
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
              onClick={() =>
                handleDelete({ message: confirm, email, password })
              }
            >
              submit
            </button>
          </Bar>
          {responseMessage}
        </div>
      ) : (
        <>
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
              <button onClick={() => setIsDelete(true)}>Delete User</button>
            </>
          ) : (
            <>
              <button onClick={() => goto("/signin")}>Sign In</button>
              <button onClick={() => goto("/signup")}>Sign Up</button>
            </>
          )}
        </>
      )}
    </Splash>
  );
};
