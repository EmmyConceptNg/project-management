import { Icon } from "@iconify/react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Text from "../../components/utils/Text";
import {
  EditOutlined,
  Logout,
  PersonAdd,
  PersonOutlined,
  Settings,
} from "@mui/icons-material";

export default function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box display={{ md: "flex", xs: "none" }} alignItems="center">
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label="show 3 new notifications"
          color="inherit"
        >
          <Badge badgeContent={3} color="error">
            <Icon
              icon="clarity:notification-line"
              style={{ fontSize: "24px", color: "#1A1A1A" }}
            />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ minWidth: "480px" }}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  onClick={handleClick}
                  sx={{ minWidth: "44px", minHeight: "44px" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary="Task completed by Ashely David"
                secondary="2 sec ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  onClick={handleClick}
                  sx={{ minWidth: "44px", minHeight: "44px" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary="Maya’s is lagging behind."
                secondary="2d ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  onClick={handleClick}
                  sx={{ minWidth: "44px", minHeight: "44px" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary="10% off on premium subscription"
                secondary="2 mins ago"
              />
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Menu>
    </>
  );
}
