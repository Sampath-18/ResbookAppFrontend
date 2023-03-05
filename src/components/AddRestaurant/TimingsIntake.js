import { Paper, Typography, Grid } from "@mui/material";
import React, { useState } from "react";

const TimingsIntake = () => {
  const [timings, setTimings] = useState({
    Monday: { "open time": "", "close time": "" },
    Tuesday: { "open time": "", "close time": "" },
    Wednesday: { "open time": "", "close time": "" },
    Thursday: { "open time": "", "close time": "" },
    Friday: { "open time": "", "close time": "" },
    Saturday: { "open time": "", "close time": "" },
    Sunday: { "open time": "", "close time": "" },
  });

  const handleTimeChanges = (event, day) => {
    const prop = event.target.name;
    const newTimings = {...(timings[day])}
    newTimings[prop] = event.target.value
    const timingsCopy = {...timings}
    timingsCopy[day]=newTimings
    setTimings(timingsCopy);
    console.log(event.target.value, newTimings);
  }

  return (
   
      <Paper elevation={5} sx={{ marginTop: "1em"}}>
        <Typography variant="h5">Timings</Typography>
        <Grid container spacing={2} marginTop="1em">
          <Grid item   width="35%">
            <Typography textAlign="start" fontWeight='700' marginLeft='1em'>Day</Typography>
          </Grid>
          <Grid item>
            <Typography textAlign="center"  fontWeight='700'>Open time</Typography>
          </Grid>
          <Grid item>
            <Typography textAlign="center"  fontWeight='700'>Close time</Typography>
          </Grid>
        </Grid>
        {Object.keys(timings).map((day) => (
          <Grid container spacing={2} key={day} marginTop="1em" marginBottom="1em">
            <Grid item width="35%">
              <Typography textAlign="start" marginLeft='1em'>{day}</Typography>
            </Grid>
            <Grid item>
              <input type="time" name='open time' onChange={(event) => handleTimeChanges(event, day) } />
            </Grid>
            <Grid item>
              <input type="time" name='close time' onChange={(event) => handleTimeChanges(event, day) } />
            </Grid>
          </Grid>
        ))}
      </Paper>
    
  );
};

export default TimingsIntake;
