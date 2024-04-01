import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Text from "../../components/utils/Text";
import TableLoader from "../../components/utils/TableLoader";
import { AddTaskSharp } from "@mui/icons-material";
import moment from "moment";
import Graph from "../../components/Graph";
import axios from "../../api/axios";
import { useSelector } from "react-redux";

export const Dashboard = () =>{
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
  ]);


  

  useEffect(() =>{
    setLoading(true);
    axios.get(`/api/dashboard/${user?._id}`).then((response) => {
      setDash({
        ...dash,
        ongoingProjects: response.data.ongoingProject,
        ongoingTasks: response.data.ongoingTasks,
        completedTasks: response.data.completedTasks,
        pendingTasks: response.data.pendingTasks,
      });

      setTasks(response.data.tasksForToday);
      setLoading(false)
    })
  },[user])


    const [dash, setDash] = useState({
      ongoingProjects: 0,
      ongoingTasks: 0,
      completedTasks : 0,
      pendingTasks : 0
    });



    return (
      <>
        <Box>
          <Grid container spacing={3}>
            {[
              {
                icon: "material-symbols:account-balance-wallet",
                color: "#744BAB",
                name: "Total Ongoing Projects",
                count: `${dash.ongoingProjects}`,
              },
              {
                icon: "material-symbols:account-balance-wallet",
                color: "#FFB849",
                name: "Total Ongoing Tasks",
                count: `${dash.ongoingTasks}`,
              },
              {
                icon: "material-symbols:account-balance-wallet",
                color: "#FA5A7D",
                name: "Total Completed Tasks",
                count: `${dash.completedTasks}`,
              },
              {
                icon: "material-symbols:account-balance-wallet",
                color: "#9181DB",
                name: "Total Pending Tasks",
                count: `${dash.pendingTasks}`,
              },
            ].map((item, index) => (
              <Grid item md={3} lg={3} sm={6} xs={12} key={index}>
                <Box
                  bgcolor="#fff"
                  border="1px solid #D9D9D9"
                  borderRadius="10px"
                  height="120px"
                  width={{ lg: "100%", md: "100%", sm: "100%", xs: "100%" }}
                  px={3}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  py={2}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Text
                      my="auto"
                      fs="16px"
                      fw="500"
                      color="#000"
                      sx={{ textAlign: "left" }}
                    >
                      {item.name}
                    </Text>
                  </Box>
                  <Text
                    fs="24px"
                    fw="600"
                    color="#000"
                    sx={{ textAlign: "left" }}
                  >
                    {item.count}
                  </Text>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box my={4}>
            <Text fw="500" fs="24px" color="#000">
              Task for Today
            </Text>
          </Box>
          <Box>
            <Box
              bgcolor="#fff"
              borderRadius="4px"
              border="1px solid #D9D9D9"
              mb={4}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "#F5F5F5" }}>
                      {["Project", "Task", "Team Member", "Status"].map(
                        (table, _index) => (
                          <TableCell
                            sx={{
                              fontWeight: "600",
                              fontSize: "18px",
                              color: "#262626",
                            }}
                            key={_index}
                          >
                            {table}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading
                      ? Array(4)
                          .fill("")
                          .map((item, i) => (
                            <TableRow key={i}>
                              {Array(4)
                                .fill("")
                                .map((item, i) => (
                                  <TableCell key={i}>
                                    <TableLoader h="40px" />
                                  </TableCell>
                                ))}
                            </TableRow>
                          ))
                      : tasks.map(({task, milestone}, index) => (
                          <TableRow
                            key={task._id}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              cursor: "pointer",
                            }}
                          >
                            <TableCell
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#262626",
                              }}
                            >
                              {milestone?.name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#262626",
                              }}
                            >
                              {task.name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#262626",
                              }}
                            >
                              {task?.team?.fullName}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color:
                                  task?.status === "completed"
                                    ? "#18A800"
                                    : "#FF8A00",
                              }}
                            >
                              <Box
                                bgcolor={
                                  task?.status === "completed"
                                    ? "#E5FFE0"
                                    : "#FFE9CF"
                                }
                                width="90px"
                                height="31px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="4px"
                              >
                                {task?.status}
                              </Box>
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
                    No Task for Today
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
          <Box border="1px solid #D9D9D9" borderRadius="4px" p={2}>
            <Box mt={4}>
              <Text fw="500" fs="16px" color="#000">
                Ongoing Project Progress
              </Text>
            </Box>
            <Box display="flex" width="100%">
              <Graph />
            </Box>
          </Box>
        </Box>
      </>
    );
}