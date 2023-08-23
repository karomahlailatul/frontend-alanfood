import { FunctionComponent, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { LoadingPages } from "@/components/sections";
/** Layouts */
import Layouts from "@/layouts";
/* Pages */
import NotFound from "@/pages/404";
const FoodDashboard = lazy(() => import("@/pages/food"));
const FoodCreate = lazy(() => import("@/pages/food/create"));
const FoodEdit = lazy(() => import("@/pages/food/edit"));
const TransactionDashboard = lazy(() => import("@/pages/transaction"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "",
        element: <Navigate to="/food" />,
      },
      {
        path: "/food",
        element: <FoodDashboard />,
      },
      {
        path: "/food/create",
        element: <FoodCreate />,
      },
      {
        path: "/food/:id/edit",
        element: <FoodEdit />,
      },
      {
        path: "/transaction",
        element: <TransactionDashboard />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/404" />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
]);

const RouterApp: FunctionComponent = () => {
  return (
    <Suspense fallback={<LoadingPages isLoading={true} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default RouterApp;
