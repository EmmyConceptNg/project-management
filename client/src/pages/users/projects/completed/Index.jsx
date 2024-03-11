import { Avatar, AvatarGroup, Box, Container, Divider, Grid, IconButton, LinearProgress, Popover, Stack } from '@mui/material'
import Text from '../../../../components/utils/Text';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../api/axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function Completed() {
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

   const navigate = useNavigate()
   const [pageLoading, setPageLoading] = useState(true)

  const [projects, setProjects] = useState([]);

  const workspace = useSelector((state) => state.workspace);

  useEffect(() => {
    setPageLoading(true);
    axios.get(`/api/projects/${workspace?._id}/completed`).then((response) => {
      setProjects(response.data.projects);
      setPageLoading(false);
    });
  }, [workspace]);
  return (
    <>
      <Box
        borderBottom="1px solid #D9D9D9 "
        mb={5}
        display="flex"
        alignItems="center"
      >
        <Box>
          <Text fw="600" fs="22px" sx={{ marginBottom: "20px" }}>
            Completed Projects
          </Text>
        </Box>
      </Box>
      <Box>
        <Grid
          container
          spacing={{ md: 2, lg: 2, sm: 1, xs: 1 }}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="stretch"
        >
          {projects.map((item, index) => (
            <Grid
              item
              md={4}
              lg={4}
              sm={6}
              xs={12}
              key={index}
              onClick={() => {
                navigate(item._id);
              }}
            >
              <Box
                bgcolor="#fff"
                border="1px solid #D9D9D9"
                borderRadius="8px"
                height="264px"
                px={2}
                py={1.5}
                sx={{
                  "&:hover": { border: "2px solid #1166EA" },
                  cursor: "pointer",
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Text fw="500" fs="18px" color="#1a1a1a">
                    {item.name}
                  </Text>
                  <IconButton onClick={(event) => handleClick(event, index)}>
                    <MoreVert />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open && selectedIndex === index}
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
                          navigate(item._id);
                        }}
                      >
                        Open
                      </Text>
                      <Divider sx={{ my: 1 }} />
                      <Text
                        fw="500"
                        fs="18px"
                        color="#1a1a1a"
                        sx={{ cursor: "pointer" }}
                      >
                        Mark Complete
                      </Text>
                    </Box>
                  </Popover>
                </Stack>
                <Box>
                  <Text fw="500" fs="12px" color="#1a1a1a">
                    Project Owner: {item.owner.fullName}
                  </Text>
                  <Text fw="500" fs="12px" color="#1a1a1a">
                    Project Manager: {item?.manager}
                  </Text>
                </Box>
                <Box my={2}>
                  <Stack direction="row" spacing={5}>
                    <Box>
                      <Text fw="500" fs="12px" color="#1a1a1a">
                        Start Date
                      </Text>
                      <Text fw="500" fs="14px" color="#1a1a1a">
                        {moment(item.startDate).format("MMM Do YYYY")}
                      </Text>
                    </Box>
                    <Box>
                      <Text fw="500" fs="12px" color="#1a1a1a">
                        End Date
                      </Text>
                      <Text fw="500" fs="14px" color="#1a1a1a">
                        {moment(item.endDate).format("MMM Do YYYY")}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  bgcolor="#E5FFE0"
                  borderRadius="4px"
                  px="4px"
                  py="10px"
                  width="73px"
                  display="flex"
                  justifyContent="center"
                  alignItems="space-between"
                >
                  <Text fw="500" fs="10px" color="#18A800">
                    Completed
                  </Text>
                </Box>
                <Box my={1}>
                  <Text fw="500" fs="12px" color="#1a1a1a">
                    {`${item.team.length} Team Members`}
                  </Text>
                  <Box display="flex" mt="2px">
                    <AvatarGroup alignItems="flex-start">
                      {item.team.map((member) => (
                        <Avatar
                          key={member?._id}
                          sx={{ width: "24px", height: "24px" }}
                          alt={member?.fullName || member?.userEmail}
                          src="/static/images/avatar/1.jpg"
                        />
                      ))}
                    </AvatarGroup>
                  </Box>
                </Box>
                <Box>
                  <Text fw="500" fs="10px" color="#1a1a1a"> 
                    {`Marked Complete By ${item.updatedBy ?? ""}: ${moment(
                      item.updatedAt
                    ).format("MMM Do YYYY")}`}
                  </Text>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
