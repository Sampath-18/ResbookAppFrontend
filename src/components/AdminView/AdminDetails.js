import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Rating } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const drawerWidth = 240;

function AdminDetails(props) {
  const [restaurant, setRestaurant] = React.useState(props.restaurant);

  // async function fetchRestaurant(restaurantId) {
  //   try {
  //     const restaurantResponse = await fetch(
  //       "http://localhost:8080/getRestaurant/"+restaurantId,
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
  //       console.log("fetched restaurant:"+restaurantJson.restaurant.name);
  //     } else {
  //       console.log("No Restaurants");
  //       // setIsLoaded(false)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const updateRestaurantStatus = async(event) => {
    try {
      // console.log(event.target.checked);
      const status= event.target.checked ? 'Open':'Close'
      let restaurantResponse = await fetch(
        `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateRestaurantDetails/` + restaurant._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({currentStatus:status}),
        }
      );
      restaurantResponse = await restaurantResponse.json();
      if (restaurantResponse.success) {
        console.log("Updated Restaurant status Successfully");
        setRestaurant({...restaurant,currentStatus:status})
      } else {
        console.log(restaurantResponse.message);
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    setRestaurant(props.restaurant)
  }, [props]);

  return (
    restaurant === null ?
    <div>Restaurant Loading.....</div>
    :
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      {/* <Toolbar /> */}

      <Box
        sx={{
          width: " 100%",
          height: 100,
          backgroundColor: "primary.dark",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Typography variant="h5" noWrap component="div" color="white">
              {restaurant.name}
            </Typography>
          </Grid>

          <Grid item xs={7}>
            <FormControlLabel
              control={
                <Switch
                  checked={restaurant.currentStatus==="Open"}
                  onChange={updateRestaurantStatus}
                />
              }
              label="Open(Restaurant Status)"
            />
          </Grid>
        </Grid>
      </Box>

      {/* <Container
        sx={{
          display: "flex",
          borderRadius: "1em",
          justifyContent: "center",
          marginTop: "1em",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 700,
            height: 500,
            backgroundColor: "primary.dark",
          }}
        >
          <img
            style={{ width: "700px", height: "500px" }}
            src={restaurant.coverImage.url}
            alt={restaurant.coverImage.public_id}
          ></img>
        </Box>
      </Container> */}

      <img
        style={{ width: "90%", height: "400px", marginTop: "1em", }}
        src={restaurant.coverImage.url}
        alt={restaurant.coverImage.public_id}
      ></img>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1em",
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: 50,
            backgroundColor: "primary.dark",
            display: "flex",
            borderRadius: "1em",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" noWrap component="div" color="white">
            Avg cost per person :
          </Typography>
          <Typography variant="h5" noWrap component="div" color="white">
            {restaurant.avgCost}
          </Typography>
        </Box>

        <Box
          style={{ borderColor: "blue" }}
          sx={{
            width: "35%",
            height: 50,
            borderRadius: "1em",
            border: 2,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",

              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={restaurant.parkingAvailable === "Yes"}
                    // onChange={() => {
                    //   setIsRestaurantLogin(!isRestaurantLogin);
                    // }}
                  />
                }
                label="Parking Available?"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        style={{ borderColor: "blue" }}
        sx={{
          width: 300,
          height: 40,
          borderRadius: "1em",
          marginTop: "1em",
          border: 2,
        }}
      >
        <Typography>
          Restaurant Ratings : <Rating name="size-large" value={restaurant.rating.toFixed(2)} />
        </Typography>
      </Box>
    </Box>
  );
}

AdminDetails.propTypes = {
  window: PropTypes.func,
};

export default AdminDetails;
