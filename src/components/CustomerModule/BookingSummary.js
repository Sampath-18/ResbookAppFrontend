import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const BookingSummary = () => {
  const bookingSummary = {
    restaurantName: "Out of the box Courtyard",
    city: "Connaught Palace, Central Delhi, Delhi",
    guests: [
        {name:'Sampath', phone:'9390402984'},
        {name:'Srinivas', phone:'9347402984'},
        {name:'Sai kumar', phone:'9390402976'},
        {name:'Sai Teja', phone:'9390463039'},
    ],
    status: "SuccessFul Booking",
    dateTime: "15th Nov 2022 at 12:15 PM",
    BookingID: "DO18598744",
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Booking Summary
      </Typography>
      <Paper elevation={3} sx={{marginTop:'1em'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{bookingSummary.restaurantName}</Typography>
        <Typography variant="h6">{bookingSummary.city}</Typography>
      </Paper>
      <Paper elevation={3} sx={{marginTop:'1em'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Guests:</Typography>
        {
            bookingSummary.guests.map((guest,i) => <Typography variant="h6" key={i}>{guest.name}({guest.phone})</Typography>)
        }
      </Paper>
      <Paper elevation={3} sx={{marginTop:'1em'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Summary:</Typography>
        <Typography variant="h6">Status:{bookingSummary.status}</Typography>
        <Typography variant="h6">Date & Time:{bookingSummary.dateTime}</Typography>
        <Typography variant="h6">ID:{bookingSummary.BookingID}</Typography>
        <Typography variant="h6">Guests:{bookingSummary.guests.length}</Typography>
      </Paper>
    </Container>
  );
};

export default BookingSummary;
