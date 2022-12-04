import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Dash } from "../pages/Dash";
import { Neo } from "../pages/Neo";
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
  {
    path: "/neo/:id",
    element: <Neo />,
  },
];

export const routes = [
  {
    path: "/dash",
    element: <Dash />,
  },
  {
    path: "/neo/:id",
    element: <Neo />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export const EntryPoint = () => {
  const user = useFirebaseAuth();
  if (user === null) {
    return <CustomRouter routes={openRoutes} />;
  } else {
    return <CustomRouter routes={protectedRoutes} />;
  }
};
