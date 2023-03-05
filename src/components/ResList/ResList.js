import RestaurantTile from "./RestaurantTile";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from "@mui/system";
import { createSearchParams, useNavigate } from "react-router-dom";

const ResList = () => {


    const restaurants = [
        {
            'name':'Tamasha',
            'Location':'Central Delhi',
            'AvgCost':2000,
            'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/j/p20996-145631488756cd9a0796608.jpg?tr=tr:n-medium',
            'rating':4.2,
            'id':1
        },
        {
            'name':'Unplugged Courtyard',
            'Location':'Central Delhi',
            'AvgCost':3300,
            'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/u/y/p20941-15700828565d959028e9f28.jpg?tr=tr:n-medium',
            'rating':4,
            'id':2
        },
        {
            'name':'Cafe High 5',
            'Location':'Central Delhi',
            'AvgCost':1700,
            'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/d/f/p69146-16614287776307642999f0a.jpg?tr=tr:n-medium',
            'rating':4,
            'id':3
        },
        {
            'name':'Lord of the drinks',
            'Location':'Central Palace',
            'AvgCost':2500,
            'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/o/g/p19975-1649416421625018e5d4198.jpg?tr=tr:n-medium',
            'rating':4.2,
            'id':4
        },
        {
            'name':'38 barracks',
            'Location':'Central Palace',
            'AvgCost':2700,
            'img': 'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/y/j/p21171-166019927162f4a167b10af.jpg?tr=tr:n-medium',
            'rating':4.3,
            'id':5
        },
        {
            'name':'Somewhere Restaurant and Bar',
            'Location':'Central Palace',
            'AvgCost':1000,
            'img': 'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/m/p/p105609-16509585496267a0d52450f.jpg?tr=tr:n-medium',
            'rating':4.1,
            'id':6
        },
        {
            'name':'Ministry of Beer',
            'Location':'Central Delhi',
            'AvgCost':3000,
            'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/a/d/p32381-1495943585592a49a166fe7.jpg?tr=tr:n-medium',
            'rating':4,
            'id':7
        },
        {
            'name':'Dasaprakash',
            'Location':'Central Delhi',
            'AvgCost':800,
            'img':'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/x/t/p98423-1634644819616eb353a1181.jpg?tr=tr:n-medium',
            'rating':4.2,
            'id':8
        }
    ];


    const navigate = useNavigate();

    const onRestaurantClick = (restaurant) => {
        console.log("Restaurant "+restaurant.name+" clicked");
        navigate({
            pathname: "/Restaurants/"+restaurant.id,
            search: createSearchParams({
                restaurant: restaurant
            }).toString()
        });
    };

    return (
        <Container sx={{top : "15%"}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {restaurants.map((restaurant) => (
                        <Grid xs={2} sm={4} md={4} key={restaurant.id}>
                            <RestaurantTile onClick = {() => onRestaurantClick(restaurant)} name={restaurant.name} Location={restaurant.Location} img={restaurant.img} AvgCost={restaurant.AvgCost} rating={restaurant.rating} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
 
export default ResList;