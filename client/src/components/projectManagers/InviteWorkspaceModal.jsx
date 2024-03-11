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
export default function InviteWorkspaceModal({ open, setOpen, refresh }) {
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
      team: emails,
    };
    axios
      .post("/api/workspace/invite", updatedPaylod, {
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
              <label htmlFor="name" style={{ marginBottom: "15px" }}>
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Invite Team Member
                </Text>
              </label>
              <Stack direction="row" spacing={1}>
                <OutlinedInput
                  fullWidth
                  id="name"
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={handleChange}
                />
                <Button variant="outlined" onClick={handleAddEmail}>
                  Add
                </Button>
              </Stack>
            </FormControl>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {emails.map((email, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: "#F2F2F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1,
                    borderRadius: "10px",
                  }}
                >
                  <Text sx={{ my: "auto" }}>{email}</Text>
                  <Button
                    sx={{ my: "auto" }}
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveEmail(email)}
                  >
                    X
                  </Button>
                </Box>
              ))}
            </Box>

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
