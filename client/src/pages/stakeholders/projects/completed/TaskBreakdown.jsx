import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";

import { ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";

export default function CompletedTaskBreakdown() {
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



  const [tasks, setTasks] = useState([
    {
      name: "Development of Setting Feature",
      status: "Not Started",
      count: 18,
    },
    {
      name: "Development of Notification Feature",
      status: "In Progress",
      count: 10,
    },
    {
      name: "Development of Profile Setup & Edit Feature",
      status: "Completed",
      count: 11,
    },
  ]);

  const [projects, setProjects] = useState([
    {
      name: "Project Alpha",
      owner: "Jack Johnson",
      manager: "Alex Jacob",
      startDate: "Nov 20, 2023",
      endDate: "Dec 28, 2023",
      progress: 78,
      members: ["", "", "", ""],
      updatedAt: "Nov 29,2023",
      updatedBy: "Alex",
    },
    {
      name: "Project Alpha",
      owner: "Jack Johnson",
      manager: "Alex Jacob",
      startDate: "Nov 20, 2023",
      endDate: "Dec 28, 2023",
      progress: 78,
      members: ["", "", "", ""],
      updatedAt: "Nov 29,2023",
      updatedBy: "Alex",
    },
    {
      name: "Project Alpha",
      owner: "Jack Johnson",
      manager: "Alex Jacob",
      startDate: "Nov 20, 2023",
      endDate: "Dec 28, 2023",
      progress: 78,
      members: ["", "", "", ""],
      updatedAt: "Nov 29,2023",
      updatedBy: "Alex",
    },
    {
      name: "Project Alpha",
      owner: "Jack Johnson",
      manager: "Alex Jacob",
      startDate: "Nov 20, 2023",
      endDate: "Dec 28, 2023",
      progress: 78,
      members: ["", "", "", ""],
      updatedAt: "Nov 29,2023",
      updatedBy: "Alex",
    },
    {
      name: "Project Alpha",
      owner: "Jack Johnson",
      manager: "Alex Jacob",
      startDate: "Nov 20, 2023",
      endDate: "Dec 28, 2023",
      progress: 78,
      members: ["", "", "", ""],
      updatedAt: "Nov 29,2023",
      updatedBy: "Alex",
    },
    {
      name: "Project Alpha",
      owner: "Jack Johnson",
      manager: "Alex Jacob",
      startDate: "Nov 20, 2023",
      endDate: "Dec 28, 2023",
      progress: 78,
      members: ["", "", "", ""],
      updatedAt: "Nov 29,2023",
      updatedBy: "Alex",
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
            {`Project Alpha > Project Details`}
          </Text>
        </Box>
      </Box>

      <Grid
        sx={{ mt: 5 }}
        container
        spacing={{ md: 4, lg: 4, sm: 1, xs: 1 }}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
      >
        {tasks.map((task, index) => (
          <>
            <Grid item md={4} lg={4} sm={6} xs={12}>
              <Box
                border="1px solid #D9D9D9"
                borderRadius="8px"
                mb={2}
                py={2}
                px={2}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fw="500" fs="18px" color="#1a1a1a">
                    {task.status}
                  </Text>
                  <Box bgcolor="#D4E5FF" borderRadius="4px" p={0.5}>
                    <Text fw="500" fs="14px" color="#1166EA">
                      {task.count}
                    </Text>
                  </Box>
                </Stack>
              </Box>
              <Stack spacing={2}>
                {projects.map((item, index) => (
                  <Box
                    onClick={() =>
                      navigate(
                        `/dashboard/projects/completed/1/members`
                      )
                    }
                    sx={{
                      cursor: "pointer",
                      "&:hover": { border: "2px solid #1166EA" },
                    }}
                    key={index}
                    bgcolor="#fff"
                    border="1px solid #D9D9D9"
                    borderRadius="8px"
                    height="200px"
                    px={2}
                    py={1.5}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mb={0.5}
                    >
                      <Text fw="500" fs="18px" color="#1a1a1a">
                        {task.name}
                      </Text>
                    </Stack>
                    <Box>
                      <Text fw="500" fs="12px" color="#1a1a1a">
                        Assigned By: {item.owner}
                      </Text>
                    </Box>
                    <Box my={2}>
                      <Stack direction="row" spacing={5}>
                        <Box>
                          <Text fw="500" fs="12px" color="#1a1a1a">
                            Start Date
                          </Text>
                          <Text fw="500" fs="14px" color="#1a1a1a">
                            {item.startDate}
                          </Text>
                        </Box>
                        <Box>
                          <Text fw="500" fs="12px" color="#1a1a1a">
                            End Date
                          </Text>
                          <Text fw="500" fs="14px" color="#1a1a1a">
                            {item.endDate}
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                    <Box>
                      <Text fw="500" fs="12px" color="#1a1a1a">
                        Assigned to Ammy, Ashley, Jocob and Edward
                      </Text>
                    </Box>
                    <Box my={2}>
                      <Box display="flex" mt="2px">
                        <AvatarGroup alignItems="flex-start">
                          <Avatar
                            sx={{ width: "18px", height: "18px" }}
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                          <Avatar
                            sx={{ width: "18px", height: "18px" }}
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                          />
                          <Avatar
                            sx={{ width: "18px", height: "18px" }}
                            alt="Agnes Walker"
                            src="/static/images/avatar/4.jpg"
                          />
                          <AvatarGroup
                            sx={{ width: "18px", height: "18px" }}
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                          />
                        </AvatarGroup>
                      </Box>
                    </Box>
                    <Box>
                      <Text fw="500" fs="10px" color="#1a1a1a">
                        {`Last Updated By ${item.updatedBy}: ${item.updatedAt}`}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}
