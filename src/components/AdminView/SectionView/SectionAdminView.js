import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";
// import SectionBookings from "./SectionBookings";

const SectionAdminView = (props) => {
  const [selectedSectionComp,setSelectedSectionComp]= useState(<Box>No Selection</Box>)

  const updateSectionStatus = async(event) => {
    try {
      // console.log(event.target.checked);
      const status= event.target.checked ? 'Open':'Close'
      let sectionResponse = await fetch(
        "http://localhost:8080/updateSectionDetails/" + props.section._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({currentStatus:status}),
        }
      );
      sectionResponse = await sectionResponse.json();
      if (sectionResponse.success) {
        console.log("Updated Section status Successfully");
        props.updateRestaurant()
      } else {
        console.log(sectionResponse.message);
      }
    } catch (error) {
      console.error(error)
    }
  }

  // const navigate = useNavigate()

  const deleteSection = async (sectionId,restaurantId) => {
    try {
      // setEdit(false);
      // console.log(eitem);
      let deleteSectionResponse = await fetch(
        "http://localhost:8080/deleteSection/" + sectionId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      deleteSectionResponse = await deleteSectionResponse.json();
      if (deleteSectionResponse.success) {
        console.log("Deleted Section Successfully");
        // console.log("set update restaurant");
        props.updateRestaurant()
      } else {
        console.log(deleteSectionResponse.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      
    }
  }

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
                  checked={props.section.currentStatus==="Open"}
                  onChange={updateSectionStatus}
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
                component: <div>Ratings here</div>,
              },

              {
                text: <Typography variant="h5">Remove section</Typography>,
                component: <Container>
                  <Typography>Are you sure, Do you want to remove the section? This action is irreversible</Typography>
                  <Button variant="outlined" sx={{backgroundColor:"red",color:"white"}} onClick={() => deleteSection(props.section._id,props.restaurant._id)}>Delete</Button>
                </Container>,
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
