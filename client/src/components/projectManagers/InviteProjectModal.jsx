import {
  Avatar,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Text from "../utils/Text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { notify } from "../../utils/utils";
import { LoadingButton } from "@mui/lab";
import { ToastContainer } from "react-toastify";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function InviteProjecteModal({ open, setOpen, refresh, project }) {
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    team: "",
  });
  const [btn, setBtn] = useState(false);
  const [workspace, setWorkspace] = useState({})

  const workspaceId = useSelector((state) => state.workspace._id);
  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  useEffect(() => {
    fetchWorkspace()
  },[])

  const fetchWorkspace = () => {
    axios.get(`/api/workspace/get-workspace/${workspaceId}`).then((response) => {
      dispatch({type: 'SET_WORKSPACE', payload: response.data.workspace});
      setWorkspace(response.data.workspace);
    });
  };

  const inviteWorkspace = (e) => {
    setBtn(true);
    e.preventDefault();

    const updatedPaylod = {
      ...payload,
      projectId: project?._id,
     
    };
    axios
      .post("/api/projects/invite", updatedPaylod, {
        headers: { ContentType: "application/json" },
      })
      .then((response) => {
        refresh();
        notify(response.data.message, 'success');
        
        setBtn(false);
        handleClose();
      })
      .catch((error) => {
        setBtn(false);
        notify(error.response.data.error, 'error');
      });
  };

  return (
    <>
      <ToastContainer />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: "500px", // Set the desired width here
          },
        }}
        BackdropProps={{
          onClick: handleClose,
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Text fs="20px" fw="600" color="#1A1A1A">
            Invite People
          </Text>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box component="form" onSubmit={inviteWorkspace}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Select
                labelId="team"
                fullWidth
                name="team"
                value={payload.team}
                onChange={handleChange}
              >
                {console.log(project)}
                {workspace?.team
                  // ?.filter((_team) => _team?.userId?._id !== user?._id)

                  ?.map((_user, index) => (
                    <MenuItem key={index} value={_user?.userId?._id}>
                      {_user?.userId?.fullName ?? _user?.userId?.email}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Box display="flex">
              <LoadingButton
                loading={btn}
                fullWidth
                sx={{ mx: "auto", mt: 2 }}
                variant="contained"
                type="submit"
              >
                Done
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
