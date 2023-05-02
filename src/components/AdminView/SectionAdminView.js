import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import List from "@mui/material/List";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SectionAdminView = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <Container>
        <Box
          sx={{
            width: " 100%",
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
                component: <SectionAdminView section={props.section} />,
              },
              {
                text: <Typography variant="h5">Bookings</Typography>,
                component: <div>Restaurant Stats Here</div>,
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
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={text} style={{ color: "white" }} />
                </ListItemButton>
                {/* </Link> */}
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      <Typography variant="h4">Overview</Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box
          sx={{
            width: "40%",
            height: "20%",
            backgroundColor: "white",
            borderRadius: "1em",
            marginTop: "1em",
          }}
        >
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {[
              {
                text: <Typography variant="h5">Avg cost =</Typography>,
                text1: (
                  <Typography variant="h5">{props.section.avgCost}</Typography>
                ),
              },
              {
                text: <Typography variant="h5">Res charge =</Typography>,
                text1: (
                  <Typography variant="h5">
                    {props.section.reservationCharge}
                  </Typography>
                ),
              },
              {
                text: <Typography variant="h5">Capacity =</Typography>,
                text1: (
                  <Typography variant="h5">{props.section.capacity}</Typography>
                ),
              },
              {
                text: <Typography variant="h5">Auto book</Typography>,
                text1: (
                  <FormControl sx={{ m: 1, minWidth: 30 }}>
                    <Select
                      value={props.section.autoAcceptBookings}
                      onChange={handleChange}
                      displayEmpty
                    >
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                ),
              },
            ].map(({ text, text1, tcomponent }, index) => (
              <ListItem key={index} disablePadding>
                {/* <Link to={path} style={{ textDecoration: "none" }}> */}
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={text} style={{ color: "black" }} />
                  <ListItemText primary={text1} style={{ color: "black" }} />
                </ListItemButton>
                {/* </Link> */}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxHeight: 900,
            borderRadius: "1em",
            backgroundColor: "#fff",
            marginTop: "1em",
          }}
        >
          <Typography variant="h5" marginTop="20px" marginBottom="10px">
            {props.section.sectionDescription}
          </Typography>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageList
              sx={{ width: "100%", height: 300 }}
              cols={4}
              rowHeight={164}
            >
              {props.section.secImg.map((img, index) => (
                <ImageListItem key={index} sx={{ position: "relative" }}>
                  <img
                    src={img.url}
                    srcSet={`${img.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={img.public_id}
                    loading="lazy"
                  />
                  <Button
                    sx={{ position: "absolute", right: "0%", top: "3%" }}
                    // onClick={() => removeFile(file)}
                  >
                    <HighlightOffIcon
                      opacity="0.75"
                      sx={{ color: "black", outline: "none" }}
                    />
                  </Button>
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        </Box>
      </Box>

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
