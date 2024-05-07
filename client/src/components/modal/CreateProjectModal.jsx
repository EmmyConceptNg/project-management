import {
  Box,
  Button,
  DialogContent,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";

import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";

import Text from "../utils/Text";
import { notify } from "../../utils/utils";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function CreateProjectModal({ open, setOpen, refresh }) {
  const [register, setRegister] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  
  const [validated, setValidated] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const [isCreating, setIsCreating] = useState(false)

  const [payload, setPayload] = useState({
    // team: [],
    name: "",
    startDate: "",
    endDate: "",
    description: ''
  });

  const workspace = useSelector((state) => state.workspace);
  const user = useSelector((state) => state.user);

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
    const updatedPaylod = { ...payload, workspaceId: workspace?._id, owner : user?._id };
    axios
      .post("/api/projects/create", updatedPaylod, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // notify("project created successfully", "success");
        handleClose();
        // refresh();
        navigate("/dashboard/projects/ongoing");
       

      })
      .catch((error) => {
        notify(error?.response?.data?.error, "error");
        setIsCreating(false);
      }).finally(() => {  setIsCreating(false);});
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
            width: "500px",
          },
        }}
        BackdropProps={{
          onClick: handleClose,
        }}
      >
        <DialogContent dividers>
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
                  onClick={() => {}}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  loading={isCreating}
                  sx={{ height: "44px", borderRadius: "10px" }}
                  fullWidth
                  onClick={() => {}}
                  variant="contained"
                >
                  Create Project
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
