import { Avatar, AvatarGroup, Box, Container, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Popover, Stack } from '@mui/material'
import Text from '../../../../components/utils/Text';
import { ArrowBackIos, Delete, Edit, Folder, MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import ProjectLoader from '../../../../components/utils/ProjectLoader';
import axios from '../../../../api/axios';
import { useSelector } from 'react-redux';
import EditTaskModal from '../../../../components/projectManagers/EditTaskModal';
export default function OngoingView() {
   const {projectId} = useParams()
const [project, setProject] = useState([])
   const [loading, setLoading] = useState(true)
   const user = useSelector(state => state.user );
   const [openModal, setOpenModal] = useState(false);
   const [selectedProject, setSelectedProject] = useState(null);

   const handleEditTask = (project) => {
     setSelectedProject(project);
     setOpenModal(true);
     handleClose();
   };

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

   const navigate = useNavigate()

    useEffect(() => {
      setLoading(true);
      axios
        .get(`/api/projects/${projectId}/${user?._id}/ongoing`)
        .then((response) => {
          setProject(response.data.project);
          setLoading(false);
        });
    }, []);

 
  return (
    <>
      <Box
        borderBottom="1px solid #D9D9D9 "
        mb={3}
        display="flex"
        alignItems="center"
      >
        <Box display={"flex"} gap={2} alignItems="center" sx={{ mb: "20px" }}>
          <IconButton
            sx={{ my: "auto" }}
            onClick={() => navigate("/dashboard/projects/ongoing")}
          >
            <ArrowBackIos sx={{ color: "#1A1A1A" }} />
          </IconButton>
          <Text fw="600" fs="22px">
            In Progress
          </Text>
        </Box>
      </Box>
      <Box
        mt={3}
        ml={7}
        borderBottom="1px solid #D9D9D9 "
        display="flex"
        alignItems="center"
      >
        {!loading ? (
          <Stack direction="row" spacing={2} alignItems="center"  mb={3}>
            <Text fw="600" fs="22px">
              {project?.name}
            </Text>

            <IconButton onClick={() => handleEditTask(project)}>
              <Edit />
            </IconButton>
          </Stack>
        ) : (
          <ProjectLoader sx={{ height: "50px" }} />
        )}
      </Box>

      <Box display="flex" justifyContent="center" mt={3}>
        <List
          sx={{
            border: "1px solid #D9D9D9",
            width: "730px",
            borderRadius: "8px",
          }}
        >
          {[
            { name: "Project Details", icon: "uil:file-alt", link: "details" },
            {
              name: "Milestones",
              icon: "uil:game-structure",
              link: "milestones",
            },
            // {
            //   name: "Task Breakdown",
            //   icon: "uil:game-structure",
            //   link: "breakdown",
            // },
            { name: "Team Members", icon: "uil:users-alt", link: "members" },
            { name: "Gantt Chart", icon: "uil:chart-bar-alt", link: "chart" },
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

      <EditTaskModal
        open={openModal}
        setOpen={setOpenModal}
        project={selectedProject}
      />
    </>
  );
}
