import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import AdminViewBookings from "./AdminViewBookings";
import List from "@mui/material/List";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import SectionDetails from "./SectionDetails";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import SectionBookings from "./SectionBookings";

const SectionAdminView = (props) => {
  const [age, setAge] = React.useState("");
  const [selectedSectionComp,setSelectedSectionComp]= useState(<Box>No Selection</Box>)

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <Container>
        <Box
          sx={{
            width: " 80vw",
            height: 100,
            backgroundColor: "primary.dark",
            borderRadius: "1em",
            marginTop: "1em",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Typography variant="h5" noWrap component="div" color="white">
                {props.section.sectionName}
              </Typography>
            </Grid>

            <Grid item xs={7}>
              <FormControlLabel
                control={
                  <Switch
                  // checked={props.restaurant.currentStatus==="Open"}
                  // onChange={() => {
                  //   setIsRestaurantLogin(!isRestaurantLogin);
                  // }}
                  />
                }
                label="Open(Section Status)"
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            width: " 100%",
            height: 100,
            backgroundColor: "primary.light",
            borderRadius: "1em",
            marginTop: "1em",
          }}
        >
          <List sx={{ display: "flex" }}>
            {[
              {
                text: <Typography variant="h5">Details</Typography>,
                component: <SectionDetails section={props.section} />,
              },
              {
                text: <Typography variant="h5">Bookings</Typography>,
                component: <AdminViewBookings/>,
              },
              {
                text: <Typography variant="h5">Stats</Typography>,
                component: <div>All Bookings here</div>,
              },
              {
                text: <Typography variant="h5">Menu</Typography>,
                component: <div> Adding a section here</div>,
              },
              {
                text: <Typography variant="h5">Ratings</Typography>,
                component: <div>Remove section here</div>,
              },

              {
                text: <Typography variant="h5">Remove section</Typography>,
                component: <div>Logout</div>,
              },
            ].map(({ text, component }, index) => (
              <ListItem key={text} disablePadding>
                {/* <Link to={path} style={{ textDecoration: "none" }}> */}
                <ListItemButton onClick={() => setSelectedSectionComp(component)}>
                
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText primary={text} style={{ color: "white" }} />
                </ListItemButton>
                {/* </Link> */}
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      {
        selectedSectionComp
      }
     
      {/* Your app content */}
    </div>
  );
};

export default SectionAdminView;

// {
//   text: <Typography variant="h5">Menu</Typography>,
//   text1: (
//     <FormControl sx={{ m: 1, minWidth: 30 }}>
//       <Select value={age} onChange={handleChange} displayEmpty>
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         <MenuItem value={10}>Yes</MenuItem>
//         <MenuItem value={20}>No</MenuItem>
//       </Select>
//     </FormControl>
//   ),
// },
