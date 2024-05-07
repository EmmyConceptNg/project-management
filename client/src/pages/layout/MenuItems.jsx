export const MenuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "radix-icons:dashboard",
    link: "/dashboard/app",
  },

  {
    id: "projects",
    name: "Projects",
    icon: "material-symbols:folder-outline",

    group: [
      {
        id: "project-new",
        name: "Create New Project",
        icon: "uil:folder-plus",
        link: "/dashboard/projects/ongoing?create=true",
        // modal: true,
      },
      {
        id: "ongoing",
        name: "In-Progress",
        link: "/dashboard/projects/ongoing",
      },
      {
        id: "completed",
        name: "Completed",
        link: "/dashboard/projects/completed",
      },
    ],
  },

  {
    id: "settings",
    name: "Settings",
    icon: "solar:settings-linear",

    group: [
      { id: "profile", name: "Profile", link: "/dashboard/profile" },
      // {
      //   id: "notifications",
      //   name: "Notifications",
      //   link: "/dashboard/notifications",
      // },
    ],
  },
];
