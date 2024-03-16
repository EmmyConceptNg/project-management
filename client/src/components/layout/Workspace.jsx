import { Icon } from "@iconify/react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import Text from "../../components/utils/Text";
import {
  Add,
  EditOutlined,
  Logout,
  PersonAdd,
  PersonOutlined,
  Search,
  Settings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Workspace() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);
  const workspace = useSelector((state) => state.workspace);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [workspaces, setWorkspaces] = useState([]);
  useEffect(() => {
    fetchWorkspace();
  }, [user, workspace]);

  const fetchWorkspace =() =>{
    axios.get(`/api/workspace/${user._id}`).then((response) => {
      const filteredWorkspaces = response.data.workspaces.filter(
        (_w) => _w._id !== workspace._id
      );
      setWorkspaces(filteredWorkspaces);
    });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSwitchWorkspace = (id) =>{

  fetchWorkspace()
    const theWorkspace = workspaces.find(workspace => workspace._id === id);
     dispatch({
       type: "SET_WORKSPACE",
       payload: theWorkspace,
     });
  }
  return (
    <Box mx="auto">
      <Box display="flex" mx="auto" alignItems="center">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Box display="flex" alignItems="center">
            <Text ml={2} fw="500" fs="16px" color="#FFF">
              {workspace?.name}
            </Text>
            <Icon
              icon="ri:arrow-drop-down-line"
              style={{ color: "#FFF", fontSize: "20px" }}
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
        <Box sx={{ p: 3, minWidth: "250px" }}>
          <Stack spacing={4}>
            <Box>
              <Text fw="700" fs="18px" ml={5} color="#1a1a1a">
                {workspace?.name}
              </Text>
              <Text fw="500" fs="16px" ml={5}>
                {workspace?.team?.length} members
              </Text>
            </Box>

            <Box>
              <Stack direction="row" spacing={1} mb={2}>
                <Icon
                  style={{ fontSize: "20px", color: "#1A1A1A" }}
                  icon={"solar:settings-linear"}
                />
                <Text fw="500" fs="16px" ml={5}>
                  Settings
                </Text>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                onClick={() => navigate(`/workspace/${workspace._id}/members`)}
              >
                <Icon
                  style={{ fontSize: "20px", color: "#1A1A1A" }}
                  icon={"uil:users-alt"}
                />
                <Text fw="500" fs="16px" ml={5} sx={{ cursor: "pointer" }}>
                  Manage Users
                </Text>
              </Stack>
            </Box>
            {workspaces.length > 0 ? (
              <>
                <Box>
                  <Divider>
                    <Text fw="500" fs="16px" ml={5}>
                      Switch Workspace
                    </Text>
                  </Divider>
                </Box>
                <Box>
                  {workspaces.map((workspace, index) => (
                    <Box key={workspace._id}>
                      <Button
                        onClick={() => {
                         handleSwitchWorkspace(workspace._id)
                        }}
                        sx={{
                          textTransform: "capitalize",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text
                          fw="700"
                          fs="18px"
                          ml={5}
                          sx={{ cursor: "pointer" }}
                          color="#1a1a1a"
                        >
                          {workspace?.name}
                        </Text>
                        <Text
                          fw="500"
                          fs="16px"
                          ml={5}
                          sx={{ cursor: "pointer" }}
                        >
                          {workspace?.team?.length} members
                        </Text>
                      </Button>
                      {index !== workspaces.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </Box>
                  ))}
                </Box>
              </>
            ) : null}
            <Box>
              <Button
                startIcon={<Add />}
                sx={{ textTransform: "capitalize" }}
                onClick={() => navigate("/workspace")}
              >
                Add workspace
              </Button>
            </Box>
          </Stack>
        </Box>
      </Menu>
    </Box>
  );
}
