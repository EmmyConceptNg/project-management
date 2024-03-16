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
import { useState } from "react";
import { useSelector } from "react-redux";
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

  const [payload, setPayload] = useState({
    email: "",
  });
  const [btn, setBtn] = useState(false);

  const workspace = useSelector((state) => state.workspace);
  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const [emails, setEmails] = useState([]);
  const handleAddEmail = () => {
    if (payload.email.trim() !== "" && !emails.includes(payload.email)) {
      setEmails([...emails, payload.email]);
      setPayload({ ...payload, email: "" });
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const inviteWorkspace = (e) => {
    setBtn(true);
    e.preventDefault();

    const updatedPaylod = {
      ...payload,
      invitingUserId: user?._id,
      workspaceId: workspace?._id,
      workspaceName : workspace?.name,
      team: emails,
    };
    axios
      .post("/api/workspace/invite", updatedPaylod, {
        headers: { ContentType: "application/json" },
      })
      .then((response) => {
        refresh();
        notify(response.data.message, 'success');
        setEmails([])
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
              <label
                htmlFor="team"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Assign Task
                </Text>
              </label>
              <Select
                labelId="team"
                fullWidth
                name="team"
                value={payload.team}
                onChange={handleChange}
              >
                {project?.team
                  // ?.filter((_team) => _team?.userId?._id !== user?._id)
                  ?.map((_user, index) => (
                    <MenuItem key={index} value={_user?.userId?._id}>
                      {_user?.userId?.fullName}
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
