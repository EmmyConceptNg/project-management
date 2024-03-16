import { Box, FormControl, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import Text from "../components/utils/Text";
import { LoadingButton } from "@mui/lab";
import axios from "../api/axios";
import { notify } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import moment from "moment-timezone";

export default function ProfileSetup() {
  const [payload, setPayload] = useState({
    fullName: "",
    industry: "",
    timeZone: "",
    phone: "",
  });

  const [nextBtn, setNextBtn] = useState(false);

   const timezones = moment.tz.names();

  const handleTimezoneChange = (event) => {
    setPayload({ ...payload, timeZone: event.target.value });
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

    const updatedPaylod = { ...payload, userId: user?._id };
    axios
      .post("/api/user/setup", updatedPaylod, {
        headers: { ContentType: "application/json" },
      })
      .then((response) => {
        dispatch({ type: "SET_USER", payload: response.data.user });
        setNextBtn(false);
        navigate("/dashboard");
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
      <Stack spacing={10} mx="auto" mt={10}>
        <Box>
          <Text
            fw="600"
            fs="32px"
            color="#262626"
            sx={{ textAlign: "center", marginBottom: "10px" }}
          >
            Profile Setup
          </Text>
          <Text fw="400" fs="14px" color="#262626" sx={{ textAlign: "center" }}>
            Now manage your projects in fast and efficient way!
          </Text>
        </Box>
        <Stack spacing={3}>
          <Box display="flex">
            <Box
              component="img"
              src="assets/icons/add-image-2.svg"
              sx={{ width: "114px", height: "114px", mx: "auto" }}
            />
          </Box>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <label htmlFor="fullName" style={{ marginBottom: "10px" }}>
              <Text fw="500" fs="16px" ml={5}>
                Full Name
              </Text>
            </label>
            <OutlinedInput
              size="small"
              required
              id="fullName"
              type="text"
              name="fullName"
              value={payload.fullName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <label htmlFor="projects" style={{ marginBottom: "10px" }}>
              <Text fw="500" fs="16px" ml={5}>
                Your Industry
              </Text>
            </label>
            <Select
              labelId="projects"
              size="small"
              fullWidth
              name="industry"
              value={payload.industry}
              onChange={handleChange}
            >
              {["banking", "technology", "finance", "crypto", "education"].map(
                (name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <label htmlFor="projects" style={{ marginBottom: "10px" }}>
              <Text fw="500" fs="16px" ml={5}>
                Time Zone
              </Text>
            </label>
            <Select
              labelId="timezone-label"
              id="timezone-select"
              value={payload.timeZone}
              onChange={handleTimezoneChange}
              size="small"
              fullWidth
              name="timeZone"
            >
              {timezones.map((timezone) => {  return (
                // Format the display of the time zone, if desired
                <MenuItem key={timezone} value={timezone}>
                  {`${timezone} (UTC ${moment.tz(timezone).format("Z")})`}
                </MenuItem>
              )})}
            </Select>
          </FormControl>

          <Box>
            <PhoneInput
              style={{ minWidth: "100%" }}
              defaultCountry="ua"
              value={payload.phone}
              onChange={(phone) => setPayload({ ...payload, phone: phone })}
            />
          </Box>
          <LoadingButton
            loading={nextBtn}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ textTransform: "capitalize" }}
          >
            Done
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}
