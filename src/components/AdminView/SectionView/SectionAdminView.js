import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import AdminViewBookings from "./AdminViewBookings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import SectionDetails from "./SectionDetails";
import Switch from "@mui/material/Switch";
import SectionMenu from "./SectionMenu/SectionMenu";
// import SectionBookings from "./SectionBookings";

const SectionAdminView = (props) => {
  const [age, setAge] = React.useState("");
  const [selectedSectionComp,setSelectedSectionComp]= useState(<Box>No Selection</Box>)

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    setSelectedSectionComp(<SectionDetails section={props.section} />)
  }, [props])
  // console.log(props);

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
                component: <AdminViewBookings sections={[props.section]} restaurant={props.restaurant} />,
              },
              {
                text: <Typography variant="h5">Stats</Typography>,
                component: <div>All Bookings here</div>,
              },
              {
                text: <Typography variant="h5">Menu</Typography>,
                component: <SectionMenu sectionId={props.section._id} />,
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
              <ListItem key={index} disablePadding>
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
