import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";

export const FullLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(!user._id){
      navigate('/login')
    }
  },[user, navigate])

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawerWidth = 270;

  return (
    <>
      <Box>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            zIndex: (theme) => theme.zIndex.drawer,
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              // display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Sidebar />
          </Drawer>
          {/* <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Sidebar />
          </Drawer> */}
        </Box>
        <Box
          sx={{
            width: {
              md: mobileOpen ? `calc(100% - ${drawerWidth}px) ` : "100%",
            },
          }}
        >
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              width: {
                md: mobileOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
              },
              height: "74px",
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: "#fff",
              boxShadow: "none",
              borderBottom: "1px solid #D9D9D9",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                // sx={{ mr: 2, display: { sm: "none" } }}
              >
                <Menu sx={{ color: "#000" }} />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Nav />
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              paddingTop: "114px", // Adjusted padding to account for app bar height
              minHeight: "calc(100vh - 74px)", // Adjusted to exclude app bar height
              ml: { md: mobileOpen ? `${drawerWidth}px` : 0 },
              minWidth: "100%",
              px: { md: 4, lg: 4, sm: 2, xs: 1 },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Page Route */}
            {/* ------------------------------------------- */}

            <Outlet />

            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Box>
        </Box>
      </Box>
    </>
  );
};
