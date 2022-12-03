import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Dash } from "../pages/Dash";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { CustomRouter } from "./Router";

export const openRoutes = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export const protectedRoutes = [
  {
    path: "/dash",
    element: <Dash />,
  },
];

export const EntryPoint = () => {
  const user = useFirebaseAuth();

  if (user === null) {
    return <CustomRouter baseRoute="/signup" routes={openRoutes} />;
  } else {
    return <CustomRouter baseRoute="/dash" routes={protectedRoutes} />;
  }
};
