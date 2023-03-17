import React from "react";
import { Typography, Paper, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

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
  const addRestaurantToDB = async (event) => {
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
        if (restaurantResponseData.success) {
          //restaurant added successfully
          console.log(
            "Restaurant:",
            restaurant.name,
            "added successfully to DB"
          );
          const resId = restaurantResponseData.restaurantId;
          for (let section of sections) {
            const menu = section.menu;
            console.log(
              "section adding:",
              JSON.stringify({ ...section, menu: [] })
            );
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
                for (const menuCategory of menu) {
                  console.log(
                    "category adding:",
                    JSON.stringify({ categoryName: menuCategory.categoryName })
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
                console.log("Section addition failed");
              }
            });
          }
        } else {
          // notify user that restaurant addition failed
          console.log("Restaurant addition failed");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ marginTop: "1em" }}>
      <Typography variant="h3">Restaurant Details</Typography>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign:"left",
          marginLeft:"8%",
          width:"84%",
          marginTop:"1.5em"
        }}
      >
        <Paper elevation={0} sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}>
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Restaurant Name:</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.name}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Parking Available?</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.parkingAvailable}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography variant="h6" sx={{ fontWeight:"bold", marginLeft:"1em" }}>
            Admin
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Admin Name</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.admin.name}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Email</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.admin.email}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Phone1</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.admin.phone1}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Phone2</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.admin.phone2}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ fontWeight:"bold", marginLeft:"1em" }} variant="h6">
            Location Details:
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Longitude</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.location.Longitude}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Latitude</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.location.Latitude}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Country</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.location.Country}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>State</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.location.State}</Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}
        >
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>District</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.location.District}</Typography>
        </Paper>

        <Paper elevation={0} sx={{ display: "flex", flexDirection: "row", marginTop:"0.5em" }}>
          <Typography sx={{ width: "20%", color:"#7a1860", fontWeight:"bold", marginLeft:"1em" }}>Road</Typography>
          <Typography sx={{color:"#5e5c5e", fontWeight:"bold"}}>{restaurant.location.Road}</Typography>
        </Paper>
      </Paper>
      <Typography variant="h3" sx={{marginTop:"1em"}}>Sections</Typography>
      {sections.map((section) => {
        return (
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Paper>
              <Typography variant="h4">section Name</Typography>
              <Typography>Section Description </Typography>
              <Typography>Capacity </Typography>
              <Typography>Dine-in Available </Typography>
              <Typography>Auto-Accept Bookings? </Typography>
              <Typography>Catering Available? </Typography>
              <Typography>Avg Cost </Typography>
              <Typography>Rating </Typography>
              <Typography>Reservation Charge </Typography>
              <Typography>SecImg </Typography>
              <Typography>Menu </Typography>
              <Typography>Timing </Typography>
            </Paper>
            <Paper>
              <Typography>{section.sectionName}</Typography>
              <Typography>{section.sectionDescription} </Typography>
              <Typography>{section.capacity} </Typography>
              <Typography>{section.dineinAvailable} </Typography>
              <Typography>{section.autoAcceptBookings} </Typography>
              <Typography>{section.cateringAvailable} </Typography>
              <Typography>{section.avgCost} </Typography>
              <Typography>{section.rating} </Typography>
              <Typography>{section.reservationCharge} </Typography>
              <Typography>{JSON.stringify(section.secImg)} </Typography>
              <Typography>{JSON.stringify(section.menu)} </Typography>
              <Typography>{JSON.stringify(section.timing)} </Typography>
            </Paper>
          </Paper>
        );
      })}
      <Button onClick={(event) => addRestaurantToDB(event)}>Submit</Button>
    </Paper>
  );
};

export default ReviewAddRestaurant;
