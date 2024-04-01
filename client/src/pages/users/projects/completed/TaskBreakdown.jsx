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

import { ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import ProjectLoader from "../../../../components/utils/ProjectLoader";
import TaskBreakdownTable from "./TaskBreakdownTable";

export default function CompletedTaskBreakdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();
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
    fetchProject();
  }, []);

  const fetchProject = () => {
    setLoading(true);
    axios
      .get(`/api/projects/${projectId}/${user?._id}/completed`)
      .then((response) => {
        setProject(response.data.project);
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
            Completed Projects
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
              {`${project?.name} > Tasks`}
            </Text>
          </Box>
        )}
      </Box>

      <TaskBreakdownTable
        project={project}
        loading={loading}
        fetchProject={fetchProject}
      />
    </>
  );
}
