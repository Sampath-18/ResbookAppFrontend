import { Button, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import dayjs from "dayjs";
import "dayjs/locale/en"; // import the English locale for month names

const BookingSummary = (props) => {
  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Booking Summary
      </Typography>
      <Paper elevation={3} sx={{marginTop:'1em'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{props.restaurant.name}</Typography>
        <Typography variant="h6">{props.restaurant.location.District}</Typography>
      </Paper>
      <Paper elevation={3} sx={{marginTop:'1em'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Guests:</Typography>
        {
            props.booking.guests.map((guest,i) => <Typography variant="h6" key={i}>{guest.guestName}({guest.phone})</Typography>)
        }
      </Paper>
      <Paper elevation={3} sx={{marginTop:'1em'}}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Summary:</Typography>
        <Typography variant="h6">Section Booked:{props.section.sectionName}</Typography>
        <Typography variant="h6">Booking Time:{dayjs(props.booking.bookingTime).locale("en").format('h:mm A, D MMMM, YYYY')}</Typography>
        <Typography variant="h6">Status:{props.booking.status}</Typography>
        <Typography variant="h6">Reservation Time:{dayjs(props.booking.reservationTime).locale("en").format('h:mm A, D MMMM, YYYY')}</Typography>
        <Typography variant="h6">ID:{props.booking._id}</Typography>
        <Typography variant="h6">Guests:{props.booking.guests.length}</Typography>
      </Paper>
      <Button
            variant="outlined"
            style={{ backgroundColor: "red", color: "white", marginTop:"1em" }}
            onClick={() => { props.onClick() }}
        >
            <Typography>Back</Typography>
        </Button>
    </Container>
  )
}

export default BookingSummary