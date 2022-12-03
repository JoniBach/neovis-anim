import logo from "./logo.svg";
import "./App.css";
import { useFirebaseAuth } from "./contexts/FirebaseAuthContext";
import { useState } from "react";
import { signUp } from "./api/user/signUp";
import { signOut } from "./api/user/signOut";
import {
  Backup,
  ChildCare,
  ChildFriendly,
  Login,
  Logout,
} from "@styled-icons/material";
import { EntryPoint } from "./components/EntryPoint";

function App() {
  return (
    <div className="App">
      <button onClick={() => signOut()}>
        <Logout size={20} /> log out
      </button>
      <EntryPoint />
    </div>
  );
}

export default App;
