import { PageLayout } from "@/components/Layouts/PageLayout";
import { WorkflowSpacePage } from "@/pages/workflow";
import { createBrowserRouter } from "react-router";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        // path: "/",
        index: true,
        element: <WorkflowSpacePage />,
      },
    ],
  },
]);
