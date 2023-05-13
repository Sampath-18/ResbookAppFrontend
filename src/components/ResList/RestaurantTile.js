import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function RestaurantTile(props) {
  // const restaurant = props.restaurant
  // const userlikings = props.userlikings

  // console.log(userlikings ? userlikings.savedRestaurants : "no user");
  const [isRestaurantSaved, setIsRestaurantSaved] = React.useState(false)//userlikings ? (userlikings.savedRestaurants.findIndex(restaurant => restaurant.equals(restaurant._id))!==-1) : false)
  const [isRestaurantFavorited, setIsRestaurantfavorited] = React.useState(false)//userlikings ? userlikings.favRestaurants.findIndex(restaurant => restaurant.equals(restaurant._id))!==-1 : false)

  React.useEffect(() => {
    if(props.userlikings)
    {
      console.log("props.userlikings updated")
      setIsRestaurantSaved(props.userlikings ? (props.userlikings.savedRestaurants.findIndex(restaurantId => restaurantId===props.restaurant._id)!==-1) : false)
      setIsRestaurantfavorited(props.userlikings ? (props.userlikings.favRestaurants.findIndex(restaurantId => restaurantId===props.restaurant._id)!==-1) : false)
    }
  }, [props])
  
  const onSaveRestaurant = async () => {
    if(!props.userlikings)
    {
      alert("Login to save!!!")
      return
    }
    const operation = isRestaurantSaved ? "$pull":"$addToSet"
    try {
      let response = await fetch(`${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateUserLikings/`+props.userlikings.userId,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({operation:operation,favType:"savedRestaurants",id:props.restaurant._id})
      })
      response = await response.json()
      if(response.success)
      {
        console.log("Saved restaurant",props.restaurant._id);
        props.updateUserlikings(response.userlikings)
        // setIsRestaurantSaved(!isRestaurantSaved)
      }
      else
      {
        console.log("Saving restaurant failed...");
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onFavoriteRestaurant = async () => {
    if(!props.userlikings)
    {
      alert("Login to favorite!!!")
      return
    }
    const operation = isRestaurantFavorited ? "$pull":"$addToSet"
    try {
      let response = await fetch(`${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateUserLikings/`+props.userlikings.userId,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({operation:operation,favType:"favRestaurants",id:props.restaurant._id})
      })
      response = await response.json()
      if(response.success)
      {
        console.log("favorited restaurant",props.restaurant._id);
        props.updateUserlikings(response.userlikings)
        // setIsRestaurantfavorited(!isRestaurantFavorited)
      }
      else
      {
        console.log("favoriting restaurant failed...");
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card sx={{ maxWidth: 345,}}>
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          component="img"
          height="140"
          image={props.restaurant.img}
          alt={props.restaurant.name+" + "+props.restaurant._id}
        />
        <Button variant="contained" sx={{color:"white",position:"absolute",top:10,left:-30, backgroundColor:props.restaurant.currentStatus==='Open' ? 'green':'red', width:'115px',transform:'rotate(315deg)'}}>
          {props.restaurant.currentStatus}
        </Button>
        <Button variant="contained" sx={{color:"white",position:"absolute",top:7.5,right:7.5, minWidth:'30px', maxWidth:'40px'}}>
          {props.restaurant.rating.toFixed(1)}
        </Button>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Approx {props.restaurant.avgCost} for 2 people
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.restaurant.city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display :"flex ",justifyContent:'end' }}>
        <IconButton size="small" color="primary" onClick={onFavoriteRestaurant}>
          {isRestaurantFavorited ?
          <FavoriteOutlinedIcon />
          :
          <FavoriteBorderIcon />}
        </IconButton>
        <IconButton size="small" color="primary" onClick={onSaveRestaurant}>
          {isRestaurantSaved ?
          <BookmarkIcon />
          :
          <BookmarkBorderOutlinedIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
