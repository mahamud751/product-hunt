"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  CssBaseline,
  Divider,
  IconButton,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useTheme, styled, Theme, CSSObject } from "@mui/material/styles";

import UnifiedMenu from "./MainMenu";

import Link from "next/link";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  margin: "10px 10px",
  transition: theme.transitions.create(["margin-left", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: `calc(100% - ${
    open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`
  })`,
  height: "100vh",
}));
interface AppMenuProps {
  children: React.ReactNode;
}

export default function AppMenu({ children }: AppMenuProps) {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isSmallScreen);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className="flex" sx={{ height: "100vh", margin: 0 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-white shadow-none">
        <Toolbar>
          {isSmallScreen && <UnifiedMenu isDrawer />}
          {!isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={`relative flex items-center justify-center flex-shrink-0 font-sans 
              bg-purple-50 cursor-pointer rounded-md w-[34px] h-[34px] 
              text-[1.2rem] overflow-hidden transition-transform 
              duration-200 ease-in-out text-purple-700 
              ${open ? "hidden" : "block"}`}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
              style={{ marginLeft: 40 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className="flex justify-end w-full">
            {/* <IconButton
              onClick={handleLanguageModalOpen}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <Language />
            </IconButton> */}

            {/* <IconButton
              onClick={handleToggleCartModal}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <Badge badgeContent={cartItemsFromRedux?.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              onClick={handleNotificationModalOpen}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <Badge badgeContent={totalNotification} color="error">
                <Notifications />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              onClick={toggleDarkMode}
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                marginRight: 8,
                marginLeft: 2,
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton> */}

            {/* <ProfileMenu /> */}

            {/* <LanguageModal
              open={openLanguageModal}
              onClose={() => {
                setOpenLanguageModal(false);
                setAnchorElLanguage(null);
              }}
              anchorEl={anchorElLanguage}
            /> */}
            {/* <CartModal
              open={openCartModal}
              anchorEl={anchorEl}
              onClose={() => setOpenCartModal(false)}
              removeItem={removeItem}
            /> */}
            {/* <NotificationModal
              open={openNotificationModal}
              onClose={() => setOpenNotificationModal(false)}
              anchorEl={anchorElNotification}
            /> */}
          </div>
        </Toolbar>
      </AppBar>
      {!isSmallScreen && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="flex justify-between p-4">
            <Link href={"/"}>
              <Image
                src={"https://i.ibb.co/CMkLbff/Icon.png"}
                width={20}
                height={20}
                alt="icon"
                className="ml-2"
              />
            </Link>

            <div className="flex items-center">
              <IconButton
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                sx={{
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                {open ? (
                  <MenuIcon
                    className={`relative flex items-center justify-center flex-shrink-0 font-sans cursor-pointer rounded-md w-[24px] h-[34px] 
                    text-[1.2rem] overflow-hidden transition-transform duration-200 ease-in-out
                    ${
                      theme.palette.mode === "dark"
                        ? "bg-transparent text-white"
                        : "bg-purple-50 text-purple-700"
                    }`}
                  />
                ) : (
                  <ChevronRightIcon
                    className={
                      theme.palette.mode === "dark" ? "text-white" : ""
                    }
                  />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider />
          {!isSmallScreen && <UnifiedMenu isDrawer={false} />}
        </Drawer>
      )}
      <MainContent open={open}>
        <DrawerHeader />
        {children}
      </MainContent>
    </Box>
  );
}
