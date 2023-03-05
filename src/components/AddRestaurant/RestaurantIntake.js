import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Container, Typography,Paper,Button } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function RestaurantIntake() {
const [location,setLocation]=useState({})
useEffect(() => {
  

 getlocation () 
}, [])
const getlocation=async()=>{
  const location= await axios.get('http://api.ipapi.com/')
console.log(location.data);
setLocation(location.data)
 
}

  const [restaurantDetails, setRestaurantDetails] = useState({restaurantName:'', location:'', city:'', avgCost:0, parkingAvailable:'', NH:'', socialMedia:[], adminName:'', email:'', phone1:'', phone2:''})

  const navigate = useNavigate();

  const handleInputChanges = (e) => {
    const value = e.target.value;
    setRestaurantDetails({
      ...restaurantDetails,
      [e.target.name]: value
    });
  } 

  return (
    <Container>
      <Paper elevation={3} sx={{marginTop:"1em", padding:"0.5em"}}>
        <Typography variant='h4'>Restaurant details</Typography>
        <TextField id="outlined-basic" label="Restaurant name" variant="outlined" name='restaurantName' value={restaurantDetails.restaurantName} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="City" variant="outlined" name='city'  value={restaurantDetails.city} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="Avg Cost for 2" variant="outlined" name='avgCost' value={restaurantDetails.avgCost} onChange={(event) => handleInputChanges(event)} />
      </Paper>
        
      <Paper elevation={3} sx={{marginTop:"1em", padding:"0.5em"}}>
        <Typography variant='h4'>Contact Details</Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" name='adminName' value={restaurantDetails.adminName} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" name='email' value={restaurantDetails.email} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="Phone1" variant="outlined" name='phone1' value={restaurantDetails.phone1} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="Phone2" variant="outlined" name='phone2' value={restaurantDetails.phone2} onChange={(event) => handleInputChanges(event)} />
      </Paper>

      <Paper elevation={3} sx={{marginTop:"1em", padding:"0.5em"}}>
        <Typography variant='h4'>Additional Restaurant details</Typography>
        <TextField id="outlined-basic" label="Parking available?" variant="outlined" name='parkingAvailable' value={restaurantDetails.parkingAvailable} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="NH" variant="outlined" name='NH' value={restaurantDetails.NH} onChange={(event) => handleInputChanges(event)} />
        <TextField id="outlined-basic" label="Social media handles" name='socialMedia' variant="outlined" value={restaurantDetails.socialMedia} onChange={(event) => handleInputChanges(event)} />
      </Paper>

      <Button variant="contained" onClick={() => navigate("/SectionIntake")} sx={{marginTop:'1em'}} >Next</Button>

    </Container>
  );
}