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
  Menu,
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

import { ArrowBackIos, Delete, DeleteForever, Edit, Folder, MoreVert } from "@mui/icons-material";
import Text from "../../../../components/utils/Text";
import TableLoader from "../../../../components/utils/TableLoader";
import moment from "moment";
import parse from 'html-react-parser'
import axios from "../../../../api/axios";
import Swal from 'sweetalert2'
import { notify } from "../../../../utils/utils";

export default function TaskBreakdownTable({ milestone, loading, fetchMilestone, fetchTasks, tasks }) {
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

  const handleTaskStatus = (e, taskId) => {
    const payload = {
      status: e.target.value,
      taskId: taskId,
    };
    axios.post(`api/tasks/change-status`, payload).then(() => {
      fetchTasks();
    });
  };



  



  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axios
        .post(`/api/tasks/delete/${taskId}`)
        .then((response) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          notify(err?.response?.data?.error, "error");
        })
        .finally(() => {
          fetchTasks();
        });
      
    });
    
  };

  return (
    <>
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
                    "Task",
                    "assigned",
                    "Start Date",
                    "End Date",
                    "On / Off Track",
                    "Notes",
                    "Actions",
                  ].map((table, _index) => (
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        fontSize: "18px",
                        color: "#262626",
                        textAlign: table === "left",
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
                  : tasks?.map((task, index) => (
                      <TableRow
                        key={task._id}
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
                            textAlign: "lefft",
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
                            textAlign: "left"
                          }}
                        >
                          {task.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          {task?.team.fullName}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          {moment(task.startDate).format("MMM Do YYYY")}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          {moment(task.endDate).format("MMM Do YYYY")}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          <Select
                            onChange={(e) => handleTaskStatus(e, task._id)}
                            variant="standard"
                            sx={{
                              backgroundColor:
                                task.status === "not started"
                                  ? "#FFF3F3"
                                  : "#E9FFE5",
                              color:
                                task.status === "not started"
                                  ? "#D00000"
                                  : "#18A800",
                              border: "none",
                              outline: "none",
                              borderRadius: "10px",
                              padding: 1,
                              boxShadow: "none",
                              "&.Mui-focused": {
                                boxShadow: "none", // Removing the box shadow when focused
                              },
                            }}
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={task.status}
                          >
                            <MenuItem value="not started">Not Started</MenuItem>
                            <MenuItem value="ongoing">Ongoing</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="overdue">Overdue</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          {parse(task.description)}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: "left",
                          }}
                        >
                          <IconButton onClick={handleClick}>
                            <MoreVert />
                          </IconButton>
                          <Menu
                            elevation={0}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            id={id}
                          >
                            <Box
                              sx={{
                                border: "1px solid #c9c9c9",
                                borderRadius: "10px",
                              }}
                            >
                              <MenuItem onClick={handleClose}>
                                <Box
                                  display="flex"
                                  gap={1}
                                  sx={{ cursor: "pointer" }}
                                  onClick={() =>
                                    navigate(
                                      `/dashboard/projects/ongoing/${milestone?.projectId}/task/edit/${task._id}`
                                    )
                                  }
                                >
                                  <Edit
                                    sx={{ fontSize: "18px", color: "green" }}
                                  />
                                  <Text fw="400" fs="18px">
                                    Edit
                                  </Text>
                                </Box>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <Box display="flex" gap={1} sx={{cursor : 'pointer'}} onClick={() => handleDelete(task._id)}>
                                  <DeleteForever
                                    sx={{ fontSize: "18px", color: "red" }}
                                  />
                                  <Text fw="400" fs="18px">
                                    Delete
                                  </Text>
                                </Box>
                              </MenuItem>
                            </Box>
                          </Menu>
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
                No Task Available in this milestone
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
