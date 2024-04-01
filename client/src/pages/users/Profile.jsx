import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import Text from "../../components/utils/Text";
import { ArrowBackIos } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { notify } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../api/axios";
import { PhoneInput } from "react-international-phone";
import moment from "moment";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [updateBtn, setUpdateBtn] = useState(false);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [image, setImage] = useState(user.image);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      notify("Please select a file first!", "error");
      return false;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      axios
        .post(`/api/user/${user?._id}/update-profile-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          notify(response.data.message, "success");
          dispatch({ type: "SET_USER", payload: response.data.user });

          setImage(response.data.filePath);
        });
    } catch (error) {
      console.log("Error uploading image:", error);

      notify(error.response?.data.error, "error");
    }
  };

  const [payload, setPayload] = useState({
    fullName: user?.fullName,
    industry: user?.industry,
    timeZone: user?.timeZone,
    phone: user?.phone,
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
    <>
      <ToastContainer />
      <Box
        borderBottom="1px solid #D9D9D9 "
        mb={3}
        display="flex"
        alignItems="center"
      >
        <Box display={"flex"} gap={2} alignItems="center" sx={{ mb: "20px" }}>
          <IconButton sx={{ my: "auto" }} onClick={() => navigate(-1)}>
            <ArrowBackIos sx={{ color: "#1A1A1A" }} />
          </IconButton>
          <Text fw="600" fs="22px">
            Profile
          </Text>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Box display="flex" alignItems="flex-end">
          <Avatar
            alt={user.fullName}
            sx={{ width: "130px", height: "130px" }}
            src={
              user?.image
                ? getImageUrl(user?.image)
                : "/assets/icons/ai-avatar.svg"
            }
          />
          <Box>
            <Box
              component="img"
              src="/assets/icons/edit_icon.svg"
              sx={{ cursor: "pointer" }}
              onClick={handleImageClick}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={15} display="flex" justifyContent="center">
        <Box
          mx="auto"
          width="520.36px"
          component="form"
          onSubmit={submitWorkspace}
        >
          <Stack spacing={3}>
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
                {[
                  "banking",
                  "technology",
                  "finance",
                  "crypto",
                  "education",
                ].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
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
                {timezones.map((timezone) => {
                  return (
                    // Format the display of the time zone, if desired
                    <MenuItem key={timezone} value={timezone}>
                      {`${timezone} (UTC ${moment.tz(timezone).format("Z")})`}
                    </MenuItem>
                  );
                })}
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
              Update Details
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
