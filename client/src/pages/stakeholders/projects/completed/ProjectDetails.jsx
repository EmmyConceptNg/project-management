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

import { ArrowBackIos, Delete, Folder, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../../../components/utils/Text";

export default function CompletedDetails() {
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

  const navigate = useNavigate();

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
            Completed Projects
          </Text>
        </Box>
      </Box>
      <Box
        mt={3}
        ml={7}
        borderBottom="1px solid #D9D9D9 "
        display="flex"
        alignItems="center"
      >
        <Box mb={3}>
          <Text fw="600" fs="22px">
            {`Project Alpha > Project Details`}
          </Text>
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
              Designing and Development of Project Management Web App
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          mt={3}
          mx={{ md: 5, lg: 5, sm: 2, xs: 2 }}
        >
          <Text
            sx={{ mx: { sm: 1, xs: 1, md: 25, lg: 25 } }}
            fw="500"
            fs="18px"
          >
            1. Introduction: The project aims to develop a comprehensive Project
            Management Web Application and concurrently design a modern,
            user-friendly interface for seamless navigation and enhanced user
            experience. This dual-phase initiative will empower project managers
            and teams to efficiently plan, execute, and monitor projects while
            ensuring a visually appealing and intuitive interface for optimal
            user engagement. 2. Objectives: 2.1 Project Management Web
            Application: Develop a robust project management system with
            features including task management, resource allocation, team
            collaboration, progress tracking, and reporting. Integration with
            popular project management methodologies (e.g., Agile, Scrum,
            Kanban) to cater to diverse project requirements. User
            authentication and authorization mechanisms to ensure secure access
            and data protection. Real-time collaboration features such as chat,
            notifications, and document sharing. Customizable dashboards and
            reporting tools for project analytics. Mobile responsiveness to
            facilitate access from various devices. 2.2 Web Design: Create a
            visually appealing and modern web design for the project management
            application. Ensure a user-friendly interface that enhances user
            experience and promotes ease of navigation. Consistent design
            elements and branding across all pages for a cohesive and
            professional look. Optimize the design for various screen sizes and
            resolutions to ensure responsiveness. Incorporate user feedback and
            iterative design processes to refine and enhance the user interface.
            3. Project Scope: 3.1 Project Management Web Application: Define and
            implement the core functionality of the project management system.
            Develop a scalable architecture to accommodate future updates and
            additional features. Integration with third-party tools and services
            (e.g., calendars, email, file storage) to enhance functionality.
            Implement a robust testing phase to identify and resolve any bugs or
            issues. Provide comprehensive documentation for system
            administrators and end-users. 3.2 Web Design: Conduct user research
            to understand user preferences and expectations. Create wireframes
            and prototypes to visualize the design and gather feedback. Develop
            a design system and style guide for consistent design elements.
            Implement the final design based on the approved prototypes and user
            feedback. Conduct usability testing to ensure the design meets user
            needs and expectations. 4. Deliverables: 4.1 Project Management Web
            Application: Fully functional project management web application.
            Source code repository with version control. Technical documentation
            for system administrators and developers. User documentation and
            training materials. 4.2 Web Design: High-fidelity design mockups and
            prototypes. Design system and style guide. Responsive web design
            implementation. Usability testing reports and feedback
            documentation. 5. Timeline: The project will be divided into phases
            with distinct milestones. The estimated timeline for completion is
            [insert timeline here], subject to adjustments based on feedback and
            unforeseen challenges. 6. Team and Responsibilities: Project Manager
            Software Developers UI/UX Designers Quality Assurance/Testers
            Documentation and Support Team 7. Budget: A detailed budget
            outlining resources, software licenses, and any external services
            required for both development and design phases will be prepared and
            presented for approval. 8. Risks and Mitigation: Identify potential
            risks such as technical challenges, changes in project scope, and
            external dependencies. Develop mitigation strategies to address
            these risks and ensure a smooth project execution. 9. Approval: This
            project scope is subject to approval by [insert relevant
            stakeholders or project sponsors]. Once approved, any changes to the
            scope will be communicated and agreed upon through a formal change
            management process. 10. Conclusion: The Integrated Project
            Management Web Application and Web Design project aim to deliver a
            powerful, user-friendly, and visually appealing solution that meets
            the needs of project managers and teams. Regular updates and
            progress reports will be provided throughout the project lifecycle
            to ensure transparency and alignment with stakeholders'
            expectations.
          </Text>
        </Box>
      </Box>
    </>
  );
}
