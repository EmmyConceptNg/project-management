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
import EditProject from "../pages/users/projects/ongoing/EditProject";
import CreateProject from "../pages/users/projects/CreateProject";
import Milestones from "../pages/users/projects/ongoing/Milestones";
import AddMilestone from "../pages/users/projects/ongoing/AddMilestone";

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
        { path: "projects/ongoing/:projectId", element: <OngoingView /> },
        { path: "projects/ongoing/:projectId/edit-project", element: <EditProject /> },
        { path: "projects/ongoing/:projectId/milestone/create", element: <AddMilestone /> },
        { path: "projects/ongoing/:projectId/edit", element: <EditTask /> },
        { path: "projects/ongoing/:projectId/details", element: <OngoingDetails /> },
        { path: "projects/ongoing/:projectId/milestones", element: <Milestones /> },
        { path: "projects/ongoing/:projectId/members", element: <TaskMembers /> },
        { path: "projects/ongoing/:projectId/chart", element: <TaskBreakdownChart /> },
        { path: "projects/ongoing/:projectId/:milestoneId/task/create", element: <AddTask /> },
        { path: "projects/ongoing/:milestoneId/breakdown", element: <TaskBreakdown /> },


        { path: "projects/completed", element: <Completed /> },
        { path: "projects/completed/:projectId", element: <CompletedView /> },
        {
          path: "projects/completed/:projectId/details",
          element: <CompletedDetails />,
        },
        {
          path: "projects/completed/:projectId/breakdown",
          element: <CompletedTaskBreakdown />,
        },
        {
          path: "projects/completed/:projectId/members",
          element: <CompletedTaskMembers />,
        },
        {
          path: "projects/completed/:projectId/chart",
          element: <CompletedTaskBreakdownChart />,
        },
      ],
    },
  ]);
  return routes;
};
