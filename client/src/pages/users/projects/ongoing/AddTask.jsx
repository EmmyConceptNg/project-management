import { Avatar, AvatarGroup, Box, Button, Container, Divider, FormControl, Grid, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Popover, Select, Stack } from '@mui/material'
import Text from '../../../../components/utils/Text';
import { ArrowBackIos, Delete, Folder, MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
   
export default function AddTask() {
  const today = new Date().toISOString().split("T")[0];
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
   

   const [payload, setPayload] = useState({
    title : '',
    startDate: '',
    endDate : '',
    projectName : '',
    projectOwner : '',
    team : [],
    status : '',
    description : ''
   })


   const handleChange=(e)=>{
    const {name, value} = e.target
    setPayload({...payload, [name] : value});
   }
const handleDescriptionChange =(data)=>{
  setPayload({...payload, description : data});
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
            Add Task
          </Text>
        </Box>
      </Box>

      <Box>
        <Grid container spacing={{ md: 3, lg: 3, sm: 2, xs: 2 }}>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="name"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Title of the task
                </Text>
              </label>
              <OutlinedInput
                required
                id="name"
                type="text"
                name="name"
                value={payload.name}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="startDate"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Start Date
                </Text>
              </label>
              <OutlinedInput
                required
                id="startDate"
                name="startDate"
                type="date"
                value={payload.startDate}
                inputProps={{
                  min: today,
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="endDate"
                style={{
                  marginBottom: "15px",
                  display: "flex",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  End Date
                </Text>
              </label>
              <OutlinedInput
                required
                id="endDate"
                name="endDate"
                type="date"
                value={payload.endDate}
                inputProps={{
                  min: today,
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="name"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Project Name
                </Text>
              </label>
              <OutlinedInput
                required
                id="projectName"
                type="text"
                name="projectName"
                value={payload.projectName}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="name"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Project Owner
                </Text>
              </label>
              <OutlinedInput
                required
                id="projectOwner"
                type="text"
                name="projectOwner"
                value={payload.projectOwner}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="team"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Add Team
                </Text>
              </label>
              <Select
                labelId="team"
                id="team"
                value={payload.team}
                onChange={handleChange}
                multiple
              >
                <MenuItem value={10} sx={{ display:' flex', alignItems : 'center', gap : '10px' }}>
                  <Avatar sx={{ height: "36px", width: "36px" }} />
                  <Text fw="500" fs="16px">John Doe</Text>
                </MenuItem>
                  <Divider />
                <MenuItem value={10} sx={{ display:' flex', alignItems : 'center', gap : '10px' }}>
                  <Avatar sx={{ height: "36px", width: "36px" }} />
                  <Text fw="500" fs="16px">John Doe</Text>
                </MenuItem>
                  <Divider />
                <MenuItem value={10} sx={{ display:' flex', alignItems : 'center', gap : '10px' }}>
                  <Avatar sx={{ height: "36px", width: "36px" }} />
                  <Text fw="500" fs="16px">John Doe</Text>
                </MenuItem>
                  <Divider />
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="status"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Task Status
                </Text>
              </label>
              <Select
                labelId="status"
                id="status"
                value={payload.status}
                onChange={handleChange}
              >
                <MenuItem value={10}>Not Started</MenuItem>
                <MenuItem value={10}>Completed</MenuItem>
                <MenuItem value={10}>On-going</MenuItem>
                <MenuItem value={10}>Completed</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="status"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Task Description
                </Text>
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={payload?.note}
                onReady={(editor) => {
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleDescriptionChange(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
                style={{ minHeight: "100%" }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack
          mt={5}
          direction="row"
          spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            sx={{ height: "44px", borderRadius: "10px" }}
            fullWidth
            onClick={() => {}}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            sx={{ height: "44px", borderRadius: "10px" }}
            fullWidth
            onClick={() => {}}
            variant="contained"
          >
            Create Task
          </Button>
        </Stack>
      </Box>
    </>
  );
}
