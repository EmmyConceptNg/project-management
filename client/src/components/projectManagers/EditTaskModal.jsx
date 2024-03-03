import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";


import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Text from "../utils/Text";
import { useState } from "react";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function EditTaskModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    name: "",
    
  });


  const handleChange =(e) =>{
    const {name, value}=e.target
    setPayload({...payload, [name]: value})
  }


  return (
    <>
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
            Rename Project
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
          <Box>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label
                htmlFor="name"
                style={{
                  marginBottom: "15px",
                }}
              >
                <Text fw="500" fs="16px" ml={5} color="#1A1A1A">
                  Enter new name for project
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
            <Box display="flex">
              <Button fullWidth
                sx={{ mx: "auto", mt: 2 }}
                variant="contained"
                onClick={() => {
                  
                  setOpen(false);
                }}
              >
                Done
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
