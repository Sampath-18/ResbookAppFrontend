import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { useNavigate, useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FavCuisineSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onNextClick = async () => {
    let justCuisines = cuisines.filter((cuisine) => cuisine[1]);
    justCuisines = { cuisines: justCuisines.map((cuisine) => cuisine[0]) };
    let response = await fetch(
      `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/addUserFavorites/` + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...justCuisines, preferences:preferences}),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("added favorite cuisines successfully");
      navigate("/");
    } else {
      alert("adding favorite cuisines failed");
    }
  };

  const [cuisines, setCuisines] = useState([
    ["Italian", false],
    ["North-Indian", false],
    ["Chinese", false],
    ["Japanese", false],
    ["South-Indian", false],
    ["Spanish", false],
    ["European", false],
    ["American", false],
    ["Andhra", false],
    ["Hyderabadi", false],
    ["Gujarathi", false],
    ["Bengali", false],
  ]);

  const [preferences,setPreferences] = useState({
    foodType:'Both',
    drinking: 'Non-Drinker',
    smoking: 'Non-Smoker',
    preference: 'Quality'
  })

  const handlePreferenceChange = (event) => {
    setPreferences({...preferences,[event.target.name]:event.target.value})
  }

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight:'bold', marginBottom: "1em" }}>
        Select Your Favourite Cuisines
      </Typography>
      <Grid
        sx={{ marginTop: "1em" }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cuisines.map((cuisine, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {cuisine[1] ? (
              <Item
                sx={{ backgroundColor: "#8a888a" }}
                onClick={() => {
                  setCuisines(
                    cuisines.map((cuisine, idx) =>
                      idx === index ? [cuisine[0], !cuisine[1]] : cuisine
                    )
                  );
                }}
              >
                <div style={{display:'flex',justifyContent:'center'}}><Typography sx={{color:'black'}}>{cuisine[0]}</Typography><DoneRoundedIcon /></div>
              </Item>
            ) : (
              <Item
                onClick={() => {
                  setCuisines(
                    cuisines.map((cuisine, idx) =>
                      idx === index ? [cuisine[0], !cuisine[1]] : cuisine
                    )
                  );
                }}
              >
                <Typography sx={{color:'black'}}>{cuisine[0]}</Typography>
              </Item>
            )}
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{fontWeight:'bold',margin:'1em'}}>Preferences</Typography>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"><Typography sx={{fontWeight:'bold',color:'black'}}>Food type</Typography></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="foodType"
          value={preferences.foodType}
          onChange={handlePreferenceChange}
        >
          <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
          <FormControlLabel
            value="Non-Veg"
            control={<Radio />}
            label="Non-Veg"
          />
          <FormControlLabel value="Both" control={<Radio />} label="Both" />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"><Typography sx={{fontWeight:'bold',color:'black'}}>Drinking Habit</Typography></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="drinking"
          value={preferences.drinking}
          onChange={handlePreferenceChange}
        >
          <FormControlLabel value="Drinker" control={<Radio />} label="Drinker" />
          <FormControlLabel
            value="Non-Drinker"
            control={<Radio />}
            label="Non-Drinker"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"><Typography sx={{fontWeight:'bold',color:'black'}}>Smoking Habit</Typography></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="smoking"
          value={preferences.smoking}
          onChange={handlePreferenceChange}
        >
          <FormControlLabel value="Smoker" control={<Radio />} label="Smoker" />
          <FormControlLabel
            value="Non-Smoker"
            control={<Radio />}
            label="Non-Smoker"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"><Typography sx={{fontWeight:'bold',color:'black'}}>Preference</Typography></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="preference"
          value={preferences.preference}
          onChange={handlePreferenceChange}
        >
          <FormControlLabel value="Budget" control={<Radio />} label="Budget" />
          <FormControlLabel value="Quality" control={<Radio />} label="Quality" />
        </RadioGroup>
      </FormControl>
      <br />
      <Button sx={{ margin: "1em" }} onClick={onNextClick} variant="contained">
        Next
      </Button>
    </Container>
  );
};

export default FavCuisineSelection;
