import { Box, IconButton } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Text from "../../../../components/utils/Text";
import moment from "moment";

import axios from "../../../../api/axios";
import GanttChartComponent from "./Gantt";
import { ArrowBackIos } from "@mui/icons-material";
import ProjectLoader from "../../../../components/utils/ProjectLoader";
import { useSelector } from "react-redux";

export default function TaskBreakdownChart() {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [milestones, setMilestones] = useState([]);
  const [project, setProject] = useState({});

  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();

  const fetchMilestone = () => {
    setLoading(true);
    axios.get(`/api/milestones/${projectId}`).then((response) => {
      setMilestones(response.data.milestones);
      setLoading(false);
    });
  };

  const fetchProject = () => {
    setLoading(true);
    axios
      .get(`/api/projects/${projectId}/${user?._id}/ongoing`)
      .then((response) => {
        setProject(response.data.project);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProject();
    fetchMilestone();
  }, []);

  const navigate = useNavigate();

  const transformTasksForGantt = (tasks) =>
    tasks
      .map((task) => {
        if (!task.startDate || !task.endDate) {
          console.error("Task has missing start or end date:", task);
          return null;
        }

        const startDate = moment(task.startDate, "YYYY, M, D").toDate();
        const endDate = moment(task.endDate, "YYYY, M, D").toDate();

        console.log(endDate);
        console.log(task.complete);

        return {
          start: startDate,
          end: endDate,
          name: task.name,
          id: `Task ${task._id}`,
          type: "task",
          progress: task.complete,
          styles: {
            progressColor: "#ffbb54",
            progressSelectedColor: "#ff9e0d",
          },
        };
      })
      .filter((task) => task !== null); // Filter out tasks with invalid dates

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
        {loading ? (
          <ProjectLoader sx={{ height: "50px" }} />
        ) : (
          <Box mb={3} ml={7}>
            <Text fw="600" fs="22px">
              {`${project?.name} > Gantt Chart`}
            </Text>
          </Box>
        )}
      </Box>
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
          {!loading
            ? milestones.map((milestone) => (
                <GanttChartComponent
                  key={milestone._id}
                  tasks={transformTasksForGantt(milestone.tasks || [])}
                />
              ))
            : Array(5)
                .fill()
                .map((item) => <ProjectLoader key={item} sx={{ height: "50px" }} />)}

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
