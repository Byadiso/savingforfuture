import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import PaymentsIcon from "@mui/icons-material/Payments";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


import SaveIcon from '@mui/icons-material/Save';
import CreditCardIcon from '@mui/icons-material/CreditCard';


import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import NoteIcon from '@mui/icons-material/Note';

import GroupIcon from '@mui/icons-material/Group';


import Dashboard from "../Dashboard";
import { checkIfAdmin, getLoggedUser, isAuthenticatedDetails, LogoutUser } from "../../../firebase/Authentication";
import { useEffect } from "react";
import { useState } from "react";
import { getUsername } from "../../../Helpers/Helpers";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(135deg, #004e92, #000428)", // custom gradient
  color: "white",
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

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);

  const isAdmin = checkIfAdmin(userId);
  const username = getUsername(loggedUser.email);

  useEffect(() => {
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
    getLoggedUser(setLoggedUser);
  }, [userId]);

  const navigate = useNavigate();

  const handleClick = (text) => {
    if (text === "Log out") {
      LogoutUser();
      navigate("/Login");
    }
    if (text === "Last months") {
      navigate("/Last_Months");
    }
    if (text === "Add-ons & Charges") {
      navigate("/records/add_on_and_bank_charges");
    }
    if (text === "Log in") {
      navigate("/Login");
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const icons = [
    <DashboardIcon />,
    <AddBoxIcon />,
    <NoteIcon />,
    !isAdmin && <GroupIcon />,
    !isAdmin && <BarChartIcon />,
    <SaveIcon />,
    <CreditCardIcon />,
    !isAdmin && <CalendarMonthIcon />,
    !isLoggedIn ? <LogoutIcon /> : <LoginIcon />,
  ].filter(Boolean);

  const menu = [
    "Dashboard",
    "Add",
    "Notes",
    !isAdmin && "Members list",
    !isAdmin && "Reports",
    "Data & Documents",
    "Add-ons & Charges"
  ].filter(Boolean);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PaymentsIcon fontSize="large" />
            Saving for the Future
          </Typography>

          <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircleIcon fontSize="large" />
            <Link
              to="/UserSettings"
              style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
            >
              {username}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: '#ffca28',
                    color: '#000',
                  },
                }}
              >
                <ListItemIcon style={{ display: "flex" }}>
                  <Link
                    to={"/" + text}
                    style={{
                      textDecoration: "none",
                      color: text !== "Super" ? "#008DDA" : "red",
                    }}
                  >
                    {icons[index]}
                  </Link>
                </ListItemIcon>
                <Link to={"/" + text} style={{ textDecoration: "none", color: "black" }}>
                  <ListItemText primary={text} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[ "Last months", isLoggedIn ? "Log out" : "Log in"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleClick(text)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#ffca28',
                    color: '#000',
                  },
                }}
              >
                <ListItemIcon>
                  {text === "Log out" || text === "Log in" ? icons[icons.length - 1] : <CalendarMonthIcon />}
                  {/* {text === "Add-ons & Charges" && icons[icons.lengt ]} */}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Dashboard />
      </Box>
    </Box>
  );
}
