import RestaurantTile from "./RestaurantTile";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

const ResList = (props) => {
  // let restaurants = [
  //     {
  //         'name':'Tamasha',
  //         'Location':'Central Delhi',
  //         'AvgCost':2000,
  //         'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/j/p20996-145631488756cd9a0796608.jpg?tr=tr:n-medium',
  //         'rating':4.2,
  //         'id':1
  //     },
  //     {
  //         'name':'Unplugged Courtyard',
  //         'Location':'Central Delhi',
  //         'AvgCost':3300,
  //         'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/u/y/p20941-15700828565d959028e9f28.jpg?tr=tr:n-medium',
  //         'rating':4,
  //         'id':2
  //     },
  //     {
  //         'name':'Cafe High 5',
  //         'Location':'Central Delhi',
  //         'AvgCost':1700,
  //         'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/d/f/p69146-16614287776307642999f0a.jpg?tr=tr:n-medium',
  //         'rating':4,
  //         'id':3
  //     },
  //     {
  //         'name':'Lord of the drinks',
  //         'Location':'Central Palace',
  //         'AvgCost':2500,
  //         'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/o/g/p19975-1649416421625018e5d4198.jpg?tr=tr:n-medium',
  //         'rating':4.2,
  //         'id':4
  //     },
  //     {
  //         'name':'38 barracks',
  //         'Location':'Central Palace',
  //         'AvgCost':2700,
  //         'img': 'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/y/j/p21171-166019927162f4a167b10af.jpg?tr=tr:n-medium',
  //         'rating':4.3,
  //         'id':5
  //     },
  //     {
  //         'name':'Somewhere Restaurant and Bar',
  //         'Location':'Central Palace',
  //         'AvgCost':1000,
  //         'img': 'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/m/p/p105609-16509585496267a0d52450f.jpg?tr=tr:n-medium',
  //         'rating':4.1,
  //         'id':6
  //     },
  //     {
  //         'name':'Ministry of Beer',
  //         'Location':'Central Delhi',
  //         'AvgCost':3000,
  //         'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/a/d/p32381-1495943585592a49a166fe7.jpg?tr=tr:n-medium',
  //         'rating':4,
  //         'id':7
  //     },
  //     {
  //         'name':'Dasaprakash',
  //         'Location':'Central Delhi',
  //         'AvgCost':800,
  //         'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/x/t/p98423-1634644819616eb353a1181.jpg?tr=tr:n-medium',
  //         'rating':4.2,
  //         'id':8
  //     }
  // ];

  const [restaurants, setRestaurants] = React.useState(null);
  const [userlikings, setUserLikings] = React.useState(null);

  const { user, login, logout } = React.useContext(UserContext);
  async function fetchRestaurants() {
    try {
      let restaurantsResponse = null;
      let isRecommendations=false;
      let recommendationResponse=null;
      if (props.restaurantIds) {
        console.log(
          "fetching restaurants into list using ids provided:",
          props.restaurantIds
        );
        restaurantsResponse = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getRestaurantWithIds`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ restaurantIds: props.restaurantIds }),
          }
        );
      } else if (user) {
        
        console.log(
          `fetching recommended restaurants as user is logged in from:${process.env}`
        );
        console.log(process.env);
        recommendationResponse = await fetch(
          `${process.env.REACT_APP_PYTHON_BACKEND_API_ENDPOINT}/getRecommendations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user._id, location: "Nagpur", topN:10}),
          }
        );
        recommendationResponse = await recommendationResponse.json();
        console.log(recommendationResponse);
        console.log( Object.keys(recommendationResponse.recommended_restaurantIds));//recommendationResponse.recommended_restaurantIds.map((id) => id[0]) );
        if (recommendationResponse.success) {
          restaurantsResponse = await fetch(
            `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getRestaurantWithIds`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                restaurantIds: Object.keys(recommendationResponse.recommended_restaurantIds)
              }), //recommendationResponse.recommended_restaurantIds.map( (id) => id[0] ),
            }
          );
          isRecommendations = true
        } else {
          console.log("failed to get recommendations");
          restaurantsResponse = await fetch(
            `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getRestaurants`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      } else
        restaurantsResponse = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getRestaurants`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      const restaurantsJson = await restaurantsResponse.json();
      // console.log(restaurantsJson)
      if(isRecommendations)
      {
        restaurantsJson.restaurants.sort((a, b) => recommendationResponse.recommended_restaurantIds[b._id] - recommendationResponse.recommended_restaurantIds[a._id]);
      }
      if (restaurantsJson.success) {
        console.log(restaurantsJson.restaurants);

        let restaurantsCopy = [];
        for (const restaurant of restaurantsJson.restaurants) {
          restaurantsCopy.push({
            name: restaurant.name,
            _id: restaurant._id,
            avgCost: restaurant.avgCost,
            city: restaurant.location.District,
            img: restaurant.coverImage.url,
            rating: restaurant.rating,
            currentStatus: restaurant.currentStatus
          });
        }
        setRestaurants(restaurantsCopy);
      } else {
        console.log("No Restaurants");
        // setIsLoaded(false)
      }
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    console.log("props updated");
    fetchRestaurants();
    console.log("Restaurants fetched again!!");
  }, [props, user]);

  React.useEffect(() => {
    async function fetchUserLikings() {
      // console.log("called");
      if (!user) {
        console.log(
          "Couldn't fetch user likings because user hasn't logged in!!"
        );
        return;
      }
      console.log("fetched likings reslist");
      try {
        let userlikings = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getUserLikings/` + user._id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        userlikings = await userlikings.json();
        if (userlikings.success) {
          // console.log("likings set");
          setUserLikings(userlikings.userlikings);
        } else {
          console.log(userlikings.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserLikings();
  }, [user]);

  React.useEffect(() => {
    // update userlikings in the previous page/ parent component

    if (props.updateProps) {
      console.log("updating userlikings in parent");
      props.updateProps(userlikings);
    }
  }, [userlikings]);

  const navigate = useNavigate();

  const onRestaurantClick = (restaurant) => {
    console.log("Restaurant " + restaurant.name + " clicked");
    navigate("/Restaurants/" + restaurant._id, {
      state: { userlikings: userlikings },
    });
  };

  return restaurants === null ? (
    <Typography sx={{marginTop:props.mt ? props.mt :0 }} variant="h4">
      Don't get upset, poonakalu Loading.....
    </Typography>
  ) : (
    <Container sx={{ top: "15%",marginTop:props.mt ? props.mt :0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {restaurants.map((restaurant) => (
            <Grid xs={2} sm={4} md={4} key={restaurant.id}>
              <RestaurantTile
                onClick={() => onRestaurantClick(restaurant)}
                restaurant={restaurant}
                userlikings={userlikings}
                updateUserlikings={(userlikings) => setUserLikings(userlikings)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ResList;
