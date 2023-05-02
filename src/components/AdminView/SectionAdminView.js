import React from 'react'
import { AppBar, Toolbar, Button, Container, Typography ,Grid,Box} from '@mui/material';
import List from "@mui/material/List";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SectionAdminView = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
    
   
        <div>
        <Container>
        <Box
        sx={{
          width: " 100%",
          height: 100,
          backgroundColor: "primary.dark",
          borderRadius:'1em',
          marginTop:'1em'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Typography variant="h5" noWrap component="div" color="white">
             Madda guduvu
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
              label="Open(Restaurant Status)"
            />
          </Grid>
        </Grid>
      </Box>
          <Box
          sx={{
          width: " 100%",
          height: 100,
          backgroundColor: "primary.light",
          borderRadius:'1em',
          marginTop:'1em'
        }}>
            <List sx={{display:'flex',}}>
        {[
         
          { text: <Typography variant='h5'>Details</Typography>, component: <SectionAdminView /> },
          { text: <Typography variant='h5'>Bookings</Typography>, component: <div>Restaurant Stats Here</div> },
          { text: <Typography variant='h5'>Stats</Typography>, component: <div>All Bookings here</div> },
          { text: <Typography variant='h5'>Menu</Typography>, component: <div> Adding a section here</div> },
          { text: <Typography variant='h5'>Ratings</Typography>, component: <div>Remove section here</div> },
       
          { text:<Typography variant='h5'>Remove section</Typography>, component: <div>Logout</div> },
        ].map(({ text, component }, index) => (
          <ListItem key={text} disablePadding>
            {/* <Link to={path} style={{ textDecoration: "none" }}> */}
              <ListItemButton >
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: "white" }} />
              </ListItemButton>
            {/* </Link> */}
          </ListItem>
        ))}
      </List>
              
      </Box>


          </Container>
          <Typography variant='h4'>Overview</Typography>
          <Box sx={{display:'flex',gap:3}}>
      
          <Box
          sx={{
          width:'40%',
          height: '20%',
          backgroundColor: "white",
          borderRadius:'1em',
          marginTop:'1em'
        }}>
            <List sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        {[
         
          { text: <Typography variant='h5'>Avg cost =</Typography>,text1:<Typography variant='h5'>800</Typography> },
          { text: <Typography variant='h5'>Res charge =</Typography>,  text1:<Typography variant='h5'>30</Typography>},
          { text: <Typography variant='h5'>Capacity =</Typography>, text1:<Typography variant='h5'>80</Typography>},
          { text: <Typography variant='h5'>Menu</Typography>,  text1: <FormControl sx={{ m: 1, minWidth: 30 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
         
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Yes</MenuItem>
          <MenuItem value={20}>No</MenuItem>
          
        </Select>
        
      </FormControl>},
          { text: <Typography variant='h5'>Auto book</Typography>, text1:<FormControl sx={{ m: 1, minWidth: 30 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
         
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Yes</MenuItem>
          <MenuItem value={20}>No</MenuItem>
          
        </Select>
        
      </FormControl> },
       
        ].map(({ text, text1,tcomponent }, index) => (
          <ListItem key={text} disablePadding>
            {/* <Link to={path} style={{ textDecoration: "none" }}> */}
              <ListItemButton >
                <ListItemIcon>
                  
                </ListItemIcon>
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
        width: '100%',
        maxHeight: 900,
        borderRadius:'1em',
        backgroundColor: '#fff',
        marginTop:'1em',
        
      }}
    >
      <Typography variant='h5' marginTop='20px' marginBottom='10px'>This Section is beautifully build for couples</Typography>
      <Container sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <ImageList sx={{ width: 700, height: 450 ,gap:8}} cols={4} >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
      </Container>
    </Box>
  
          </Box>
          
          {/* Your app content */}
        </div>
      
    
    </div>
  )
}

export default SectionAdminView
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];