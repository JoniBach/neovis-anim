import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const CustomRouter = ({ routes, baseRoute }) => {
  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};
