export const ProjectManagerMenuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "radix-icons:dashboard",
    link: "/dashboard/pm/app",
  },
  {
    id: "projects",
    name: "Projects",
    icon: "material-symbols:folder-outline",

    group: [
      {
        id: "ongoing",
        name: "On-going",
        link: "/dashboard/pm/projects/ongoing",
      },
      {
        id: "completed",
        name: "Completed",
        link: "/dashboard/pm/projects/completed",
      },
    ],
  },
  {
    id: "project-new",
    name: "Create New Project",
    icon: "uil:folder-plus",
    link: "/dashboard/pm/projects/new",
  },
  {
    id: "people",
    name: "Manage People",
    icon: "uil:users-alt",

    group: [
      {
        id: "ongoing",
        name: "Roaster",
        link: "/dashboard/pm/people/roaster",
      },
      
      {
        id: "members",
        name: "Team Member",
        link: "/dashboard/pm/people/members",
      },
      {
        id: "stakeholder",
        name: "Stake Holder",
        link: "/dashboard/pm/people/stakeholder",
      },
      
    ],
  },
  {
    id: "settings",
    name: "Settings",
    icon: "solar:settings-linear",

    group: [
      { id: "profile", name: "Profile", link: "/dashboard/profile" },
      { id: "workspace", name: "Work Space", link: "/dashboard/pm/workspace" },
      {
        id: "notifications",
        name: "Notifications",
        link: "/dashboard/notifications",
      },
    ],
  },
];