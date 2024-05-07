import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  Stack,
} from "@mui/material";
import Text from "../../../../components/utils/Text";
import { ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";
import { notify } from "../../../../utils/utils";
import { LoadingButton } from "@mui/lab";
import { ToastContainer } from "react-toastify";

export default function AddMilestone() {
  const today = new Date().toISOString().split("T")[0];
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { projectId } = useParams();
  const [creatingTask, setCreatingTask] = useState(false);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    title: "",
    startDate: "",
    endDate: "",
    owner: "",
    notes: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/projects/${projectId}/${user?._id}/ongoing`)
      .then((response) => {
        setProject(response.data.project);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const handleDescriptionChange = (data) => {
    setPayload({ ...payload, notes: data });
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (new Date(payload.endDate) <= new Date(payload.startDate)) {
      notify("End date must be greater than the start date.", "error");
      return; // Prevent the form submission if validation fails
    }
    // Proceed with milestone creation if validation passes
    setCreatingTask(true);

    const updatedPayload = { ...payload, projectId };
    axios
      .post("/api/milestones/create", updatedPayload)
      .then((response) => {
        navigate(`/dashboard/projects/ongoing/${project?._id}/milestones`);
        notify(response.data.message, "success");
        setCreatingTask(false);
      })
      .catch((err) => {
        setCreatingTask(false);
        notify(err?.response?.data?.error, "error");
      });
  };

  // ...

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
            Add Milestone
          </Text>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleAddMilestone}>
        <Grid container spacing={{ md: 3, lg: 3, sm: 2, xs: 2 }}>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="name"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Milestone Title
                </Text>
              </label>
              <OutlinedInput
                required
                id="name"
                type="text"
                name="name"
                value={payload.name}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="startDate"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Start Date
                </Text>
              </label>
              <OutlinedInput
                required
                id="startDate"
                name="startDate"
                type="date"
                value={payload.startDate}
                inputProps={{
                  min: today,
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="endDate"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  End Date
                </Text>
              </label>
              <OutlinedInput
                required
                id="endDate"
                name="endDate"
                type="date"
                value={payload.endDate}
                inputProps={{
                  min: payload.startDate, // The minimum end date now depends on the start date
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="team"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Milestone Owner
                </Text>
              </label>
              <Select
                labelId="owner"
                fullWidth
                name="owner"
                value={payload.owner}
                onChange={handleChange}
              >
                {project?.team
                  // ?.filter((_team) => _team?.userId?._id !== user?._id)
                  ?.map((_user, index) => (
                    <MenuItem key={index} value={_user?.userId?._id}>
                      {_user?.userId?.fullName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="status"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Notes
                </Text>
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={payload?.notes}
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
                }}
                config={{
                  height: "500px", // Set the height you prefer
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDescriptionChange(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
                style={{ minHeight: "100%" }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end">
          <Stack
            mt={5}
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button
              sx={{ height: "44px", borderRadius: "10px" }}
              fullWidth
              onClick={() => {}}
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={creatingTask}
              sx={{
                height: "44px",
                borderRadius: "10px",
                textWrap: "nowrap",
                width: "400px",
              }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Create Milestone
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
