import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
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
  const queryParams = new URLSearchParams(location.search);
  const workspaceEmail = queryParams.get('email') ?? ""; 

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

  const handleSignup = (e) => {
    dispatch({ type: "LOGOUT"});
    dispatch({ type: "REMOVE_WORKSPACE"});
    e.preventDefault();
    setLoginBtn(true);

    axios
      .post("/api/user/signup", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data)
        dispatch({ type: "SET_USER", payload: response.data.user });
          navigate("/workspace");
      })
      .catch((error) => {
        notify(error?.response?.data?.error, "error");
        setLoginBtn(false);
      });
  };
  const handleSignupGoogle = (values) => {
    setLoginBtn(true);
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "REMOVE_WORKSPACE" });
    axios
      .post("/api/user/signup", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_USER", payload: response.data.user });
        navigate("/workspace");
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

  const [checked, setChecked] = useState(false)



  const [googelUser, setGoogleUser] = useState([]);

  const signUpWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googelUser && googelUser.access_token) {
      // Ensure there's an access token
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googelUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googelUser.access_token}`,
            },
          }
        )
        .then((res) => {
          
          handleSignupGoogle({
            fullName: res.data.name,
            email: res.data.email,
            image: res.data.picture,
            isVerified: res.data.verified_email,
          });
        })
        .catch((err) => {
          console.error("Error fetching Google user info:", err.message);
        });
    }
  }, [googelUser]);

  return (
    <Box>
      <ToastContainer />
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item md={7} lg={7} xs={12} sm={12}>
          <Box display="flex" height={"100vh"}>
            <Stack
              m="auto"
              spacing={5}
              sx={{ width: { lg: "520px", sm: "450px" } }}
            >
              <Box>
                <Text fw="600" fs="24px" mb={1} color="#1A1A1A">
                  Sign Up
                </Text>
                <Text fw="400" color="#1A1A1A" fs="16px">
                  Create your account to start managing your projects today!
                </Text>
              </Box>
              <Box component="form" onSubmit={handleSignup}>
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setChecked(e.target.checked)}
                        value={checked}
                      />
                    }
                    label={
                      <Text fw="400" fs="14px" color="#000">
                        I agree to terms of service and privacy policy
                      </Text>
                    }
                  />

                  <LoadingButton
                    disabled={!checked}
                    loading={loginBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "capitalize", height: "50px" }}
                  >
                    Continue with Email
                  </LoadingButton>
                </Stack>
              </Box>

              <Divider>
                <Text
                  fw="500"
                  fs="15px
"
                >
                  OR
                </Text>
              </Divider>
              <Box>
                <Button
                  onClick={() => signUpWithGoogle()}
                  variant="outlined"
                  sx={{ color: "#344054", width: "100%", height: "44px" }}
                  startIcon={<Icon icon="devicon:google" />}
                >
                  Sign up with Google
                </Button>
              </Box>
              <Box display="flex" justifyContent={"center"}>
                <Text sx={{ textAlign: "center" }}>
                  Already have the account?
                </Text>
                <Text
                  onClick={() => navigate("/login")}
                  sx={{
                    textAlign: "center",
                    marginLeft: 7,
                    color: "#1166EA",
                    cursor: "pointer",
                  }}
                >
                  Log in
                </Text>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          md={5}
          lg={5}
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
