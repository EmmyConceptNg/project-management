import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  Stack,
} from "@mui/material";
import Text from "../../components/utils/Text";
import { ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

const [updateBtn, setUpdateBtn] = useState(false)
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

   const fileInputRef = useRef(null);

   const handleImageClick = () => {
     fileInputRef.current.click();
   };

   const handleFileChange = (event) => {
     const selectedFile = event.target.files[0];
     // Handle the selected file here
   };
const [payload, setPayload] = useState({
    fullName : '',
    role : '',
    industry : ''
})

   const handleChange =(event) =>{
    const {name, value} = event.targe;
    setPayload(prev => ({...prev, [name] : value }))
   }


   const handleEditContent =() =>{

   }

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
            Profile
          </Text>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Box display="flex" alignItems="flex-end">
          <Avatar sx={{ height: "114px", width: "114px" }} />
          <Box>
            <Box
              component="img"
              src="/assets/icons/edit_icon.svg"
              sx={{ cursor: "pointer" }}
              onClick={handleImageClick}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={15} display="flex" justifyContent="center">
        <Box mx="auto" width="520.36px">
          <Stack spacing={3}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="password"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Full Name
                </Text>
                <Box
                  component="img"
                  src="/assets/icons/edit_icon.svg"
                  sx={{ cursor: "pointer" }}
                  onClick={handleEditContent("fullName")}
                />
              </label>
              <OutlinedInput
                required
                id="fullName"
                type="fullName"
                name="fullName"
                value={payload.fullName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="password"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Your Role
                </Text>
                <Box
                  component="img"
                  src="/assets/icons/edit_icon.svg"
                  sx={{ cursor: "pointer" }}
                  onClick={handleEditContent("fullName")}
                />
              </label>
              <Select
                labelId="role"
                id="role"
                value={payload.role}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="password"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Your Industry
                </Text>
                <Box
                  component="img"
                  src="/assets/icons/edit_icon.svg"
                  sx={{ cursor: "pointer" }}
                  onClick={handleEditContent("fullName")}
                />
              </label>
              <Select
                labelId="industry"
                id="industry"
                value={payload.industry}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <LoadingButton
              loading={updateBtn}
              type="submit"
              variant="contained"
              color="primary" sx={{ height: '44px', borderRadius : '10px' }}
            >
              Done
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
