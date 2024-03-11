import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  Stack,
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
import Text from "../../../components/utils/Text";
import TableLoader from "../../../components/utils/TableLoader";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import InviteWorkspaceModal from "../../../components/projectManagers/InviteWorkspaceModal";

export default function WorkspaceMembers() {
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

  const [loading, setLoading] = useState(false);
  const [workspace, setWorkspace] = useState({});
  const [team, setTeam] = useState([]);
 const [openInvite, setOpenInvite] = useState(false)
  const {workspaceId} = useParams()
  

const refresh = () =>{
    getWorkspace()
}

  const getWorkspace = () =>{
    axios
      .get(`/api/workspace/get-workspace/${workspaceId}`)
      .then((response) => {
        setWorkspace(response.data.workspace);
        setTeam(response.data.team);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true)
    getWorkspace()
  }, [workspaceId]);

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
          <Text fw="600" fs="22px" sx={{ textTransform: "capitalize" }}>
            {`${workspace?.name} members`}
          </Text>
        </Box>
      </Box>

      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button
          onClick={() => setOpenInvite(true)}
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: "10px" }}
        >
          Add Team Member
        </Button>
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

                    "Time Zone",
                    "Contact Number",
                    "Email",
                    "Project Speciality Class",

                    "Status",
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
                  : team?.map((_team, index) => (
                      <TableRow
                        key={_team?._id}
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
                          {_team?.teamMember ?? '-'}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {_team?.timeZone ?? '-'}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {_team?.contactNumber ?? '-'}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {_team?.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {_team?.projectSpecialityClass ?? '-'}
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
                            sx={{
                              backgroundColor:
                                _team.status === "pending"
                                  ? "#FFF3F3"
                                  : "#E9FFE5",
                              color:
                                _team.status === "accepted"
                                  ? "#18A800"
                                  : "#D00000 ",
                              border: "none",
                              outline: "none",
                              borderRadius: "10px",
                              padding: 1,
                            }}
                          >

                          {_team?.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3}>
            {!loading && !team?.length > 0 && (
              <Text
                fw="600"
                fs="16px"
                color="#000"
                sx={{ textAlign: "center" }}
              >
                No members in this workspace
              </Text>
            )}
          </Box>
        </Box>
      </Box>
      <InviteWorkspaceModal
        open={openInvite}
        setOpen={setOpenInvite}
        refresh={refresh}
      />
    </>
  );
}
