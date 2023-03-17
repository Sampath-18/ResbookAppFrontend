import * as React from "react";
import TextField from "@mui/material/TextField";
import { Container, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RestaurantIntake() {
  const [position, setPosition] = useState(null);

  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [road, setRoad] = useState("");

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
  };

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

  const [restaurantDetails, setRestaurantDetails] = useState({
    restaurantName: "",
    avgCost: 0,
    parkingAvailable: "",
    NH: "",
    socialMedia: [],
    adminName: "",
    email: "",
    phone1: "",
    phone2: "",
    password: ""
  });

  const navigate = useNavigate();

  const navigateToSectionsIntake = () => {
    // navigate to sectionsIntake after taking all necessary restaurant details\
    if (
      restaurantDetails.restaurantName === "" ||
      restaurantDetails.parkingAvailable === "" ||
      restaurantDetails.adminName === "" ||
      restaurantDetails.email === "" ||
      restaurantDetails.phone1 === "" ||
      restaurantDetails.phone2 === "" ||
      restaurantDetails.password === ""
    ) {
      alert("Fill the required fields");
    } 
    else {
      navigate("/SectionIntake", {
        state: {
          name: restaurantDetails.restaurantName,
          parkingAvailable: restaurantDetails.parkingAvailable,
          admin:{
            name:restaurantDetails.adminName,
            email:restaurantDetails.email,
            phone1:restaurantDetails.phone1,
            phone2:restaurantDetails.phone2,
            password:restaurantDetails.password
          },
          location: {
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
            State: state,
            District: district,
            Country: country,
            Road: road,
          },
        },
      });
    }
  };

  const handleInputChanges = (e) => {
    const value = e.target.value;
    setRestaurantDetails({
      ...restaurantDetails,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ marginTop: "1em", padding: "0.5em" }}>
        <Typography variant="h4">Restaurant details</Typography>
        <TextField
          id="outlined-basic"
          label="Restaurant name"
          variant="outlined"
          name="restaurantName"
          value={restaurantDetails.restaurantName}
          onChange={(event) => handleInputChanges(event)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Avg Cost for 2"
          variant="outlined"
          name="avgCost"
          value={restaurantDetails.avgCost}
          onChange={(event) => handleInputChanges(event)}
          required
        />
      </Paper>

      <Paper elevation={3} sx={{ marginTop: "1em", padding: "0.5em" }}>
        <Typography variant="h4">Contact Details</Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="adminName"
          value={restaurantDetails.adminName}
          onChange={(event) => handleInputChanges(event)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={restaurantDetails.email}
          onChange={(event) => handleInputChanges(event)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Phone1"
          variant="outlined"
          name="phone1"
          value={restaurantDetails.phone1}
          onChange={(event) => handleInputChanges(event)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Phone2"
          variant="outlined"
          name="phone2"
          value={restaurantDetails.phone2}
          onChange={(event) => handleInputChanges(event)}
          required
        />
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          name="password"
          value={restaurantDetails.password}
          onChange={(event) => handleInputChanges(event)}
          required
        />
      </Paper>

      <Paper elevation={3} sx={{ marginTop: "1em", padding: "0.5em" }}>
        <Typography variant="h4">Additional Restaurant details</Typography>
        {/* <TextField
          id="outlined-basic"
          label="Parking available?"
          variant="outlined"
          name="parkingAvailable"
          value={restaurantDetails.parkingAvailable}
          onChange={(event) => handleInputChanges(event)}
          required
        /> */}
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            Parking available?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={restaurantDetails.parkingAvailable}
            name="parkingAvailable"
            label="Parking available?"
            onChange={(event) => handleInputChanges(event)}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="NH"
          variant="outlined"
          name="NH"
          value={restaurantDetails.NH}
          onChange={(event) => handleInputChanges(event)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Social media handles"
          name="socialMedia"
          variant="outlined"
          value={restaurantDetails.socialMedia}
          onChange={(event) => handleInputChanges(event)}
        />
      </Paper>

      <Paper elevation={3} sx={{ marginTop: "1em", padding: "0.5em" }}>
        <Typography variant="h4">Location details</Typography>
        <Button variant="contained" onClick={() => getCurrentLocation()}>
          get Current Location
        </Button>
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

      <Button
        variant="contained"
        onClick={() => navigateToSectionsIntake()}
        sx={{ marginTop: "1em" }}
      >
        Next
      </Button>
    </Container>
  );
}
