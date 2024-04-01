import {
  
  Box,
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

export default function MilestoneTable({ project, loading, fetchProject, milestones, fetchMilestone }) {
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
      fetchProject();
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
                    "Milestone",
                    "Tasks",
                    "Owner",
                    "Start Date",
                    "% Complete",
                    "End Date",
                    "On / Off Track",
                    "% Ahead/ Behind Schedule",
                    "Notes",
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
                  : milestones?.map((milestone, index) => (
                      <TableRow
                        onClick={() =>
                          navigate(
                            `/dashboard/projects/ongoing/${milestone?._id}/breakdown`
                          )
                        }
                        key={milestone._id}
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
                            textAlign: "left",
                          }}
                        >
                          {milestone.name}
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
                          {milestone?.taskCount ?? "-"}
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
                          {milestone?.owner?.fullName}
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
                          {moment(milestone.startDate).format("MMM Do YYYY")}
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
                              milestone?.status === "off track"
                                ? "#FFF3F3"
                                : "#E9FFE5"
                            }
                          >
                            {`${milestone.complete}%` ?? "-"}
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
                          {moment(milestone.endDate).format("MMM Do YYYY")}
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
                              milestone?.status === "off track"
                                ? "#FFF3F3"
                                : "#E9FFE5"
                            }
                          >
                            {milestone.status}
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
                              milestone?.status === "off track"
                                ? "#FFF3F3"
                                : "#E9FFE5"
                            }
                          >
                            {`${milestone.schedule}%` ?? "-"}
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
                          {parse(milestone.notes) ?? "-"}
                        </TableCell>
                        
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3}>
            {!loading && !milestones?.length > 0 && (
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
    </>
  );
}
