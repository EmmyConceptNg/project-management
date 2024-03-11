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

import { Add, ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";
import TableLoader from "../../../../components/utils/TableLoader";

export default function TaskMembers() {
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
  const [tasks, setTasks] = useState([
    {
      teamMember: "Rhiannon Silva",
      role: "Team Member",
      timeZone: "EST",
      contactNumber: "+1 309 1234 567",
      email: "rihannons@gmail.com",
      projectSpecialityClass: "Contributor",
      reminderPreference: "email",
    },
    {
      teamMember: "Hayden Kirby",
      role: "Team Member & Stakeholder",
      timeZone: "EST",
      contactNumber: "+1 309 1234 567",
      email: "haydenkirby@gmail.com",
      projectSpecialityClass: "Milestone Owner",
      reminderPreference: "text",
    },
    {
      teamMember: "Hayden Kirby",
      role: "Team Member & Stakeholder",
      timeZone: "EST",
      contactNumber: "+1 309 1234 567",
      email: "haydenkirby@gmail.com",
      projectSpecialityClass: "Milestone Owner",
      reminderPreference: "text_email",
    },
    {
      teamMember: "Hayden Kirby",
      role: "Stakeholder",
      timeZone: "EST",
      contactNumber: "+1 309 1234 567",
      email: "haydenkirby@gmail.com",
      projectSpecialityClass: "Milestone Owner",
      reminderPreference: "text",
    },
    {
      teamMember: "Hayden Kirby",
      role: "PM/Admin",
      timeZone: "EST",
      contactNumber: "+1 309 1234 567",
      email: "haydenkirby@gmail.com",
      projectSpecialityClass: "Milestone Owner",
      reminderPreference: "text_email",
    },
  ]);


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
        <Box mb={3} ml={7}>
          <Text fw="600" fs="22px">
            {`Project Alpha > Project Details`}
          </Text>
        </Box>
      </Box>

      <Box mb={3} display="flex" justifyContent="flex-end">
<Button variant="contained" startIcon={<Add />} sx={{ borderRadius : '10px' }}>Add Team Member</Button>
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
                  : tasks.map((task, index) => (
                      <TableRow 
                        key={task._id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          cursor: "pointer",
                          '&:hover' : {backgroundColor : '#F5F5F5'}
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
                          {task.teamMember}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.role}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.timeZone}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.contactNumber}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.projectSpecialityClass}
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
                              sx={{ backgroundColor: "#F5F5F5", border: 'none' }}
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={task.reminderPreference}
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
            {!loading && !tasks?.length > 0 && (
              <Text
                fw="600"
                fs="16px"
                color="#000"
                sx={{ textAlign: "center" }}
              >
                No Subscription Available
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
