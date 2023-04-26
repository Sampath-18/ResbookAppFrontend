// import React from 'react'
import * as React from "react";
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
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminDetails from "./AdminDetails";
import SectionAdminView from "./SectionAdminView";
import MyProfile from "./MyProfile";
import { useParams } from "react-router-dom";

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

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState(<Box>No selection</Box>)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "Restaurant Details", component: <AdminDetails restaurantId={id} /> },
          { text: "Sections", component: <SectionAdminView /> },
          { text: "Statistics", component: <div>Restaurant Stats Here</div> },
          { text: "Bookings", component: <div>All Bookings here</div> },
          { text: "Add Section", component: <div> Adding a section here</div> },
          { text: "Remove Restaurant", component: <div>Remove section here</div> },
          { text: "Profile", component: <MyProfile /> },
          { text: "Log Out", component: <div>Logout</div> },
        ].map(({ text, component }, index) => (
          <ListItem key={text} disablePadding>
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
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        //       ''
        // | 'fixed'
        // | 'relative'
        // | 'static'
        // | 'sticky'

        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          marginTop: "4.3em",
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

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h5" noWrap component="div">
                Admin View
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <AccountCircleRoundedIcon fontSize="large" />
            </Grid>

            <Grid item xs={4}>
              <EditIcon fontSize="large" />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}

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
