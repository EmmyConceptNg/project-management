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
import WorkSpaceSetup from "../pages/WorkSpaceSetup";
import WorkspaceMembers from "../pages/users/workspace/Members";

export const WorkspaceRoutes = () => {
  const routes = useRoutes([
    {
      path: "/workspace",
      element: <FullLayout />,
      children: [
        { element: <Navigate to="setup" />, index: true },
        { path: "setup", element: <WorkSpaceSetup /> },
        { path: ":workspaceId/members", element: <WorkspaceMembers /> },
        
      ],
    },
  ]);
  return routes;
};
