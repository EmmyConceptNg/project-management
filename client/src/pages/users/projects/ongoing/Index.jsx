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
  Popover,
  Stack,
} from "@mui/material";
import Text from "../../../../components/utils/Text";
import { Add, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "../../../../components/projectManagers/EditTaskModal";
import EditAccessModal from "../../../../components/projectManagers/EditAccessModal";
import InviteModal from "../../../../components/projectManagers/InviteModal";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import CreateProjectModal from "../../../../components/modal/CreateProjectModal";
import ProjectLoader from "../../../../components/utils/ProjectLoader";
import InviteProjecteModal from "../../../../components/projectManagers/InviteProjectModal";

export default function Ongoing() {
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

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [openAccessModal, setOpenAccessModal] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState(null);

  const markComplete = (projectId) => {
    setPageLoading(true);
    axios.get(`/api/projects/${projectId}/update-status/completed`).then(() => {
      const updatedProjects = projects.filter(
        (project) => project._id !== projectId
      );
      setProjects(updatedProjects);
      setPageLoading(false);
    });
  };

  const handleEditTask = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
    handleClose();
  };
  const handleInvitePeople = (project) => {
    setSelectedProject(project);
    setOpenInvite(true);
    handleClose();
  };
  const handleEditTaskAccess = () => {
    setOpenAccessModal(true);
  };

  const workspace = useSelector((state) => state.workspace);

  useEffect(() => {
    getProject();
  }, [workspace, setProjects]);

  const getProject = () => {
    console.log('dd');
    setPageLoading(true);
    axios.get(`/api/projects/${workspace?._id}/ongoing`).then((response) => {
      setProjects(response.data.projects);
      setPageLoading(false);
    });
  };

  return (
    <>
      <Box
        borderBottom="1px solid #D9D9D9 "
        mb={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text fw="600" fs="22px" sx={{ marginBottom: "20px" }}>
            Ongoing Projects
          </Text>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => setOpenCreateModal(true)}
            startIcon={<Add />}
            sx={{ borderRadius: "10px", marginBottom: "20px" }}
          >
            Create New Project
          </Button>
        </Box>
      </Box>
      <Box>
        <Grid
          container
          spacing={{ md: 2, lg: 2, sm: 1, xs: 1 }}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="stretch"
        >
          {pageLoading &&
            Array(20)
              .fill()
              .map((arr, index) => (
                <Grid item md={4} lg={4} sm={6} xs={12} key={index}>
                  <ProjectLoader sx={{ height: "264px" }} />
                </Grid>
              ))}
          {!pageLoading &&
            projects.map((item) => (
              <Grid item md={4} lg={4} sm={6} xs={12} key={item._id}>
                <Box
                  bgcolor="#fff"
                  border="1px solid #D9D9D9"
                  borderRadius="8px"
                  height="264px"
                  px={2}
                  py={1.5}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Text fw="500" fs="18px" color="#1a1a1a">
                      {item?.name}
                    </Text>
                    <IconButton
                      onClick={(event) => handleClick(event, item._id)}
                    >
                      <MoreVert />
                    </IconButton>
                    <Popover
                      id={id}
                      open={open && selectedIndex === item._id}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Box p={2}>
                        <Text
                          fw="500"
                          fs="18px"
                          color="#1a1a1a"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`${item._id}`);
                          }}
                        >
                          View Project
                        </Text>

                        <Divider sx={{ my: 1 }} />
                        <Text
                          fw="500"
                          fs="18px"
                          color="#1a1a1a"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`${item._id}/edit-project`);
                          }}
                        >
                          Edit Project
                        </Text>
                        <Divider sx={{ my: 1 }} />
                        <Text
                          fw="500"
                          fs="18px"
                          color="#1a1a1a"
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleEditTask(item)}
                        >
                          Rename Project
                        </Text>

                        <Divider sx={{ my: 1 }} />
                        <Text
                          fw="500"
                          fs="18px"
                          color="#1a1a1a"
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleInvitePeople(item)}
                        >
                          Invite People
                        </Text>
                        <Divider sx={{ my: 1 }} />
                        <Text
                          fw="500"
                          fs="18px"
                          color="#1a1a1a"
                          sx={{ cursor: "pointer" }}
                          onClick={() => markComplete(item._id)}
                        >
                          Mark Complete
                        </Text>
                      </Box>
                    </Popover>
                  </Stack>
                  <Box>
                    <Text fw="500" fs="12px" color="#1a1a1a">
                      Project Owner: {item.owner.fullName}
                    </Text>
                    <Text fw="500" fs="12px" color="#1a1a1a">
                      Project Manager: {item.manager}
                    </Text>
                  </Box>
                  <Box my={2}>
                    <Stack direction="row" spacing={5}>
                      <Box>
                        <Text fw="500" fs="12px" color="#1a1a1a">
                          Start Date
                        </Text>
                        <Text fw="500" fs="14px" color="#1a1a1a">
                          {moment(item.startDate).format("MMM Do YYYY")}
                        </Text>
                      </Box>
                      <Box>
                        <Text fw="500" fs="12px" color="#1a1a1a">
                          End Date
                        </Text>
                        <Text fw="500" fs="14px" color="#1a1a1a">
                          {moment(item.endDate).format("MMM Do YYYY")}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                  <Box>
                    <LinearProgress
                      color="success"
                      variant="determinate"
                      value={item.progress}
                    />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mt="4px"
                    >
                      <Text fw="500" fs="10px" color="#1a1a1a">
                        Progress
                      </Text>
                      <Text fw="500" fs="10px" color="#1a1a1a">
                        {`${item.progress}%`}
                      </Text>
                    </Stack>
                  </Box>
                  <Box my={1}>
                    <Text fw="500" fs="12px" color="#1a1a1a">
                      {`${item.team.length} Team Members`}
                    </Text>
                    <Box display="flex" mt="2px">
                      <AvatarGroup alignItems="flex-start">
                        {item.team.map((member) => (
                          <Avatar
                            key={member?._id}
                            sx={{ width: "24px", height: "24px" }}
                            alt={member?.fullName || member?.userEmail}
                            src="/static/images/avatar/1.jpg"
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </Box>
                  <Box>
                    <Text fw="500" fs="10px" color="#1a1a1a">
                      {`Last Updated By ${item.updatedBy ?? ""}: ${moment(
                        item.updatedAt
                      ).format("MMM Do YYYY")}`}
                    </Text>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
        {!projects.length && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fw="600"
              fs="22px"
              sx={{ marginBottom: "20px", textAlign: "center" }}
            >
              No ongoing project on this workspace.
            </Text>
            <Button
              variant="contained"
              sx={{ width: "300px" }}
              onClick={() => setOpenCreateModal(true)}
            >
              Create Project
            </Button>
          </Box>
        )}
      </Box>
      <EditTaskModal
        open={openModal}
        setOpen={setOpenModal}
        project={selectedProject}
        refresh={getProject}
      />
      <EditAccessModal open={openAccessModal} setOpen={setOpenAccessModal} />
      <InviteProjecteModal
        open={openInvite}
        setOpen={setOpenInvite}
        project={selectedProject}
        refresh={getProject}
      />
      <CreateProjectModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        refresh={getProject}
      />
    </>
  );
}
