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
import { useSearchParams } from "react-router-dom";
import ProjectTable from "./ProjectTable";

export default function Ongoing() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if the 'create' query parameter is present and is equal to 'true'
    if (searchParams.get("create") === "true") {
      setOpenCreateModal(true);
    }

    // Other effect logic here
  }, [searchParams]);

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
            In Progress
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

        <ProjectTable
          
          projects={projects}
          setProjects={setProjects}
          loading={pageLoading}
          setLoading={setPageLoading}
          getProject={getProject}
          
        />
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
