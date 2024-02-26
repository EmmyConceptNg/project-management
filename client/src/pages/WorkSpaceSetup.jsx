import { Box, FormControl, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import Text from "../components/utils/Text";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function WorkSpaceSetup(){
  const [payload, setPayload] = useState({
    name : '',
    projects :''
  })
  const [userDetails, setUserDetais] = useState(false)
  const [nextBtn, setNextBtn] = useState(false);
  const handleChange = (e) =>{
const {value, name} = e.target;
setPayload(prev => ({prev, [name] : value}))
  }

  const setupBtn = ()=>{
    setUserDetais(true)
    setNextBtn(false);
  }
return (
  <>
    {!userDetails ? (
      <Box display="flex">
        <Stack spacing={10} mx="auto" mt={10}>
          <Box>
            <Text
              fw="600"
              fs="32px"
              color="#262626"
              sx={{ textAlign: "center", marginBottom: "10px" }}
            >
              Set Up Your Workspace
            </Text>
            <Text
              fw="400"
              fs="14px"
              color="#262626"
              sx={{ textAlign: "center" }}
            >
              Enter the name of your workspace and manage all projects in it.
            </Text>
          </Box>
          <Stack spacing={3}>
            <Box display="flex">
              {" "}
              <Box
                component="img"
                src="assets/icons/add-image.svg"
                sx={{ width: "114px", height: "114px", mx: "auto" }}
              />
            </Box>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label htmlFor="password" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  Work Space Name
                </Text>
              </label>
              <OutlinedInput
                size="small"
                required
                id="name"
                type="text"
                name="name"
                value={payload.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="projects" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  How many projects you intend to manage in this workspace
                </Text>
              </label>
              <Select
                labelId="projects"
                size="small"
                fullWidth
                name="projects"
                value={payload.projects}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
              >
                {["option1", "option2"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LoadingButton
              loading={nextBtn}
              onClick={setupBtn}
              variant="contained"
              color="primary"
              sx={{ textTransform: "capitalize" }}
            >
              Next
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    ) : (
      <Box display="flex">
        <Stack spacing={10} mx="auto" mt={10}>
          <Box>
            <Text
              fw="600"
              fs="32px"
              color="#262626"
              sx={{ textAlign: "center", marginBottom: "10px" }}
            >
              Profile Setup
            </Text>
            <Text
              fw="400"
              fs="14px"
              color="#262626"
              sx={{ textAlign: "center" }}
            >
              Now manage your projects in fast and efficient way!
            </Text>
          </Box>
          <Stack spacing={3}>
            <Box display="flex">
              <Box
                component="img"
                src="assets/icons/add-image-2.svg"
                sx={{ width: "114px", height: "114px", mx: "auto" }}
              />
            </Box>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <label htmlFor="password" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  Full Name
                </Text>
              </label>
              <OutlinedInput
                size="small"
                required
                id="fullname"
                type="text"
                name="fullname"
                value={payload.fullName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="projects" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  Your Role
                </Text>
              </label>
              <Select
                labelId="projects"
                size="small"
                fullWidth
                name="projects"
                value={payload.role}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
              >
                {["option1", "option2"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <label htmlFor="projects" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  Your Industry
                </Text>
              </label>
              <Select
                labelId="projects"
                size="small"
                fullWidth
                name="projects"
                value={payload.industry}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
              >
                {["option1", "option2"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl>
              <label htmlFor="projects" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  Number of people you intend to add in your project
                </Text>
              </label>
              <Select
                labelId="projects"
                size="small"
                fullWidth
                name="projects"
                value={payload.people}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
              >
                {["option1", "option2"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <label htmlFor="projects" style={{ marginBottom: "10px" }}>
                <Text fw="500" fs="16px" ml={5}>
                  How many projects you intend to manage?
                </Text>
              </label>
              <Select
                labelId="projects"
                size="small"
                fullWidth
                name="projects"
                value={payload.project}
                onChange={handleChange}
                input={<OutlinedInput label="" />}
              >
                {["option1", "option2"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LoadingButton
              loading={nextBtn}
              onClick={setupBtn}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "capitalize" }}
            >
              Done
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    )}
  </>
);
};