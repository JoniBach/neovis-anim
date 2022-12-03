import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export const CustomRouter = ({ routes, baseRoute }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={baseRoute} />,
      errorElement: <Navigate to={baseRoute} />,
    },
    ...routes,
  ]);

  return <RouterProvider router={router} />;
};
