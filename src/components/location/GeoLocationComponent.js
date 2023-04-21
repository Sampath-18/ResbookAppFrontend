import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Typography } from '@mui/material';

function GeolocationComponent() {
  const [position, setPosition] = useState(null);
  
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [road, setRoad] = useState('');

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => setPosition(position),
      (error) => console.log(error)
    );
    if (position) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=7c260ddc5d0c4d6786f6178507399e6a`
        )
        .then((response) => {
          console.log(response);
          setState(response.data.results[0].components.state);
          setDistrict(response.data.results[0].components.state_district);
          setRoad(response.data.results[0].formatted);        
          console.log(response.data.results[0].components.country);
          setCountry(response.data.results[0].components.country);
        })
        .catch((error) => console.log(error));
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setPosition(position),
      (error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    if (position) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=7c260ddc5d0c4d6786f6178507399e6a`
        )
        .then((response) => {
          console.log(response);
          setState(response.data.results[0].components.state);
          setDistrict(response.data.results[0].components.state_district);
          setRoad(response.data.results[0].formatted);        
          console.log(response.data.results[0].components.country);
          setCountry(response.data.results[0].components.country);
        })
        .catch((error) => console.log(error));
    }
  }, [position]);

  return (
    <Paper elevation={3} sx={{marginTop:"1em", padding:"0.5em"}}>
      <Typography variant='h4'>Location details</Typography>
      <Button variant="contained" onClick={() => getCurrentLocation()}>get Current Location</Button>
      {position ? (
        <div>
          <p>Latitude: {position.coords.latitude}</p>
          <p>Longitude: {position.coords.longitude}</p>
          <p>State: {state}</p>
          <p>District:{district}</p>
          
          <p>Country: {country}</p>
          <p>Road: {road}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Paper>
  );
}

export default GeolocationComponent;

