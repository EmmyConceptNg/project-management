import {
  Box,
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import Text from "../components/utils/Text";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { notify } from "../utils/utils";
import { ToastContainer } from "react-toastify";

export default function WorkSpaceSetup() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
  });

  const [nextBtn, setNextBtn] = useState(false);

  const [emails, setEmails] = useState([]);
  
  const handleAddEmail = () => {
    // Basic pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(payload.email) && !emails.includes(payload.email)) {
      setEmails([...emails, payload.email]);
      setPayload({ ...payload, email: "" });
    }
    // Optionally, handle notifying the user that the email is invalid
    else if (!emailPattern.test(payload.email)) {
      notify("Please enter a valid email address.", "error");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitWorkspace = (e) => {
    setNextBtn(true);
    e.preventDefault();

    const updatedPaylod = { ...payload, userId: user?._id, team: emails };
    axios
      .post("/api/workspace/create", updatedPaylod, {
        headers: { ContentType: "application/json" },
      })
      .then((response) => {
        dispatch({ type: "SET_WORKSPACE", payload: response.data.workspace });

        setNextBtn(false);
        if (user && user.fullName) {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      })
      .catch((error) => {
        notify(error.response.data.error);
        setNextBtn(false);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      component="form"
      onSubmit={submitWorkspace}
    >
    <ToastContainer />
      <Box
        mx="auto"
        sx={{ maxWidth: { md: "500px", sm: "450px", xs: "310px" } }}
      >
        <Box display="flex">
          <Stack spacing={10} mx="auto" mt={10}>
            <Box>
              <Text
                fw="600"
                fs="32px"
                color="#262626"
                sx={{ textAlign: "center", marginBottom: "10px" }}
              >
                Set Up Your Workspace
              </Text>
              <Text
                fw="400"
                fs="14px"
                color="#262626"
                sx={{ textAlign: "center" }}
              >
                Enter the name of your workspace and manage all projects in it.
              </Text>
            </Box>
            <Stack spacing={3}>
              <Box display="flex">
                {" "}
                <Box
                  component="img"
                  src="/assets/icons/add-image.svg"
                  sx={{ width: "114px", height: "114px", mx: "auto" }}
                />
              </Box>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <label htmlFor="password" style={{ marginBottom: "10px" }}>
                  <Text fw="500" fs="16px" ml={5}>
                    Work Space Name
                  </Text>
                </label>
                <OutlinedInput
                  size="small"
                  required
                  id="name"
                  type="text"
                  name="name"
                  value={payload.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <label htmlFor="name" style={{ marginBottom: "15px" }}>
                  <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                    Invite Team Member
                  </Text>
                </label>
                <Stack direction="row" spacing={1}>
                  <OutlinedInput
                    fullWidth
                    id="name"
                    type="email"
                    name="email"
                    value={payload.email}
                    onChange={handleChange}
                  />
                  <Button variant="outlined" onClick={handleAddEmail}>
                    Add
                  </Button>
                </Stack>
              </FormControl>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {emails.map((email, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "#F2F2F2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Text sx={{ my: "auto" }}>{email}</Text>
                    <Button
                      sx={{ my: "auto" }}
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveEmail(email)}
                    >
                      X
                    </Button>
                  </Box>
                ))}
              </Box>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button fullWidth 
                onClick={() => navigate('/profile')}
                  variant="outlined"
                  color="primary"
                  type="button"
                  sx={{ textTransform: "capitalize", height: '50px' }}
                >
                  Skip
                </Button>
                <LoadingButton fullWidth 
                  loading={nextBtn}
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ textTransform: "capitalize", height: '50px' }}
                >
                  Next
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
