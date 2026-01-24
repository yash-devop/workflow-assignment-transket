import { PageLayout } from "@/components/Layouts/PageLayout";
import { LandingPage } from "@/pages/LandingPage";
import { createBrowserRouter } from "react-router";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        // path: "/",
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);
