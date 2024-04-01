import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  Add,
  ArrowBackIos,
  Delete,
  Folder,
  MoreVert,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";
import TableLoader from "../../../../components/utils/TableLoader";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";
import ProjectLoader from "../../../../components/utils/ProjectLoader";

import InviteProjecteModal from "../../../../components/projectManagers/InviteProjectModal";

export default function CompletedTaskMembers() {
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
  const { projectId } = useParams();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetchProject();
  }, []);
  const refresh = () => {
    fetchProject();
  };
  const fetchProject = () => {
    setLoading(true);
    axios
      .get(`/api/projects/${projectId}/${user?._id}/completed`)
      .then((response) => {
        setProject(response.data.project);
        setLoading(false);
      });
  };

  const [openInvite, setOpenInvite] = useState(false);

  const setTeamRole = (e, userId) => {
    e.preventDefault();
    setLoading(true);
    const { value } = e.target;

    axios
      .get(`/api/projects/${projectId}/team/${userId}/${value}`)
      .then((response) => {
        fetchProject();
        setLoading(false);
      });
  };

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
              {`${project?.name} > Team Members`}
            </Text>
          </Box>
        )}
      </Box>

      <Box mb={3} display="flex" justifyContent="flex-end">
        {/* <Button
          variant="contained"
          onClick={() => setOpenInvite(true)}
          startIcon={<Add />}
          sx={{ borderRadius: "10px" }}
        >
          Add Team Member
        </Button> */}
      </Box>

      <Box>
        <Box
          bgcolor="#fff"
          borderRadius="4px"
          mb={4}
          sx={{
            overflowX: "auto", // Enable horizontal scrolling
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
                    "Team Member",
                    "Role",
                    "Time Zone",
                    "Contact Number",
                    "Email",
                    "Project Speciality Class",
                    "Reminder Preference",
                  ].map((table, _index) => (
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        fontSize: "18px",
                        color: "#262626",
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
                          {Array(8)
                            .fill("")
                            .map((item, i) => (
                              <TableCell key={i}>
                                <TableLoader h="40px" />
                              </TableCell>
                            ))}
                        </TableRow>
                      ))
                  : project?.team?.map((team, index) => (
                      <TableRow
                        key={team._id}
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
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {team.userId.fullName}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <FormControl fullWidth>
                            <Select
                              sx={{
                                backgroundColor: "#F5F5F5",
                                border: "none",
                              }}
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={team.role}
                              onChange={(e) => setTeamRole(e, team.userId._id)}
                            >
                              <MenuItem value="project manager">
                                project manager
                              </MenuItem>
                              <MenuItem value="team member">
                                team member
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {team?.userId?.timeZone}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {team?.userId?.phone}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {team?.userId?.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {team.projectSpecialityClass}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <FormControl fullWidth>
                            <Select
                              sx={{
                                backgroundColor: "#F5F5F5",
                                border: "none",
                              }}
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={team.reminderPreference}
                            >
                              <MenuItem value="email">Email</MenuItem>
                              <MenuItem value="text">Text</MenuItem>
                              <MenuItem value="text_email">
                                Email & Text
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3}>
            {!loading && !project?.team?.length > 0 && (
              <Text
                fw="600"
                fs="16px"
                color="#000"
                sx={{ textAlign: "center" }}
              >
                No Member on this Project
              </Text>
            )}
          </Box>
        </Box>
      </Box>
      <InviteProjecteModal
        open={openInvite}
        setOpen={setOpenInvite}
        refresh={refresh}
        project={project}
      />
    </>
  );
}
