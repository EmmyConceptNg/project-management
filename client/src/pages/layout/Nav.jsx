import { Icon } from "@iconify/react";
import { Avatar, Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Text from "../../components/utils/Text";
import { EditOutlined, Logout, PersonAdd, PersonOutlined, Settings } from "@mui/icons-material";
import Caret from "../../components/layout/Caret";
import Notification from "../../components/layout/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../api/axios";

export default function Nav(){
  const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const user = useSelector((state) => state.user);
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const handleLogout = () =>{
      dispatch({type : 'LOGOUT' })
      navigate('/login')
    }
    return (
      <>
        <Box display={{ xs: "none", sm: "flex" }} alignItems="center">
          <Notification />
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar onClick={handleClick}
                alt={user.fullName}
                sx={{ width: "40px", height: "40px" }}
                src={
                  user?.image
                    ? getImageUrl(user?.image)
                    : "/assets/icons/ai-avatar.svg"
                }
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
              <Text ml={2} fw="600" fs="24px" color="#1A1A1A">
                {user?.fullName ?? ""}
              </Text>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/dashboard/profile");
            }}
          >
            <ListItemIcon>
              <PersonOutlined fontSize="small" />
            </ListItemIcon>
            View my Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
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