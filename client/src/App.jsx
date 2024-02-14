import EmailConf from "./pages/EmailConfirm";
import ForgotPass1 from "./pages/ForgotPass1";
import ForgotPass2 from "./pages/ForgotPass2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import Signup from "./pages/Signup";
import WorkSpaceSetup from "./pages/WorkSpaceSetup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="confirm" element={<EmailConf />} />
          <Route path="workspace" element={<WorkSpaceSetup />} />
          <Route path="profile" element={<ProfileSetup />} />
          <Route path="recovery" element={<ForgotPass1 />} />
          <Route path="recovery2" element={<ForgotPass2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
