// import React from 'react'
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminDetails from "./AdminDetails";
import SectionAdminView from "./SectionView/SectionAdminView";
import MyProfile from "./MyProfile";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminViewBookings from "./SectionView/AdminViewBookings";
import AddNewSection from "./AddNewSection";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const AdminView = (props) => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = React.useState(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState( <AdminDetails restaurant={restaurant} /> );
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // console.log("called");
  async function fetchRestaurant(restaurantId) {
    // console.log("called");
    try {
      const restaurantResponse = await fetch(
        "http://localhost:8080/getRestaurant/" + restaurantId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const restaurantJson = await restaurantResponse.json();
      // console.log("hi");
      if (restaurantJson.success) {
        let sections = await fetch(
          "http://localhost:8080/" + restaurantId + "/getSections",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        sections = await sections.json();
        // console.log(sections);
        if (sections.success) {
          // console.log("sections",sections)
          restaurantJson.restaurant["sections"] = sections.sections;
        }
        setRestaurant(restaurantJson.restaurant);
        // console.log("fetched restaurant:" + restaurantJson.restaurant.name);
        // console.log(restaurantJson.restaurant);
      } else {
        console.log("No Restaurants");
        // setIsLoaded(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function fetchRestaurant(restaurantId) {
  //   try {
  //     const restaurantResponse = await fetch(
  //       "http://localhost:8080/getRestaurant/" + restaurantId,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const restaurantJson = await restaurantResponse.json();
  //     if (restaurantJson.success) {
  //       setRestaurant(restaurantJson.restaurant);
  //       console.log("fetched restaurant:" + restaurantJson.restaurant.name);
  //     } else {
  //       console.log("No Restaurants");
  //       // setIsLoaded(false)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {restaurant ? (
        <List>
          <ListItem key={"Restaurant Details"} disablePadding>
            {/* <Link to={path} style={{ textDecoration: "none" }}> */}
            <ListItemButton
              onClick={() =>
                setSelectedComponent(<AdminDetails restaurant={restaurant} />)
              }
            >
              <ListItemIcon>
                {1 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={"Restaurant Details"}
                style={{ color: "black" }}
              />
            </ListItemButton>
            {/* </Link> */}
          </ListItem>
          <ListItem key={"Restaurant Sections"} disablePadding>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Sections</Typography>
              </AccordionSummary>
              {restaurant ? (
                <AccordionDetails>
                  {restaurant.sections.map((section, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() =>
                        setSelectedComponent(
                          <SectionAdminView
                            section={section}
                            restaurant={restaurant}
                            updateRestaurant={() => setUpdateRestaurant(!updateRestaurant)}
                          />
                        )
                      }
                    >
                      <ListItemIcon>
                        {1 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={section.sectionName}
                        style={{ color: "black" }}
                      />
                    </ListItemButton>
                  ))}
                </AccordionDetails>
              ) : (
                <Typography>poonakalu loading</Typography>
              )}
            </Accordion>
          </ListItem>
          {[
            { text: "Statistics", component: <div>Restaurant Stats Here</div> },
            {
              text: "Bookings",
              component: (
                <AdminViewBookings
                  restaurant={restaurant}
                  sections={restaurant.sections}
                />
              ),
            },
            {
              text: "Add Section",
              component: <AddNewSection updateRestaurant={() => setUpdateRestaurant(!updateRestaurant)} restaurantId={restaurant._id} />,
            },
            {
              text: "Remove Restaurant",
              component: <div>Remove Restaurant here</div>,
            },
            {
              text: "Profile",
              component: <MyProfile restaurant={restaurant} setAdminDetails={(admin)=>setRestaurant({...restaurant,admin:admin})} />,
            },
            { text: "Log Out", component: (<Typography marginLeft='2em'>Are you sure, do you want to logout?<Button sx={{backgroundColor:'green',color:'white',ml:'1em','&:hover':{backgroundColor:'#06ad03',color:'white'}}} onClick={() => navigate('/')}>Yes</Button></Typography>) },
          ].map(({ text, component }, index) => (
            <ListItem key={index} disablePadding>
              {/* <Link to={path} style={{ textDecoration: "none" }}> */}
              <ListItemButton onClick={() => setSelectedComponent(component)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: "black" }} />
              </ListItemButton>
              {/* </Link> */}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h5">Fetching Restaurant</Typography>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [updateRestaurant,setUpdateRestaurant] = useState(false);// variable to set whenever we want restaurant to to be reloaded may be due to updates
    
  useEffect(() => {
    fetchRestaurant(id);
  }, [updateRestaurant]);

  useEffect(() => {
    setSelectedComponent(<AdminDetails restaurant={restaurant} />)
  }, [restaurant])
  


  return (
    restaurant ?
    <Box sx={{ display: "flex",marginTop:'2em' }}>
      <CssBaseline />

      {/* Box for drawer */}
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
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {selectedComponent}
    </Box>
    :
    <Typography>Loading Restaurant</Typography>
  );
};

AdminView.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminView;

// { text: "Restaurant Details", component: <AdminDetails restaurant={restaurant} /> },
