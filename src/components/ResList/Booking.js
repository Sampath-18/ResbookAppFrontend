import { Button, Paper, TextField, Typography, Grid } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [reservationTime, setReservationTime] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleReservationTimeChange = (newValue) => {
    setReservationTime(newValue);
  };
  
  const navigate = useNavigate();

  const bookChairs = () => {
    navigate("/BookingSummary")
  }

  const [guests, setGuests] = useState([]);

  const handleGuestChange = (event, index) => {
    const changedGuest = { ...guests[index] };
    changedGuest[event.target.name] = event.target.value;
    const changedGuests = [...guests];
    changedGuests[index] = changedGuest;
    setGuests(changedGuests);
    // console.log( "Guest changed:" + (index + 1) + " " + event.target.name + ":" + changedGuests[index][event.target.name] );
  };

  // const removeGuests = (event,index) => {
  //   setGuests(guests.filter((_,i) => i!==index))
  // }

  return (
    <Paper
      elevation={3}
      sx={{ width: "25%", height: "50%",  }}
    >
      <Typography
        variant="h4"
        color="white"
        sx={{ backgroundColor: "black" }}
      >
        Book your chairs
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date&Time picker"
          value={reservationTime}
          onChange={handleReservationTimeChange}
          renderInput={(params) => (
            <TextField sx={{ marginTop: "1em" }} {...params} />
          )}
        />
      </LocalizationProvider>
      <Typography variant="h5" marginTop="1em">
        Guests and details
      </Typography>
      {guests.map((guest, index) => (
        <Paper elevation={0} sx={{ marginTop: "1em" }} key={index}>
          <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={guest["Guest Name"]}
                  name="Guest Name"
                  onChange={(event) => handleGuestChange(event, index)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  type="number"
                  variant="outlined"
                  value={guest["Phone"]}
                  name="Phone"
                  onChange={(event) => handleGuestChange(event, index)}
                />
              </Grid>
              <Grid item>
                <Button>
                  <BackspaceIcon
                    sx={{ color: "black" }}
                    onClick={(event) =>
                      setGuests(guests.filter((_, i) => i !== index))
                    }
                  />
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      ))}
      <Button
        variant="contained"
        sx={{ margin: "1em" }}
        onClick={() => setGuests([...guests, { "Guest Name": "", Phone: "" }])}
      >
        <AddCircleIcon />
        <Typography variant="button">Guest</Typography>
      </Button>
      <Button variant="contained" sx={{margin:'1em'}} onClick={() => bookChairs()}>
        Book Chairs
      </Button>
    </Paper>
  );
};

export default Booking;
