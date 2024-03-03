import { Navigate, useRoutes } from "react-router-dom";

import { FullLayout } from "../pages/layout/FullLayout";
import { Dashboard } from "../pages/projectmanagers/Dashboard";
import Ongoing from "../pages/projectmanagers/projects/ongoing/Index";
import OngoingView from "../pages/projectmanagers/projects/ongoing/OngoingView";
import OngoingDetails from "../pages/projectmanagers/projects/ongoing/ProjectDetails";
import TaskBreakdown from "../pages/projectmanagers/projects/ongoing/TaskBreakdown";
import TaskBreakdownChart from "../pages/projectmanagers/projects/ongoing/TaskBreakdownChart";
import TaskMembers from "../pages/projectmanagers/projects/ongoing/TaskMembers";
import CompletedTaskMembers from "../pages/projectmanagers/projects/completed/TaskMembers";
import CompletedView from "../pages/projectmanagers/projects/completed/CompletedView";
import CompletedDetails from "../pages/projectmanagers/projects/completed/ProjectDetails";
import CompletedTaskBreakdown from "../pages/projectmanagers/projects/completed/TaskBreakdown";
import CompletedTaskBreakdownChart from "../pages/projectmanagers/projects/completed/TaskBreakdownChart";
import Completed from "../pages/projectmanagers/projects/completed/Index";
import Profile from "../pages/projectmanagers/Profile";
import Notification from "../pages/projectmanagers/Notification";
import { PMLayout } from "../pages/layout/PMLayout";
import AddTask from "../pages/projectmanagers/projects/ongoing/AddTask";
import EditTask from "../pages/projectmanagers/projects/ongoing/EditTask";

export const ProjectManagerRoutes = () => {
  const routes = useRoutes([
    {
      path: "/dashboard/pm",
      element: <PMLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: "app", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "notifications", element: <Notification /> },
        { path: "projects/ongoing", element: <Ongoing /> },
        { path: "projects/ongoing/:id", element: <OngoingView /> },
        { path: "projects/ongoing/:id/create", element: <AddTask /> },
        { path: "projects/ongoing/:id/edit", element: <EditTask /> },
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
