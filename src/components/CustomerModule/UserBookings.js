import { Backdrop, Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en"; // import the English locale for month names

import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import UserBookingSummary from "./UserBookingSummary";

const UserBookings = (props) => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(null);

  const handleClose = () => {
    setBackdropComponent(null);
  };

  const fetchBookings = async () => {
    // console.log(props.user);
    const bookings = [];
    if (props.user) {
      for (const bookingId of props.user.bookings) {
        let bookingResponse = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getBookingSummary/` + bookingId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        bookingResponse = await bookingResponse.json();
        if (bookingResponse.success && ((props.previous && dayjs(bookingResponse.booking.reservationTime).isBefore(new Date())) || (props.future && dayjs(bookingResponse.booking.reservationTime).isAfter(new Date())))) {
          bookings.push(bookingResponse);
        }
      }
    }
    setBookings(bookings);
  };

  useEffect(() => {
    fetchBookings();
  }, [props]);

  const [backdropComponent, setBackdropComponent] = React.useState(null);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        marginTop: props.mt ? props.mt : "1em",
        p: 3,
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
      }}
    >
      {bookings ? (
        bookings.length === 0 ? (
          <div>No {props.future ? "Future":""}{props.previous ? "Past":""} Bookings for the user</div>
        ) : (
          bookings.map((booking, i) => (
            <Paper
              key={i}
              elevation={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "1em",
              }}
            >
              <LocalDiningIcon sx={{ fontSize: "80px" }} />
              <Paper
                elevation={0}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                  {booking.restaurant.name}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  {booking.restaurant.location.District}
                </Typography>

                <Typography sx={{ textAlign: "left", marginTop: "1em" }}>
                  {dayjs(booking.booking.reservationTime)
                    .locale("en")
                    .format('h:mm A, D MMMM YYYY')}
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: "1em",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <Typography sx={{ textAlign: "left", color: "#4d4f4e" }}>
                      Diners
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "#4d4f4e",
                      }}
                    >
                      {booking.booking.guests.length}
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "1em" }}>
                    <Typography sx={{ textAlign: "left", color: "#4d4f4e" }}>
                      Booking ID
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "#4d4f4e",
                      }}
                    >
                      {booking.booking._id}
                    </Typography>
                  </div>
                </Paper>
              </Paper>
              {/* <IconButton onClick={() => onBookingSummaryClick(booking)}> */}
              <IconButton
                onClick={() =>
                  setBackdropComponent(
                    <UserBookingSummary
                      booking={booking}
                      fetchBookings={fetchBookings}
                    />
                  )
                }
              >
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: "80px" }} />
              </IconButton>
            </Paper>
          ))
        )
      ) : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropComponent ? true : false}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            color: "black",
            position: "relative",
            // height: "60vh",
            width: "80vw",
            borderRadius: "1em",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {backdropComponent ? backdropComponent : null}
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default UserBookings;
