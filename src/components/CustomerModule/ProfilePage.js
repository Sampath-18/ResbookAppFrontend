import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { UserContext } from '../contexts/UserContext';

const drawerWidth = 240;

function ProfilePage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
  // const { user, login, logout } = React.useContext(UserContext);
  const [user,setUser] = React.useState(null)
  const [userlikings,setUserLikings] = React.useState(null)
  

  React.useEffect(() => {
    const fetchUserAndBookings = async () => {
      console.log("user:",id);
      let userResponse = await fetch("http://localhost:8080/getUser/"+id,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
      userResponse = await userResponse.json()
      const bookings = []
      if(userResponse.success)
      {
        for(const bookingId of userResponse.user.bookings)
        {
          let bookingResponse = await fetch("http://localhost:8080/getBookingSummary/"+bookingId,{
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            }
          })
          bookingResponse = await bookingResponse.json()
          if(bookingResponse.success)
          {
            bookings.push(bookingResponse)
          }
        }
      }
      setUser({...userResponse.user, bookings:bookings})
      console.log({...userResponse.user, bookings:bookings});
    }
    const fetchBookings = async () => {
      console.log("called",user);
      if(user)
      {
        const bookings = []
        for(const bookingId of user.bookings)
        {
          let bookingResponse = await fetch("http://localhost:8080/getBookingSummary/"+bookingId,{
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            }
          })
          bookingResponse = await bookingResponse.json()
          if(bookingResponse.success)
          {
            bookings.push(bookingResponse)
          }
        }
        setUser(bookings)
      }
    }
    fetchUserAndBookings()
  }, [])

  React.useEffect(() => {
    async function fetchUserLikings() {
        console.log("called");
        if(!user)
        {
            console.log("Couldn't fetch user likings because user hasn't logged in!!");
            return
        }
        try {
            let userlikings = await fetch("http://localhost:8080/getUserLikings/"+user._id,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            userlikings = await userlikings.json()
            if(userlikings.success)
            {
                console.log("likings set");
                setUserLikings(userlikings.userlikings)
            }
            else
            {
                console.log(userlikings.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchUserLikings()
}, [user])
  
  

  

  const navigate = useNavigate();

  const drawer = (
    <div >
      <Toolbar />
      <Divider />
      <List>
        {['My Account', 'Completed Dine-in Reservations', 'Upcoming Dine-in Reservations', 'Completed Catering Reservations', 'Upcoming Catering Reservations', 'Saved Restaurants', 'Favourite Restaurants'].map((text, index) => (
          <ListItem key={text} disablePadding>
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

  const container = window !== undefined ? () => window().document.body : undefined;


  const onBookingSummaryClick = (booking) => {
    console.log("Navigating to Booking summary from profilepage");
    navigate("/BookingSummary",{
      state:{
        booking:booking.booking,
        restaurantName:booking.restaurant.name,
        sectionName:booking.section.sectionName,
        city:booking.restaurant.location.District
      }
    })
  }


  return (
    <Box sx={{ display: 'flex'}}>

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
            sx={{ mr: 2, display: { sm: 'none' } }}
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
          sx={{display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop:'4.32em' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          style={{marginTop:"5em"}}
          sx={{display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop:'4.32em' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, marginTop:"1em", p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        
          {user 
          ?
          user.bookings.map((booking, i) => (
            <Paper key={i} elevation={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop:'1em' }} >
              <LocalDiningIcon sx={{ fontSize: "80px" }} />
              <Paper elevation={0} sx={{ display: "flex", flexDirection: "column" }} >
                <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                  {booking.restaurant.name}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  {booking.restaurant.location.District}
                </Typography>
                
                <Typography sx={{ textAlign: "left", marginTop:"1em" }}>
                  {booking.booking.reservationTime}
                </Typography>
                <Paper elevation={0} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop:"1em", alignItems:'flex-start' }} >
                  <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>Diners</Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>
                      {booking.booking.guests.length}
                    </Typography>
                  </div>
                  <div style={{marginLeft:"1em"}}>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>
                      Booking ID
                    </Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>
                      {booking.booking._id}
                    </Typography>
                  </div>
                  {/* <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>Sections</Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>{0}</Typography>
                  </div> */}
                </Paper>
              </Paper>
              <IconButton onClick={() => onBookingSummaryClick(booking)}>
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: "80px" }} />
              </IconButton>
            </Paper>
          ))
          :
          <></>}
      </Box>
    </Box>
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