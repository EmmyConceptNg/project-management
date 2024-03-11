import { Navigate, useRoutes } from "react-router-dom";

import { FullLayout } from "../pages/layout/FullLayout";
import { Dashboard } from "../pages/users/Dashboard";
import Ongoing from "../pages/users/projects/ongoing/Index";
import OngoingView from "../pages/users/projects/ongoing/OngoingView";
import OngoingDetails from "../pages/users/projects/ongoing/ProjectDetails";
import TaskBreakdown from "../pages/users/projects/ongoing/TaskBreakdown";
import TaskBreakdownChart from "../pages/users/projects/ongoing/TaskBreakdownChart";
import TaskMembers from "../pages/users/projects/ongoing/TaskMembers";
import CompletedTaskMembers from "../pages/users/projects/completed/TaskMembers";
import CompletedView from "../pages/users/projects/completed/CompletedView";
import CompletedDetails from "../pages/users/projects/completed/ProjectDetails";
import CompletedTaskBreakdown from "../pages/users/projects/completed/TaskBreakdown";
import CompletedTaskBreakdownChart from "../pages/users/projects/completed/TaskBreakdownChart";
import Completed from "../pages/users/projects/completed/Index";
import Profile from "../pages/users/Profile";
import Notification from "../pages/users/Notification";

import AddTask from "../pages/users/projects/ongoing/AddTask";
import EditTask from "../pages/users/projects/ongoing/EditTask";
import CreateProject from "../pages/users/projects/createProject";

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <FullLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: "app", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "notifications", element: <Notification /> },
        { path: "projects/create", element: <CreateProject /> },
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
        {
          path: "projects/completed/:id/details",
          element: <CompletedDetails />,
        },
        {
          path: "projects/completed/:id/breakdown",
          element: <CompletedTaskBreakdown />,
        },
        {
          path: "projects/completed/:id/members",
          element: <CompletedTaskMembers />,
        },
        {
          path: "projects/completed/:id/chart",
          element: <CompletedTaskBreakdownChart />,
        },
      ],
    },
  ]);
  return routes;
};
