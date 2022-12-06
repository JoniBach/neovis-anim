import { Dash } from "../pages/Dash";
import { Landing } from "../pages/Landing";
import { LandingAnimated } from "../pages/LandingAnimated";
import { Neo } from "../pages/Neo";
import { PasswordReset } from "../pages/PasswordReset";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Protected } from "./Protected";
import { CustomRouter } from "./Router";
import { Unprotected } from "./Unprotexted";

export const routes = [
  {
    path: "/",
    element: <LandingAnimated />,
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
  {
    path: "/reset-password",
    element: (
      <Unprotected>
        <PasswordReset />
      </Unprotected>
    ),
  },
];

export const EntryPoint = () => {
  return <CustomRouter routes={routes} />;
};
