import {
  Box,
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
import { Link } from "react-router-dom";
import Text from "../../components/utils/Text";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { notify } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import { useState } from "react";

export default function Signup() {
  const [payload, setPayload] = useState({
    email: "",
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
    e.preventDefault();
    setLoginBtn(true);

    axios
      .post("/api/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        dispatch({ type: "SET_USER", payload: response.data.user });
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
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

  return (
    <Box>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item md={6} lg={6} xs={12} sm={12}>
          <Box display="flex" height={"100vh"}>
            <Stack
              m="auto"
              spacing={5}
              sx={{ width: { lg: "520px", sm: "450px" } }}
            >
              <Text fw="600" fs="24px" color="#1A1A1A">
                Sign Up
              </Text>
              <Text fw="400" color="#1A1A1A" fs="16px" mt={10}>
                Create your account to start managing your projects today!
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
                    sx={{ textTransform: "capitalize" }}
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
                <Box
                  borderRadius="10px"
                  width="100%"
                  height="44px"
                  border="1px solid #D9D9D9"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box component="img" src="assets/icons/google.svg" />
                  <Text fw="500" fs="16px" ml={5}>
                    Continue with google
                  </Text>
                </Box>
                <Box
                  mt={2}
                  borderRadius="10px"
                  width="100%"
                  height="44px"
                  border="1px solid #D9D9D9"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box component="img" src="assets/icons/apple.svg" />
                  <Text fw="500" fs="16px" ml={5}>
                    Continue with apple
                  </Text>
                </Box>
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
          sx={{ display: { md: "block", sm: "none", xs: "none" } }}
        >
          <Box
            sx={{ ml: "auto" }}
            component="img"
            src="assets/images/auth-image.svg"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
