import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import { Carousel } from '@trendyol-js/react-carousel';

export default function RestaurantTile(restaurant) {

  return (
    <Card sx={{ maxWidth: 345,}}>
      <CardActionArea onClick={restaurant.onClick}>
        <CardMedia
          component="img"
          height="140"
          image={restaurant.img}
          alt={restaurant.name+" + "+restaurant.id}
        />
        <Button variant="contained" sx={{color:"white",position:"absolute",top:7.5,right:7.5, minWidth:'30px', maxWidth:'40px'}}>
          {restaurant.rating}
        </Button>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Approx {restaurant.AvgCost} for 2 people
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.Location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display :"flex ",justifyContent:'end' }}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Like
        </Button>
      </CardActions>
    </Card>
  );
}
