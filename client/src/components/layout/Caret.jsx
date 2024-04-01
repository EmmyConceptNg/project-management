import { Icon } from "@iconify/react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  FormControl,
  IconButton,
  ListItemIcon,
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
import { useSelector } from "react-redux";
import { getImageUrl } from "../../api/axios";

export default function Caret() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(state => state.user)
  const workspace = useSelector(state => state.workspace)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box display={{ xs: "none", sm: "flex" }} alignItems="center">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Box display="flex" alignItems="center">
            <Text ml={2} fw="500" fs="16px" color="#1A1A1A">
              {user?.fullName ?? ""}
            </Text>
            <Icon
              icon="ri:arrow-drop-down-line"
              style={{ color: "#1A1A1A", fontSize: "20px" }}
            />
          </Box>
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
        <Box sx={{ p: 3, minWidth: "500px" }}>
          <Stack spacing={4}>
            <Avatar
              alt={user.fullName}
              sx={{ minWidth: "114px", minHeight: "114px" }}
              src={
                user?.image
                  ? getImageUrl(user?.image)
                  : "/assets/icons/ai-avatar.svg"
              }
            />
            <Box>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <label htmlFor="password" style={{ marginBottom: "10px" }}>
                  <Text fw="500" fs="16px" ml={5}>
                    Full Name
                  </Text>
                </label>
                <OutlinedInput
                  size="small"
                  required
                  id="fullname"
                  type="text"
                  name="fullname"
                  readOnly
                  value={user?.fullName ?? ""}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <label htmlFor="password" style={{ marginBottom: "10px" }}>
                  <Text fw="500" fs="16px" ml={5}>
                    Current Workspace
                  </Text>
                </label>
                <OutlinedInput
                  size="small"
                  required
                  id="fullname"
                  type="text"
                  name="fullname"
                  readOnly
                  value={workspace?.name}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <label htmlFor="password" style={{ marginBottom: "10px" }}>
                  <Text fw="500" fs="16px" ml={5}>
                    Your Industry
                  </Text>
                </label>
                <OutlinedInput
                  size="small"
                  required
                  id="fullname"
                  type="text"
                  name="fullname"
                  readOnly
                  value={user?.industry}
                />
              </FormControl>
            </Box>
          </Stack>
        </Box>
      </Menu>
    </>
  );
}
