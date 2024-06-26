import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Text from "../../components/utils/Text";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { notify } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Icon } from "@iconify/react";

export default function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const workspaceEmail = queryParams.get("email") ?? ""; 
  const [payload, setPayload] = useState({
    email: workspaceEmail ?? "",
    password: "",
  });

  const [loginBtn, setLoginBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "REMOVE_WORKSPACE"});
    e.preventDefault();
    setLoginBtn(true);
    axios
      .post("/api/user/login", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.user);
        dispatch({ type: "SET_USER", payload: response.data.user });
        dispatch({ type: "SET_WORKSPACE", payload: response.data.workspace });
        
          navigate("/dashboard");
        
      })
      .catch((error) => {
        notify(error?.response?.data?.error, "error");
        setLoginBtn(false);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const handleLoginGoogle = (values) => {
    setLoginBtn(true);

    axios
      .post("/api/user/login/google", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.user);
        dispatch({ type: "SET_USER", payload: response.data.user });
        dispatch({ type: "SET_WORKSPACE", payload: response.data.workspace });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        notify(error?.response?.data?.error, "error");
      })
      .finally(() => setLoginBtn(false));
  };

  const [googleUser, setGoogleUser] = useState([]);

  const signUpWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
      console.log(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googleUser && googleUser.access_token) {
      // Ensure there's an access token
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
            },
          }
        )
        .then((res) => {
         
          handleLoginGoogle(
            {
              email: res.data.email,
              emailVerified: res.data.verified_email,
            },
            
          );
        })
        .catch((err) => {
          console.error("Error fetching Google user info:", err.message);
        });
    }
  }, [googleUser]);

  return (
    <Box>
      <ToastContainer />
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item md={6} lg={6} xs={12} sm={12}>
          <Box display="flex" height={"100vh"}>
            <Stack
              m="auto"
              spacing={5}
              sx={{ width: { lg: "520px", sm: "450px" } }}
            >
              <Text fw="600" fs="24px" color="#1A1A1A">
                Login
              </Text>
              <Text fw="400" color="#1A1A1A" fs="16px" mt={10}>
                Enter your credentials to get started
              </Text>
              <Box component="form" onSubmit={handleLogin}>
                <Stack
                  spacing={2}
                  mt={5}
                  sx={{ width: { lg: "520px", sm: "450px" } }}
                >
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <label htmlFor="password" style={{ marginBottom: "10px" }}>
                      <Text fw="500" fs="16px" ml={5}>
                        Email
                      </Text>
                    </label>
                    <OutlinedInput
                      required
                      id="email"
                      type="email"
                      name="email"
                      value={payload.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <label htmlFor="password" style={{ marginBottom: "10px" }}>
                      <Text fw="500" fs="16px" ml={5}>
                        Password
                      </Text>
                    </label>
                    <OutlinedInput
                      required
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={payload.password}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <LoadingButton
                    loading={loginBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ height: "50px" }}
                  >
                    Login
                  </LoadingButton>
                </Stack>
              </Box>
              <Box display="flex" justifyContent="space-between" mx={4}>
                <Box ml="auto">
                  <Text
                    mx="auto"
                    fs="15px"
                    fw="500"
                    color="#1166EA"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/password/email")}
                  >
                    Forget Password?
                  </Text>
                </Box>
              </Box>

              <Divider>
                <Text fw="500" fs="15px">
                  OR
                </Text>
              </Divider>
              <Box>
                  <Box>
                <Button
                  onClick={()=>signUpWithGoogle()}
                
                  variant="outlined"
                  sx={{ color :"#344054",  width:"100%", height:"44px" }}
                  startIcon={<Icon icon="devicon:google" />}
                >
                  Sign in with Google
                </Button>
              </Box>
              </Box>
              <Box display="flex" justifyContent={"center"}>
                <Text sx={{ textAlign: "center" }}>Don't have an account?</Text>
                <Text
                  onClick={() => navigate("/")}
                  sx={{
                    textAlign: "center",
                    marginLeft: 7,
                    color: "#1166EA",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Text>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          lg={6}
          xs={12}
          sm={12}
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
          }}
        >
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src="assets/images/auth-image.svg"
              alt="Authentication"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
