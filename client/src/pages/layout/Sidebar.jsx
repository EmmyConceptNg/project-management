import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { MenuItems } from "./MenuItems";
import { useNavigate, useLocation } from "react-router-dom";
import Text from "../../components/utils/Text";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CreateProjectModal from "../../components/modal/CreateProjectModal";
import Workspace from "../../components/layout/Workspace";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

 const handleClick = (_id, link) => {
   setId((prevId) => (_id === prevId ? "" : _id));
   setOpen((prevOpen) => (_id === id ? !prevOpen : true));
   if (_id !== id) {
     navigate(link); 
   }
 };

 const workspace = useSelector((state) => state.workspace);

  return (
    <>
      <Box>
        <Box display="flex" mt={2}>
          <Box
            component="img"
            src="/assets/images/logo.svg"
            width="184.38px"
            sx={{ mx: "auto" }}
          />
        </Box>

        <Box mt={5}>
          {workspace && Object.keys(workspace).length > 0 && (
            <Box
              display="flex"
              p={1.5}
              justifyContent={"center"}
              bgcolor="#1166EA"
            >
              <Workspace />
            </Box>
          )}
          {MenuItems.map((item) => (
            <Box key={item.id}>
              <ListItemButton
                onClick={() => {
                  item?.modal
                    ? setOpenModal(true)
                    : handleClick(item.id, item?.link);
                }}
                selected={item.link && item?.link?.includes(location.pathname)}
              >
                <ListItemIcon>
                  <Icon
                    style={{ fontSize: "20px", color: "#1A1A1A" }}
                    icon={item.icon}
                  />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {item.group &&
                  (open && id === item.id ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {item.group && (
                <Collapse
                  in={open && id === item.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.group.map((_item, index) => (
                      <ListItemButton
                        key={index}
                        sx={{ pl: 9 }}
                        onClick={() => {
                          navigate(_item?.link);
                        }}
                        selected={location.pathname.includes(_item?.link)}
                      >
                        <ListItemText primary={_item.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </Box>

        <Box display="flex" flexDirection="column" marginTop="500px">
          <Box display="flex" justifyItems="center" mx="auto">
            <Icon
              style={{ fontSize: "20px", color: "#1A1A1A" }}
              icon="material-symbols-light:mode-off-on"
            />
            <Text
              ml={2}
              fw="400"
              fs="15px"
              color="#1A1A1A"
              sx={{ cursor: "pointer" }}
            >
              Log Out
            </Text>
          </Box>
          <Box display="flex" justifyItems="center" mx="auto" mt={1}>
            <Text
              ml={2}
              fw="500"
              fs="12px"
              color="#4D4D4D"
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Term of Service
            </Text>
            <Text ml={2} fw="500" fs="12px" color="#4D4D4D">
              .
            </Text>
            <Text
              ml={2}
              fw="500"
              fs="12px"
              color="#4D4D4D"
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Text>
          </Box>
        </Box>
      </Box>
      <CreateProjectModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};
