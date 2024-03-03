import { Icon } from "@iconify/react";
import { Avatar, Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Text from "../../components/utils/Text";
import { EditOutlined, Logout, PersonAdd, PersonOutlined, Settings } from "@mui/icons-material";
import Caret from "../../components/layout/Caret";
import Notification from "../../components/layout/Notification";

export default function Nav(){
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
        <Box display={{  xs: "none", sm: 'flex' }} alignItems="center">
          <Notification />
          <Box display="flex" alignItems="center" >
            <IconButton
             
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                onClick={handleClick}
                sx={{ width: "40px", height: "40px" }}
              />
            </IconButton>
            
            <Caret />
            
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{ p: 3 }}
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
          <MenuItem>
            <Box>
              <Text ml={2} fw="500" fs="14px" color="#595959">
                Stakeholder
              </Text>
              <Text ml={2} fw="600" fs="24px" color="#1A1A1A">
                John Doe
              </Text>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonOutlined fontSize="small" />
            </ListItemIcon>
            View my Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditOutlined fontSize="small" />
            </ListItemIcon>
            Edit My Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Icon
                style={{ fontSize: "20px", color: "#1A1A1A" }}
                icon="material-symbols-light:mode-off-on"
              />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
}