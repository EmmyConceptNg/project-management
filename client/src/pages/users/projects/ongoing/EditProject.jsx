import { Avatar, AvatarGroup, Box, Button, Container, Divider, FormControl, Grid, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Popover, Select, Stack } from '@mui/material'
import Text from '../../../../components/utils/Text';
import { ArrowBackIos, Delete, Folder, MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from 'react-redux';
import axios from '../../../../api/axios';
import { notify } from '../../../../utils/utils';
import { LoadingButton } from '@mui/lab';
   
export default function EditProject() {
    const workspace = useSelector((state) => state.workspace);
    const user = useSelector((state) => state.user);
  
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
   
   const {projectId} = useParams()

    const [loading, setLoading] = useState(true);

    const [validated, setValidated] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const [isCreating, setIsCreating] = useState(false);

     useEffect(() => {
       setLoading(true);
       axios
         .get(`/api/projects/${projectId}/${user?._id}/ongoing`)
         .then((response) => {
            const startDate = new Date(response.data.project.startDate);
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const endDate = new Date(response.data.project.endDate);
            const formattedEndDate = endDate.toISOString().split("T")[0];
           setPayload({
             ...payload,
             name: response.data.project.name,
             startDate: formattedStartDate,
             endDate: formattedEndDate,
             description: response.data.project.description,
           });
           setLoading(false);
         });
     }, [user, projectId]);

    const [payload, setPayload] = useState({
      name: '',
      startDate: '',
      endDate: '',
      description: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPayload((prevPayload) => ({
        ...prevPayload,
        [name]: value,
      }));
    };

    const handleDescriptionChange = (data) => {
      setPayload({ ...payload, description: data });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsCreating(true);
      const updatedPaylod = {
        ...payload,
        workspaceId: workspace?._id,
        owner: user?._id,
        projectId : projectId
      };
      axios
        .post(`/api/projects/update/`, updatedPaylod, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          notify("project created successfully", "success");
          handleClose();
          navigate("/dashboard/projects/ongoing");
        })
        .catch((error) => {
          notify(error?.response?.data?.error, "error");
          setIsCreating(false);
        });
    };
 
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} width="100%">
        <Stack spacing={2} width="100%">
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
              id="name"
              type="text"
              name="name"
              value={payload.name}
              onChange={handleChange}
            />
          </FormControl>
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
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <label
              htmlFor="status"
              style={{
                marginBottom: "15px",
              }}
            >
              <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                Project Description
              </Text>
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={payload?.description}
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
    
          <Stack
            mt={5}
            direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button
              sx={{ height: "44px", borderRadius: "10px" }}
              fullWidth
              onClick={() => navigate(-1)}
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={isCreating}
              sx={{ height: "44px", borderRadius: "10px" }}
              fullWidth
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
