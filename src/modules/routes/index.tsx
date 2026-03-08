import { createBrowserRouter } from "react-router-dom";
import { Login } from "../features/auth/pages/login";
import { PrivateRoutes } from "./PrivateRoutes";
import DashboardLayout from "./layout/dashboardLayout";
import { DashboardRoutes } from "./dashboard.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: DashboardRoutes,
      },
    ],
  },
]);
