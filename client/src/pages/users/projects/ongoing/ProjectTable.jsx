import {
  
  Box,
  Divider,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../../../components/utils/Text";
import TableLoader from "../../../../components/utils/TableLoader";
import moment from "moment";
import parse from 'html-react-parser'
import axios from "../../../../api/axios";
import GanttChartComponent from "./Gantt";
import { MoreVert } from "@mui/icons-material";
import EditTaskModal from "../../../../components/projectManagers/EditTaskModal";
import EditAccessModal from "../../../../components/projectManagers/EditAccessModal";
import InviteProjecteModal from "../../../../components/projectManagers/InviteProjectModal";
import CreateProjectModal from "../../../../components/modal/CreateProjectModal";

export default function ProjectTable({
  projects,
  loading,
  setLoading,
  setProjects,
  getProject,
}) {
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

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const markComplete = (projectId) => {
    setLoading(true);
    axios.get(`/api/projects/${projectId}/update-status/completed`).then(() => {
      const updatedProjects = projects.filter(
        (project) => project._id !== projectId
      );
      setProjects(updatedProjects);
      setLoading(false);
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

  return (
    <>
      <Box>
        <Box
          bgcolor="#fff"
          borderRadius="4px"
          mb={4}
          sx={{
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#F5F5F5" }}>
                  {[
                    "ID",
                    "Project Name",
                    "No. of Milestones",
                    "Owner",
                    "% Complete",
                    "On / Off Track",
                    "% Ahead/ Behind Schedule",
                    "Notes",
                    "Action",
                  ].map((table, _index) => (
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        fontSize: "18px",
                        color: "#262626",
                        textAlign: table === "Milestone" ? "left" : "center",
                      }}
                      key={_index}
                    >
                      {table}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading
                  ? Array(4)
                      .fill("")
                      .map((item, i) => (
                        <TableRow key={i}>
                          {Array(10)
                            .fill("")
                            .map((item, i) => (
                              <TableCell key={i}>
                                <TableLoader h="40px" />
                              </TableCell>
                            ))}
                        </TableRow>
                      ))
                  : projects?.map((project, index) => (
                      <TableRow
                        // onClick={() =>
                        //   navigate(
                        //     `/dashboard/projects/ongoing/${milestone?._id}/breakdown`
                        //   )
                        // }
                        key={project._id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#F5F5F5" },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          onDoubleClick={() => handleEditTask(project)}
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          {project.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {project?.taskCount ?? "-"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {project?.owner?.fullName}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            bgcolor={
                              project?.status === "off track"
                                ? "#FFF3F3"
                                : "#E9FFE5"
                            }
                          >
                            {`${project.complete}%` ?? "-"}
                          </Box>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            textTransform: "capitalize",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            bgcolor={
                              project?.status === "off track"
                                ? "#FFF3F3"
                                : "#E9FFE5"
                            }
                          >
                            {project.status}
                          </Box>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            bgcolor={
                              project?.status === "off track"
                                ? "#FFF3F3"
                                : "#E9FFE5"
                            }
                          >
                            {`${project.schedule}%` ?? "-"}
                          </Box>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {parse(project.description) ?? "-"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <IconButton
                            onClick={(event) => handleClick(event, project._id)}
                          >
                            <MoreVert />
                          </IconButton>
                          <Popover
                            id={id}
                            open={open && selectedIndex === project._id}
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
                                  navigate(`${project._id}`);
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
                                  navigate(`${project._id}/edit-project`);
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
                                onClick={() => handleEditTask(project)}
                              >
                                Rename Project
                              </Text>

                              <Divider sx={{ my: 1 }} />
                              <Text
                                fw="500"
                                fs="18px"
                                color="#1a1a1a"
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleInvitePeople(project)}
                              >
                                Invite People
                              </Text>
                              <Divider sx={{ my: 1 }} />
                              <Text
                                fw="500"
                                fs="18px"
                                color="#1a1a1a"
                                sx={{ cursor: "pointer" }}
                                onClick={() => markComplete(project._id)}
                              >
                                Mark Complete
                              </Text>
                            </Box>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3}>
            {!loading && !projects?.length > 0 && (
              <Text
                fw="600"
                fs="16px"
                color="#000"
                sx={{ textAlign: "center" }}
              >
                No Milestone Available in this project
              </Text>
            )}
          </Box>
        </Box>
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
