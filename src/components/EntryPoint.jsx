import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Dash } from "../pages/Dash";
import { Landing } from "../pages/Landing";
import { Neo } from "../pages/Neo";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Protected } from "./Protected";
import { CustomRouter } from "./Router";
import { Splash } from "./Splash";
import { Unprotected } from "./Unprotexted";

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
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dash",
    element: (
      <Protected>
        <Dash />
      </Protected>
    ),
  },
  {
    path: "/neo/:id",
    element: (
      <Protected>
        <Neo />
      </Protected>
    ),
  },
  {
    path: "/signin",
    element: (
      <Unprotected>
        <Signin />
      </Unprotected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Unprotected>
        <Signup />
      </Unprotected>
    ),
  },
];

export const EntryPoint = () => {
  return <CustomRouter routes={routes} />;
};
