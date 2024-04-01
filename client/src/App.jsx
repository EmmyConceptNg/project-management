import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/AppRoutes";
import { Router } from "./routes/routes";
import { WorkspaceRoutes } from "./routes/WorkspaceRoutes";

function App() {
  return (
    <>
    <ToastContainer />
      <Router />
      <AppRoutes />
      <WorkspaceRoutes />
    </>
  );
}

export default App;
