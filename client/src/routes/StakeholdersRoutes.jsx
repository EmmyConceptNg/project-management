import { Navigate, useRoutes } from "react-router-dom";

import { FullLayout } from "../pages/layout/FullLayout";
import { Dashboard } from "../pages/stakeholders/Dashboard";
import Ongoing from "../pages/stakeholders/projects/ongoing/Index";
import OngoingView from "../pages/stakeholders/projects/ongoing/OngoingView";
import OngoingDetails from "../pages/stakeholders/projects/ongoing/ProjectDetails";
import TaskBreakdown from "../pages/stakeholders/projects/ongoing/TaskBreakdown";
import TaskBreakdownChart from "../pages/stakeholders/projects/ongoing/TaskBreakdownChart";
import TaskMembers from "../pages/stakeholders/projects/ongoing/TaskMembers";
import CompletedTaskMembers from "../pages/stakeholders/projects/completed/TaskMembers";
import CompletedView from "../pages/stakeholders/projects/completed/CompletedView";
import CompletedDetails from "../pages/stakeholders/projects/completed/ProjectDetails";
import CompletedTaskBreakdown from "../pages/stakeholders/projects/completed/TaskBreakdown";
import CompletedTaskBreakdownChart from "../pages/stakeholders/projects/completed/TaskBreakdownChart";
import Completed from "../pages/stakeholders/projects/completed/Index";
import Profile from "../pages/stakeholders/Profile";
import Notification from "../pages/stakeholders/Notification";

export const StakeholdersRoutes = () => {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <FullLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: "app", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "notifications", element: <Notification /> },
        { path: "projects/ongoing", element: <Ongoing /> },
        { path: "projects/ongoing/:id", element: <OngoingView /> },
        { path: "projects/ongoing/:id/details", element: <OngoingDetails /> },
        { path: "projects/ongoing/:id/breakdown", element: <TaskBreakdown /> },
        { path: "projects/ongoing/:id/members", element: <TaskMembers /> },
        { path: "projects/ongoing/:id/chart", element: <TaskBreakdownChart /> },
        { path: "projects/completed", element: <Completed /> },
        { path: "projects/completed/:id", element: <CompletedView /> },
        { path: "projects/completed/:id/details", element: <CompletedDetails /> },
        { path: "projects/completed/:id/breakdown", element: <CompletedTaskBreakdown /> },
        { path: "projects/completed/:id/members", element: <CompletedTaskMembers /> },
        { path: "projects/completed/:id/chart", element: <CompletedTaskBreakdownChart /> },
      ],
    },
  ]);
  return routes;
};
