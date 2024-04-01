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

import MilestoneTable from "./MilestoneTable";

export default function Milestones() {
  

  const [project, setProject] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();
  const user = useSelector((state) => state.user);


  useEffect(() => {
    fetchProject();
    fetchMilestone()
  }, []);

  const fetchProject = () => {
    setLoading(true);
    axios
      .get(`/api/projects/${projectId}/${user?._id}/ongoing`)
      .then((response) => {
        setProject(response.data.project);
        setLoading(false);
      });
  };

    const fetchMilestone = () => {
      setLoading(true);
      axios.get(`/api/milestones/${projectId}`).then((response) => {
        setMilestones(response.data.milestones);
        setLoading(false);
      });
    };

  

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
            Ongoing Projects
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
              {`${project?.name} > Milestones`}
            </Text>
          </Box>
        )}
      </Box>

      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/dashboard/projects/ongoing/${projectId}/milestone/create`
            )
          }
          startIcon={<Add />}
          sx={{ borderRadius: "10px" }}
        >
          Add New Milestone
        </Button>
      </Box>
      <MilestoneTable
        project={project}
        milestones={milestones}
        loading={loading}
        fetchProject={fetchProject}
        fetchMilestone={fetchMilestone}
      />
    </>
  );
}
