import { Avatar, AvatarGroup, Box, Container, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Popover, Stack } from '@mui/material'
import Text from '../../../../components/utils/Text';
import { ArrowBackIos, Delete, Folder, MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function OngoingView() {
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
        mt={3}
        ml={7}
        borderBottom="1px solid #D9D9D9 "
        display="flex"
        alignItems="center"
      >
        <Box mb={3}>
          <Text fw="600" fs="22px">
            Project Alpha
          </Text>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={3}>
        <List
          sx={{
            border: "1px solid #D9D9D9",
            width: "730px",
            borderRadius: "8px",
          }}
        >
          {[
            { name: "Project Details", icon: "uil:file-alt", link: "details" },
            {
              name: "Task Breakdown",
              icon: "uil:game-structure",
              link: "breakdown",
            },
            { name: "Team Members", icon: "uil:users-alt", link: "members" },
            { name: "Gantt Chart", icon: "uil:chart-bar-alt", link: "chart" },
          ].map((item, index) => (
            <>
              <ListItem
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#F2F2F2" },
                }}
                onClick={() => navigate(item.link)}
                key={index}
                secondaryAction={
                  <Icon icon="uil:angle-right" fontSize="24px" />
                }
              >
                <ListItemAvatar>
                  <Icon icon={item.icon} fontSize="24px" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Text fs="18px" fw="500" sx={{ cursor: "pointer" }}>
                      {item.name}
                    </Text>
                  }
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </>
  );
}
