import * as React from "react";
import { useState, Grid } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import UserDetails from "./UserDetails";
import UserBookings from "./UserBookings";
import ResList from "../ResList/ResList";
import MyFavourite from "./MyFavourite";

const drawerWidth = 240;

function ProfilePage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [selectedComponent, setSelectedComponent] = useState(<div>No selection</div>)
  const [userLikings, setUserLikings] = useState(null)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { id } = useParams();

  // const bookings = [
  //   {
  //     restaurantName: "Out of the box Courtyard",
  //     city: "Connaught Palace, Central Delhi, Delhi",
  //     guests: [
  //       { name: "Sampath", phone: "9390402984" },
  //       { name: "Srinivas", phone: "9347402984" },
  //       { name: "Sai kumar", phone: "9390402976" },
  //       { name: "Sai Teja", phone: "9390463039" },
  //     ],
  //     status: "SuccessFul Booking",
  //     dateTime: "15th Nov 2022 at 12:15 PM",
  //     BookingID: "DO18598744",
  //   },
  //   {
  //     restaurantName: "Out of the box Courtyard",
  //     city: "Connaught Palace, Central Delhi, Delhi",
  //     guests: [
  //       { name: "Sampath", phone: "9390402984" },
  //       { name: "Srinivas", phone: "9347402984" },
  //       { name: "Sai kumar", phone: "9390402976" },
  //       { name: "Sai Teja", phone: "9390463039" },
  //     ],
  //     status: "SuccessFul Booking",
  //     dateTime: "15th Nov 2022 at 12:15 PM",
  //     BookingID: "DO18598744",
  //   },
  // ]
  const { user, login, logout } = React.useContext(UserContext);
  // const [user, setUser] = React.useState(null);
  // const [userlikings, setUserLikings] = React.useState(null);

  const getOptionLabel = (option) => {
    return option;
  };

  React.useEffect(() => {
    async function fetchUserLikings() {
      // console.log("called");
      if (!user) {
        console.log(
          "Couldn't fetch user likings because user hasn't logged in!!"
        );
        return;
      }
      try {
        let userlikingsResponse = await fetch(
          "http://localhost:8080/getUserLikings/" + user._id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        userlikingsResponse = await userlikingsResponse.json();
        if (userlikingsResponse.success) {
          // console.log("likings set");
          setUserLikings(userlikingsResponse.userlikings);
        } else {
          console.log(userlikingsResponse.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserLikings();
  }, [user]);

  const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Object.entries({
          "My Account":userLikings ? <UserDetails user={user} login={login} userLikings={userLikings} updateProps={(userlikings) => setUserLikings(userlikings)} /> : <div>Fetching user favorites</div>,
          "Completed Dine-in Reservations":<UserBookings user={user} drawerWidth={drawerWidth} previous={true} />,
          "Upcoming Dine-in Reservations":<UserBookings user={user} drawerWidth={drawerWidth} future={true} />,
          "Saved Restaurants":userLikings ? <ResList restaurantIds={userLikings.savedRestaurants} updateProps={(userlikings) => setUserLikings(userlikings)} /> : <div>Fetching User favorites</div> ,
          "Favourite Restaurants":userLikings ? <ResList restaurantIds={userLikings.favRestaurants} updateProps={(userlikings) => setUserLikings(userlikings)} /> : <div>Fetching User favorites</div>,
          "My favourites":userLikings ? <MyFavourite userLikings={userLikings} updateProps={(userlikings) => setUserLikings(userlikings)} /> : <div>Fetching User favorites</div>,
        }).map(([text,component], index) => (
          <ListItem onClick={() => setSelectedComponent(component)} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            marginTop: "4.32em",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              All Dine-in Reservations
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "4.32em",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            style={{ marginTop: "5em" }}
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "4.32em",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {selectedComponent}
        {/* <UserDetails user={user} login={login} /> */}
        {/* add your profile code here */}
        
      </Box>
    </>
  );
}

ProfilePage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ProfilePage;
