import { ProjectManagerRoutes } from "./routes/ProjectManagerRoutes";
import { Router } from "./routes/routes";
import { StakeholdersRoutes } from "./routes/StakeholdersRoutes";

function App() {
  return (
    <>
      <Router />
      <StakeholdersRoutes />
      <ProjectManagerRoutes />
    </>
  );
}

export default App;
