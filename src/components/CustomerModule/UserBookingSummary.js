import { Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en"; // import the English locale for month names

const UserBookingSummary = (props) => {
  // console.log(props);

  const [cancelBooking, setCancelBooking] = useState(false);

  const updateBookingStatus = async () => {
    try {
      let updateStatusResponse = await fetch(
        "http://localhost:8080/updateDineinBooking/" +
          props.booking.booking._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        }
      );
      updateStatusResponse = await updateStatusResponse.json();
      if (updateStatusResponse.success) {
        console.log("Updated status successfully");
        alert("Cancelled successfully");
        props.fetchBookings();
        // fetchBookings(props.sections.map((section, _) => section._id)); // to update bookings after status has been changed
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {props.isJustBooked ? (
        <Typography variant="h3" sx={{ color: "green" }}>
          Booking Successful!!
        </Typography>
      ) : null}
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Booking Summary
      </Typography>
      <Paper elevation={3} sx={{ marginTop: "1em" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {props.booking.restaurant.name}
        </Typography>
        <Typography variant="h6">
          {props.booking.restaurant.location.District}
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ marginTop: "1em" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Guests:
        </Typography>
        {props.booking.booking.guests.map((guest, i) => (
          <Typography variant="h6" key={i}>
            {guest.guestName}({guest.phone})
          </Typography>
        ))}
      </Paper>
      <Paper elevation={3} sx={{ marginTop: "1em" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Summary:
        </Typography>
        <Typography variant="h6">
          Section Booked:{props.booking.section.sectionName}
        </Typography>
        <Typography variant="h6">
          Booking Time:
          {dayjs(props.booking.booking.bookingTime)
            .locale("en")
            .format('h:mm A, D MMMM YYYY')}
        </Typography>
        <Typography variant="h6">
          Status:{props.booking.booking.status}
        </Typography>
        <Typography variant="h6">
          Reservation Time:
          {dayjs(props.booking.booking.reservationTime)
            .locale("en")
            .format('h:mm A, D MMMM YYYY')}
        </Typography>
        <Typography variant="h6">ID:{props.booking.booking._id}</Typography>
        <Typography variant="h6">
          Guests:{props.booking.booking.guests.length}
        </Typography>
      </Paper>
      {new Date(props.booking.booking.reservationTime).getTime() >
      new Date().getTime() ? (
        !cancelBooking ? (
          <Button
            sx={{
              backgroundColor: "#f56042",
              color: "white",
              margin: "1em",
              "&:hover": {
                backgroundColor: "#a86c60",
                color: "white",
              },
            }}
            onClick={() => setCancelBooking(true)}
          >
            Cancel Booking
          </Button>
        ) : (
          <Typography sx={{ marginTop: "1em" }}>
            Are you sure, you want to cancel the booking?
            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                marginLeft: "1em",
                "&:hover": {
                  backgroundColor: "#55d978",
                  color: "white",
                },
              }}
              onClick={() => updateBookingStatus()}
            >
              Yes
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                marginLeft: "1em",
                "&:hover": {
                  backgroundColor: "#d63e4d",
                  color: "white",
                },
              }}
              onClick={() => setCancelBooking(false)}
            >
              No
            </Button>
          </Typography>
        )
      ) : null}
    </Container>
  );
};

export default UserBookingSummary;
