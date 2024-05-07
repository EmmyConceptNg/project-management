import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";

import { Add, ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import ProjectLoader from "../../../../components/utils/ProjectLoader";
import TaskBreakdownTable from "./TaskBreakdownTable";

export default function TaskBreakdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [milestone, setMilestone] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { milestoneId } = useParams();
  const user = useSelector((state) => state.user);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  useEffect(() => {
    fetchMilestone();
    fetchTasks();
  }, []);

  const fetchMilestone = () => {
    setLoading(true);
    axios
      .get(`/api/milestones/get-milestone/${milestoneId}`)
      .then((response) => {
        setMilestone(response.data.milestone);
        setLoading(false);
      });
  };

  const fetchTasks = () => {
    setLoading(true);
    axios
      .get(`/api/tasks/${milestoneId}`)
      .then((response) => {
        setTasks(response.data.tasks);
        setLoading(false);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();

  return (
    <>
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
            In Progress
          </Text>
        </Box>
      </Box>
      <Box
        my={3}
        borderBottom="1px solid #D9D9D9 "
        display="flex"
        alignItems="center"
      >
        {loading ? (
          <ProjectLoader sx={{ height: "50px" }} />
        ) : (
          <Box mb={3} ml={7}>
            <Text fw="600" fs="22px">
              {`${milestone?.name} > Tasks`}
            </Text>
          </Box>
        )}
      </Box>

      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/dashboard/projects/ongoing/${milestone?.projectId}/${milestoneId}/task/create`
            )
          }
          startIcon={<Add />}
          sx={{ borderRadius: "10px" }}
        >
          Add New Task
        </Button>
      </Box>

      <TaskBreakdownTable
        milestone={milestone}
        tasks={tasks}
        loading={loading}
        fetchMilestone={fetchMilestone}
        fetchTasks={fetchTasks}
      />
    </>
  );
}
