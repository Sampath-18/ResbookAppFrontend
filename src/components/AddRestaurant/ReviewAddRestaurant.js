import React from "react";
import { Typography, Paper, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const ReviewAddRestaurant = () => {
  const location = useLocation();
  const { restaurant, sections } = location.state;
  // const { restaurant, sections } = {
  //   restaurant: {
  //     name: "Arabian Taj",
  //     location: {
  //       Longitude: 20,
  //       Latitude: 79,
  //       State: "Maharastra",
  //       District: "Nagpur",
  //       Country: "India",
  //       Road: "Unnamed Road, 521111, Nagpur, Maharastra",
  //     },
  //     admin: {
  //       name: "Sai kumar",
  //       email: "Ataj1@gmail.com",
  //       phone1: 8756387322,
  //       phone2: 8953768323,
  //       password: "hvfs",
  //     },
  //     parkingAvailable: "Yes",
  //   },
  //   sections: [{
  //     "sectionName": "Bar",
  //     "sectionDescription": "Alcoholics this one is for you",
  //     "secImg": [],
  //     "capacity": 60,
  //     "dineinAvailable": "Yes",
  //     "autoAcceptBookings": "Yes",
  //     "cateringAvailable": "Yes",
  //     "avgCost": 1200,
  //     "rating": 4,
  //     "timing": {
  //       "Monday": {
  //         "open_time": "11:57",
  //         "close_time": "11:54"
  //       },
  //       "Tuesday": {
  //         "open_time": "12:52",
  //         "close_time": "17:00"
  //       },
  //       "Wednesday": {
  //         "open_time": "08:00",
  //         "close_time": "21:30"
  //       },
  //       "Thursday": {
  //         "open_time": "08:30",
  //         "close_time": "23:00"
  //       },
  //       "Friday": {
  //         "open_time": "17:00",
  //         "close_time": "03:29"
  //       },
  //       "Saturday": {
  //         "open_time": "12:00",
  //         "close_time": "23:00"
  //       },
  //       "Sunday": {
  //         "open_time": "14:59",
  //         "close_time": "22:53"
  //       }
  //     },
  //     "menu": [],
  //     "reservationCharge": 25
  //   }],
  // };

  // After complete review by the Admin, add the restaurant to DB and acknowledge him with the status

  // const imageReform = (file) => {
  //   const Reader = new FileReader();
  //   Reader.readAsDataURL(file)

  //   //readyState = 0 => initialState
  //   //readyState = 1 => processing
  //   //readyState = 2 => Processed
  //   Reader.onload = () => {
  //     if (Reader.readyState === 2) {
  //       return Reader.result;
  //     }
  //   }
  // }

  const navigate=useNavigate()

  const addRestaurantToDB = async (event) => {
    console.log(location.state);
    event.preventDefault();
    try {
      const AddRestaurantResponse = await fetch(
        "http://localhost:8080/addRestaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restaurant),
        }
      );
      AddRestaurantResponse.json().then(async (restaurantResponseData) => {
        // console.log(restaurantResponseData);
        if (restaurantResponseData.success) {
          //restaurant added successfully
          console.log(
            "Restaurant:",
            restaurant.name,
            "added successfully to DB"
          );
          const resId = restaurantResponseData.restaurantId;
          let formData1 = new FormData();
          // console.log(restaurant.coverImage)
          formData1.append("coverImage", restaurant.coverImage);
          const boundary1 = Math.random().toString().substr(2);
          let imgResponse1 = await axios.post(
            "http://localhost:8080/updateRestaurant/updateImage/" + resId,
            formData1,
            {
              "Content-Type": "multipart/form-data; boundary=" + boundary1,
            }
          );
          imgResponse1 = imgResponse1.data;
          if (imgResponse1.success) {
            console.log("Cover Image for restaurant added successfully");
          }
          for (let section of sections) {
            const menu = section.menu;
            const sectionResponse = await fetch(
              "http://localhost:8080/updateRestaurant/addSection/" + resId,
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
                  restaurant.name,
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
                //   "http://localhost:8080/updateSectionImages/" + secId,
                //   {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "multipart/form-data; boundary="+boundary
                //     },
                //     body: formData,
                //   }
                // );
                let imgResponse = await axios.post(
                  "http://localhost:8080/updateSectionImages/" + secId,
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
                    restaurant.name
                  );
                  for (const menuCategory of menu) {
                    console.log(
                      "category adding:",
                      JSON.stringify({
                        categoryName: menuCategory.categoryName,
                      })
                    );
                    const menucategoryResponse = await fetch(
                      "http://localhost:8080/updateRestaurant/updateSection/addMenuCategory/" +
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
                    menucategoryResponse
                      .json()
                      .then(async (categoryResponseData) => {
                        if (categoryResponseData.success) {
                          const categoryId =
                            categoryResponseData.menuCategoryId;
                          // console.log("category:",categoryId)
                          console.log(
                            "Menu Category:",
                            menuCategory.categoryName,
                            "added to Section:",
                            section.sectionName,
                            "successfully to DB"
                          );
                          for (const menuItem of menuCategory.menuItems) {
                            console.log(
                              "item adding:",
                              JSON.stringify(menuItem)
                            );
                            // console.log("End point called:","http://localhost:8080/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/"+categoryId)
                            const menuItemResponse = await fetch(
                              "http://localhost:8080/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/" +
                                categoryId,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(menuItem),
                              }
                            );
                            menuItemResponse
                              .json()
                              .then(async (menuItemData) => {
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
          }
          console.log(
            "-----------------------Addition of restaurant to DB successfully completed------------------------"
          );
          navigate('/')
        } else {
          // notify user that restaurant addition failed
          console.log("Restaurant addition failed");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(sections);
  return (
    <Paper elevation={3} sx={{ marginTop: "1em" }}>
      <Typography variant="h3">Restaurant Details</Typography>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginLeft: "8%",
          width: "84%",
          marginTop: "1.5em",
        }}
      >
        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Restaurant Name:
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.name}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Parking Available?
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.parkingAvailable}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginLeft: "1em" }}
          >
            Admin
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Admin Name
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.admin.name}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Email
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.admin.email}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Phone1
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.admin.phone1}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Phone2
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.admin.phone2}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "1em" }}
            variant="h6"
          >
            Location Details:
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Longitude
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.location.Longitude}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Latitude
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.location.Latitude}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Country
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.location.Country}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            State
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.location.State}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            District
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.location.District}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
        >
          <Typography
            sx={{
              width: "20%",
              color: "#7a1860",
              fontWeight: "bold",
              marginLeft: "1em",
            }}
          >
            Road
          </Typography>
          <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
            {restaurant.location.Road}
          </Typography>
        </Paper>
      </Paper>
      <Typography variant="h3" sx={{ marginTop: "1em" }}>
        Sections
      </Typography>
      {sections.map((section) => {
        return (
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginTop: "1em",
            }}
          >
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                section Name
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.sectionName}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Section Description
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.sectionDescription}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Capacity
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.capacity}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Dine-in available:
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.dineinAvailable}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Auto accepts bookings:
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.autoAcceptBookings}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Catering Available:
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.cateringAvailable}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Avg cost per 2 persons
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.avgCost}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Rating
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.rating}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                cuisines
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.cuisines.toString()}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                searchTags
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.searchTags.toString()}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Reservation Charge
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {section.reservationCharge}
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Images
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {JSON.stringify(section.secImg)}
              </Typography>
            </Paper>
            
              <Typography
              variant="h3"
                sx={{
                  width: "100%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                  textAlign:'center',
                  display: "flex",
                  justifyContent:'center',
                  alignItems:'center'
                }}
              >
                Menu
              </Typography>
              <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em",justifyContent:'space-around' }}
            >
              <Typography>
                {Array.from(section.menu).map((menu) => (
                  <Paper
                    elevation={0}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#444545",display: "flex",alignItems: "center", }}
                    >
                      {menu.categoryName}
                    </Typography>
                    {menu.menuItems.map((item) => (
                      <Paper
                        elevation={0}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "1em",
                          marginTop: "1em",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "#7a1860" }}
                        >
                          {item.itemName}
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          {item.quantities.map((quantity) => (
                            <Typography
                              variant="body1"
                              sx={{ marginLeft: "1.5em", textAlign: "left" }}
                            >
                              {quantity.quantity}({quantity.cost}/-)(avgPersons:
                              {quantity.avgPersons})
                            </Typography>
                          ))}
                        </Paper>
                      </Paper>
                    ))}
                  </Paper>
                ))}
                {/* <h1>{JSON.stringify(section.menu)}</h1> */}
              </Typography>
            
            </Paper>
            <Paper
              elevation={0}
              sx={{ display: "flex", flexDirection: "row", marginTop: "0.5em" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  color: "#7a1860",
                  fontWeight: "bold",
                  marginLeft: "1em",
                }}
              >
                Timings
              </Typography>
              <Typography sx={{ color: "#5e5c5e", fontWeight: "bold" }}>
                {Object.keys(section.timing).map((day) => <Typography>{day}:{section.timing[day].open_time} to {section.timing[day].close_time}</Typography>)}
              </Typography>
              {/* {
                (section.timing).map((item)=>{
<h1>{item}</h1>
                })
              } */}
            </Paper>
          </Paper>
        );
      })}
      <Button
        variant="contained"
        sx={{ margin: "1em" }}
        onClick={(event) => addRestaurantToDB(event)}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default ReviewAddRestaurant;
