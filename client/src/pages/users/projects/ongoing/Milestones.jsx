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
        maxWidth="100vw"
      >
        <Box display={"flex"} gap={2} alignItems="center" sx={{ mb: "20px" }}>
          <IconButton sx={{ my: "auto" }} onClick={() => navigate(-1)}>
            <ArrowBackIos sx={{ color: "#1A1A1A" }} />
          </IconButton>
          <Box my="auto" display="flex" alignItems="center">
            {loading ? (
              <ProjectLoader sx={{ height: "50px" }} />
            ) : (
              <Text fw="600" fs="22px">
                {`Milestones - ${project?.name} `}
              </Text>
            )}
          </Box>
        </Box>
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
      <Stack
        direction="row"
        spacing={1}
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ maxWidth: "100vw" }}
      >
        <Box display="flex" justifyContent="center" width="20%">
          <List
            sx={{
              border: "1px solid #D9D9D9",

              borderRadius: "8px",
            }}
          >
            {[
              {
                name: "Project Details",
                icon: "uil:file-alt",
                link: `/dashboard/projects/ongoing/${projectId}/details`,
              },
              {
                name: "Milestones",
                icon: "uil:game-structure",
                link: `/dashboard/projects/ongoing/${projectId}/milestones`,
              },
              // {
              //   name: "Task Breakdown",
              //   icon: "uil:game-structure",
              //   link: "breakdown",
              // },
              { name: "Team Members", icon: "uil:users-alt", link: `/dashboard/projects/ongoing/${projectId}/members` },
              { name: "Gantt Chart", icon: "uil:chart-bar-alt", link: `/dashboard/projects/ongoing/${projectId}/chart` },
            ].map((item, index) => (
              <>
                <ListItem
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#F2F2F2" },
                  }}
                  onClick={() => navigate(item.link)}
                  key={index}
                  secondaryAction={
                    <Icon icon="uil:angle-right" fontSize="24px" />
                  }
                >
                  <ListItemAvatar>
                    <Icon icon={item.icon} fontSize="24px" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Text fs="18px" fw="500" sx={{ cursor: "pointer" }}>
                        {item.name}
                      </Text>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
        <Box width="80%">
          <MilestoneTable
            project={project}
            milestones={milestones}
            loading={loading}
            fetchProject={fetchProject}
            fetchMilestone={fetchMilestone}
          />
        </Box>
      </Stack>
    </>
  );
}
