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

import { ArrowBackIos,  } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import ProjectLoader from "../../../../components/utils/ProjectLoader";


export default function OngoingDetails() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [project, setProject] = useState([])
  const [loading, setLoading] = useState(true)

  const {projectId} = useParams()
  const user = useSelector(state=> state.user)

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

  useEffect(() =>{
    setLoading(true)
    axios.get(`/api/projects/${projectId}/${user?._id}/ongoing`).then((response) =>{setProject(response.data.project); setLoading(false)})
  },[])

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
          
            <Box my="auto">
              <Text fw="600" fs="22px">
                Project Details
              </Text>
            </Box>
          
        </Box>
      </Box>

      <Box border="1px solid #D9D9D9" borderRadius="8px">
        <Box
          mt={3}
          borderBottom="1px solid #D9D9D9 "
          display="flex"
          alignItems="center"
        >
          <Box mb={3} ml={7}>
            <Text fw="600" fs="22px">
              {!loading ? (
                project?.name
              ) : (
                <ProjectLoader sx={{ height: "50px" }} />
              )}
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="flex-start"
          mt={3}
          mx={{ md: 5, lg: 5, sm: 2, xs: 2 }}
        >
          <Text
            sx={{ mx: { sm: 1, xs: 1, md: 25, lg: 25 }, textAlign: "left" }}
            fw="500"
            fs="18px"
          >
            {!loading ? (
              project?.description && parse(project?.description)
            ) : (
              <ProjectLoader sx={{ height: "100px" }} />
            )}
          </Text>
        </Box>
      </Box>
    </>
  );
}
