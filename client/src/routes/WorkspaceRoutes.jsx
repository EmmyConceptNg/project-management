import { Navigate, useRoutes } from "react-router-dom";

import { FullLayout } from "../pages/layout/FullLayout";
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
