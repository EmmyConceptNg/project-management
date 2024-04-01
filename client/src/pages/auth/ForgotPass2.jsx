import {
  Box,
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

export default function ForgotPass2() {
  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const [loginBtn, setLoginBtn] = useState(false);
  const dispatch = useDispatch();
  

  const handleChangePassword = (e) => {
    e.preventDefault();
      navigate("/workspace");
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
                Forgot Password?
              </Text>
              <Text fw="400" color="#1A1A1A" fs="16px" mt={10}>
                Enter your email that you used at time of account setup to
                recover account
              </Text>
              <Box component="form" onSubmit={handleChangePassword}>
                <Stack
                  spacing={2}
                  mt={5}
                  sx={{ width: { lg: "520px", sm: "450px" } }}
                >
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
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
                      label="Password"
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <InputLabel htmlFor="confirm-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={payload.confirmPassword}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>

                  <LoadingButton
                    loading={loginBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Save
                  </LoadingButton>
                </Stack>
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
            src="/public/assets/images/auth-image.svg"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
