import {
  Avatar,
  AvatarGroup,
  Box,
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

import { ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";
import TableLoader from "../../../../components/utils/TableLoader";

export default function CompletedTaskBreakdownChart() {
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
      milestone: "ENT AM Role",
      owner: "Mike",
      start: "5 / 1 / 2023",
      percentComplete: "66%",
      end: "5 / 1 / 2023",
      status: "on_track",
      completed: "50px",
    },
    {
      milestone: "QBR - Data & Analytics: KPI’s on service utilization",
      owner: "Mike",
      start: "5 / 1 / 2023",
      percentComplete: "66%",
      end: "5 / 1 / 2023",
      status: "off_track",
      completed: "5000px",
    },
    {
      milestone: "ENT AM Role",
      owner: "Mike",
      start: "5 / 1 / 2023",
      percentComplete: "66%",
      end: "5 / 1 / 2023",
      status: "on_track",
      completed: "50px",
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
        <Box mb={3} ml={7}>
          <Text fw="600" fs="22px">
            {`Project Alpha > Gantt Chart`}
          </Text>
        </Box>
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
                    "Milestone",
                    "Owner",
                    "Start",
                    "Percent Complete",
                    "End",
                    "Status",
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

                  {/* Integrate split header after "Status" column */}
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      fontSize: "18px",
                      color: "#262626",
                      textAlign: "center",
                      p: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderLeft: "1px solid #D9D9D9",
                        borderRight: "1px solid #D9D9D9",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {Array.from({ length: 2 }, (_, i) => (
                        <div key={`year-${i}`} style={{ textAlign: "center" }}>
                          {2022 + i}
                          <div
                            style={{
                              display: "flex",
                              backgroundColor: "#fff",
                              paddingLeft: 0,
                            }}
                          >
                            {Array.from({ length: 12 }, (_, j) => {
                              const startDate = j * 7 + 1;
                              const monthStart = new Date(2013 + i, j, 1);
                              const monthEnd = new Date(2013 + i, j + 1, 0);
                              const endDate = monthEnd.getDate();
                              const monthAbbreviation =
                                monthStart.toLocaleString("default", {
                                  month: "short",
                                });
                              const weeks = [];
                              let weekStart = 1; // Reset week start to 1 for each month
                              while (weekStart <= endDate) {
                                const weekEnd = Math.min(
                                  weekStart + 6,
                                  endDate
                                );
                                weeks.push(
                                  `${weekStart}-${weekEnd} ${monthAbbreviation}`
                                );
                                weekStart = weekEnd + 1;
                              }
                              return (
                                <div
                                  key={`weeks-${i}-${j}`}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {weeks.map((week, index) => (
                                      <div
                                        key={`week-${j}-${index}`}
                                        style={{
                                          border: "1px solid #ccc",
                                          padding: "5px",
                                        }}
                                      >
                                        {week}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
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
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#262626",
                            whiteSpace: "nowrap",
                            textAlign: task.milestone ? "left" : "center",
                          }}
                        >
                          {task.milestone}
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
                          {task.owner}
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
                          {task.start}
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
                          {task.percentComplete}
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
                          {task.end}
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
                          <Select
                            variant="standard"
                            sx={{
                              backgroundColor:
                                task.status === "off_track"
                                  ? "#FFF3F3"
                                  : "#E9FFE5",
                              color:
                                task.status === "off_track"
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
                            <MenuItem value="on_track">On Track</MenuItem>
                            <MenuItem value="off_track">Off Track</MenuItem>
                            <MenuItem value="on_track">On Track</MenuItem>
                          </Select>
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
                          <div
                            style={{
                              width: task.completed,
                              height: "38px",
                              backgroundColor: "#70BAFF",
                            }}
                          ></div>
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
