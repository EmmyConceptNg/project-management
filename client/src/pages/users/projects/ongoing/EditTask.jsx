import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import Text from "../../../../components/utils/Text";
import { ArrowBackIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";
import { notify } from "../../../../utils/utils";
import { LoadingButton } from "@mui/lab";
import { ToastContainer } from "react-toastify";

export default function EditTask() {
  const today = new Date().toISOString().split("T")[0];

  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { taskId, projectId } = useParams();
  const [task, setTask] = useState({});
  const [creatingTask, setCreatingTask] = useState(false);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    name: '',
    startDate: '',
    endDate: '',
    team: '',
    description: '',
  });

  useEffect(() => {
    fetchProject();
    fetchTask()
  }, []);

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      const formattedStartDate = task.startDate.split("T")[0]; 
      const formattedEndDate = task.endDate.split("T")[0]; 

      setPayload({
        name: task.name ?? "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        team: task.team?._id ?? "",
        description: task.description ?? "",
      });
    }
  }, [task]);


  const fetchProject = () =>{
    setLoading(true);
    axios
      .get(`/api/projects/${projectId}/${user?._id}/ongoing`)
      .then((response) => {
        setProject(response.data.project);
        setLoading(false);
      });
  }

  const fetchTask = () =>{
    setLoading(true);
    axios
      .get(`/api/tasks/get-task/${taskId}`)
      .then((response) => {
        setTask(response.data.task);
        console.log('name',response.data.task.name);
        setLoading(false);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const handleDescriptionChange = (data) => {
    setPayload({ ...payload, description: data });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setCreatingTask(true);
    
    axios
      .post(`/api/tasks/update/${taskId}`, payload)
      .then((response) => {
        navigate(`/dashboard/projects/ongoing/${taskId}/breakdown`);
        notify(response.data.message, "success");
        setCreatingTask(false);
      })
      .catch((err) => {
        setCreatingTask(false);
        notify(err?.response?.data?.error, "error");
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
            Edit Task
          </Text>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleAddTask}>
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
                  Title of the task
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
                  min: today,
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
                  Assign Task
                </Text>
              </label>
              <Select
                labelId="team"
                fullWidth
                name="team"
                value={payload.team}
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
                  Task Description
                </Text>
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={payload?.description}
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
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
            sx={{ height: "44px", borderRadius: "10px" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Update Task
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
}
