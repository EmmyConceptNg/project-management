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

import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
export default function ConfirmEmail() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isResending,setIsResending]= useState(false)
  const user = useSelector(state =>state.user)

  const [loginBtn, setLoginBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (event, index) => {
    const inputValue = event.target.value;
    if (inputValue.length === 1 && !isNaN(inputValue)) {
      const updatedPin = [...pin];
      updatedPin[index] = event.target.value;

      // Focus on the next input field if not the last one
      if (index < updatedPin.length - 1 && event.target.value !== "") {
        const nextInput = document.getElementById(`pin${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }

      setPin(updatedPin);
    }
  };

  const handlePaste = (event, index) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedNumber = clipboardData.getData("text");

    const digitArray = pastedNumber.toString().split("").map(Number);

    const updatedPin = [...pin];
    digitArray.forEach((digit, i) => {
      if (i < updatedPin.length) {
        updatedPin[i] = digit;
      }
    });

    setPin(updatedPin);
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace") {
      const updatedPin = [...pin];
      updatedPin[index] = "";
      setPin(updatedPin);

      if (index > 0) {
        const prevInput = document.getElementById(`pin${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  useEffect(() => {
    // Check if the last index is filled, and submit if it is
    if (pin[pin.length - 1] !== "") {
      handleConfirmEmail();
    }
  }, [pin]);

  const handleConfirmEmail = (e) => {
    e.preventDefault();
    setLoginBtn(true);

    axios
      .post(
        "/api/auth/login",
        { email: user?.email, token: pin.join("") },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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
  const [count, setCount] = useState(30)
   const handleResend = () => {
    // for (let i = count; i < count; i--) {

    // }
     axios
       .post(
         "/api/auth/resend",
         {
           email: user?.email,
         },
         {
           headers: {
             Accept: "application/json",
           },
         }
       )
       .then((response) => {
         notify("Token Resent", "message");
       })
       .catch((err) => {
         setLoginBtn(false);
         setIsResending(true);
        
                
           notify(err.response.data.error, "error");
       })
         
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
                Email Confirmation
              </Text>
              <Text fw="400" color="#1A1A1A" fs="16px" mt={10}>
                Enter the code we sent on your email “johndoe@gmail.com”
              </Text>
              <Box component="form" onSubmit={handleConfirmEmail}>
                <Stack
                  spacing={2}
                  mt={5}
                  sx={{ width: { lg: "520px", sm: "450px" } }}
                >
                  <label htmlFor="password" style={{ marginBottom: "10px" }}>
                    <Text fw="500" fs="16px" ml={5}>
                      OTP Code
                    </Text>
                  </label>
                  <Stack direction="row" justifyContent="space-between">
                    {pin.map((_pin, index) => (
                      <FormControl key={index} fullWidth sx={{ width: "52px" }}>
                        <OutlinedInput
                          id={`pin${index}`}
                          value={pin[index]}
                          type="number"
                          onChange={(e) => handleChange(e, index)}
                          label="Pin"
                          inputProps={{
                            maxLength: 1,
                          }}
                          onKeyDown={(e) => handleBackspace(e, index)}
                          onPaste={handlePaste}
                        />
                      </FormControl>
                    ))}
                  </Stack>

                  <LoadingButton
                    loading={loginBtn}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Confirm Code
                  </LoadingButton>
                </Stack>
              </Box>
              <Box display="flex" justifyContent="space-between" mx={4}>
                <Box mr="auto">
                  {isResending ? (
                    <Text
                      mx="auto"
                      fs="16px"
                      fw="500"
                      color="#1A1A1A"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      Resend Code in {count}s
                    </Text>
                  ) : (
                    <Text
                      mx="auto"
                      fs="16px"
                      fw="500"
                      color="#1166EA"
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={handleResend}
                    >
                      Resend Code
                    </Text>
                  )}
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
