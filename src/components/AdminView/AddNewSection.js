import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIntake from "../AddRestaurant/MenuIntake";
import PhotoUploader from "../AddRestaurant/PhotoUploader";
import axios from "axios";

const AddNewSection = (props) => {
  const [section, setSection] = useState({
    sectionName: "",
    sectionDescription: "",
    secImg: [],
    avgCost: 0,
    reservationCharge: 0,
    capacity: 0,
    dineinAvailable: "No",
    autoAcceptBookings: "No",
    cateringAvailable: "No",
    timing: {},
    menu: [],
    reviews: [],
    ratings: [],
    cuisines: "",
    searchTags: "",
  });

  const AddSectionToDB = async () => {
    try {
      const menu = section.menu;
      const sectionResponse = await fetch(
        `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateRestaurant/addSection/` +
          props.restaurantId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...section, menu: [] }),
        }
      );
      sectionResponse.json().then(async (sectionResponseData) => {
        if (sectionResponseData.success) {
          const secId = sectionResponseData.sectionId;
          console.log(
            "Section:",
            section.sectionName,
            "added to Restaurant:",
            props.restaurantId,
            "successfully to DB"
          );
          let formData = new FormData();
          for (const image of section.secImg) {
            formData.append("secImg", image);
          }

          // for (const key of formData.keys()) {
          //   console.log(key);
          // }

          const boundary = Math.random().toString().substr(2);
          // let imgResponse = await fetch(
          //   `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateSectionImages/` + secId,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "multipart/form-data; boundary="+boundary
          //     },
          //     body: formData,
          //   }
          // );
          let imgResponse = await axios.post(
            `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateSectionImages/` + secId,
            formData,
            {
              "Content-Type": "multipart/form-data; boundary=" + boundary,
            }
          );
          imgResponse = imgResponse.data;
          // console.log("image response:",imgResponse);
          if (imgResponse.success) {
            console.log(
              "images uploaded succesfully for",
              section.sectionName,
              " : ",
              props.restaurantId
            );
            for (const menuCategory of menu) {
              console.log(
                "category adding:",
                JSON.stringify({
                  categoryName: menuCategory.categoryName,
                })
              );
              const menucategoryResponse = await fetch(
                `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateRestaurant/updateSection/addMenuCategory/` +
                  secId,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    categoryName: menuCategory.categoryName,
                  }),
                }
              );
              menucategoryResponse.json().then(async (categoryResponseData) => {
                if (categoryResponseData.success) {
                  const categoryId = categoryResponseData.menuCategoryId;
                  // console.log("category:",categoryId)
                  console.log(
                    "Menu Category:",
                    menuCategory.categoryName,
                    "added to Section:",
                    section.sectionName,
                    "successfully to DB"
                  );
                  for (const menuItem of menuCategory.menuItems) {
                    console.log("item adding:", JSON.stringify(menuItem));
                    // console.log("End point called:","http://localhost:8080/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/"+categoryId)
                    const menuItemResponse = await fetch(
                      `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/` +
                        categoryId,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(menuItem),
                      }
                    );
                    menuItemResponse.json().then(async (menuItemData) => {
                      if (menuItemData.success) {
                        console.log(
                          "Menu Item:",
                          menuItem.itemName,
                          "added to Menu Category:",
                          menuCategory.categoryName,
                          "successfully to DB"
                        );
                      } else {
                        // notify user that menu item addition failed
                        console.log("Menu Item addition failed");
                      }
                    });
                  }
                } else {
                  // notify user that menu category addition failed
                  console.log("Menu Category addition failed");
                }
              });
            }
          } else {
            // notify user that section addition failed
            console.log("image addition failed");
          }
        } else {
          // notify user that section addition failed
          console.log("Section addition failed");
        }
      });
    } catch (error) {
      console.error(error);
    } finally{
      props.updateRestaurant()
    }
  };

  const onSectionDetailChange = (event) => {
    setSection({ ...section, [event.target.name]: event.target.value });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "65%",
          }}
        >
          <Paper elevation={3} sx={{ marginTop: "1em", padding: "1em" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Section name"
                  variant="outlined"
                  value={section.sectionName}
                  name="sectionName"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Cost for 2"
                  variant="outlined"
                  value={section.avgCost}
                  name="avgCost"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Capacity"
                  variant="outlined"
                  value={section.capacity}
                  name="capacity"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              {/* <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="photos"
                  variant="outlined"
                  value={props.secImg}
                  name="secImg"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid> */}
              <Grid item xs={2} sm={4} md={4}>
                <Box sx={{}}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Catering available?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={section.cateringAvailable}
                      name="cateringAvailable"
                      label="Catering available?"
                      onChange={(event) => onSectionDetailChange(event)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="reservationCharge"
                  variant="outlined"
                  value={section.reservationCharge}
                  name="reservationCharge"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Search tags"
                  variant="outlined"
                  value={section.searchTags}
                  name="searchTags"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Box sx={{}}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Dine-in available
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={section.dineinAvailable}
                      label="Dine-in available"
                      name="dineinAvailable"
                      onChange={(event) => onSectionDetailChange(event)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Cuisines"
                  variant="outlined"
                  value={section.cuisines}
                  name="cuisines"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Box sx={{}}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      AutoAccept Bookings
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={section.autoAcceptBookings}
                      name="autoAcceptBookings"
                      label="AutoAccept Bookings"
                      onChange={(event) => onSectionDetailChange(event)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={4} sm={8} md={8}>
                <TextField
                  label="Description"
                  variant="outlined"
                  id="filled-textarea"
                  multiline
                  fullWidth
                  minRows={4}
                  value={section.sectionDescription}
                  name="sectionDescription"
                  onChange={(event) => onSectionDetailChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Typography sx={{ marginTop: "1em" }}>
                  Open Time:
                  <input
                    style={{ marginLeft: "1em" }}
                    type="time"
                    name="OpenTime"
                    onChange={(event) => onSectionDetailChange(event)}
                  />
                </Typography>
                <Typography sx={{ marginTop: "1em" }}>
                  Close Time:
                  <input
                    style={{ marginLeft: "1em" }}
                    type="time"
                    name="CloseTime"
                    onChange={(event) => onSectionDetailChange(event)}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <MenuIntake
            setMenu={(menu) => setSection({ ...section, menu: menu })}
          />
        </Container>
        {/* <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "35%",
          }}
        >
            
          <TimingsIntake timing={props.timing} setTimings={(timing) => props.setTimings(timing)} />
          <Button
            sx={{ marginTop: "1em" }}
            variant="contained"
            onClick={() => handleRemoveSection()}
          >
            Remove Section
          </Button>
        </Container> */}
        <Button variant="outlined" style={{backgroundColor:"green",color:"white", height:100, marginTop:'5em'}} onClick={() => AddSectionToDB()}>Save</Button>
      </Container>
      <Container sx={{ marginTop: "1em" }}>
        <PhotoUploader
          setSecImg={(secImg) => setSection({ ...section, secImg: secImg })}
        />
      </Container>
    </Container>
  );
};

export default AddNewSection;
