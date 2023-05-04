import * as React from "react";

// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import "dayjs/locale/en"; // import the English locale for month names
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Container, Paper } from "@mui/material";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";

import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import BookingSummary from "./BookingSummary";

const drawerWidth = 240;

const AdminViewBookings = (props) => {
  const [startDate, setStartDate] = React.useState(
    dayjs(new Date()).set("hours", 0).set("minutes", 0).set("seconds", 0)
  );
  const [endDate, setEndDate] = React.useState(
    dayjs(new Date()).set("hours", 23).set("minutes", 59).set("seconds", 59)
  );

  const [bookings, setBookings] = React.useState(null);

  const [selectedBooking, setSelectedBooking] = React.useState(null);

  async function fetchBookings(sectionIds) {
    // console.log(startDate,endDate);
    let sd = startDate;
    sd = sd.set("hours", 0).set("minutes", 0).set("seconds", 0);
    // console.log(sd);
    let ed = endDate;
    ed = ed.set("hours", 23).set("minutes", 59).set("seconds", 59);
    // console.log(ed);
    try {
      let bookingsResponse = await fetch(
        "http://localhost:8080/getSectionsBookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: sd,
            endDate: ed,
            sectionIds: sectionIds,
          }),
        }
      );
      bookingsResponse = await bookingsResponse.json();
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.bookings);
      } else {
        setBookings(null);
      }
      // else
      // {
      //   console.log("No Bookings found");
      // }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    // console.log(props);
    let sectionIds = props.sections.map((section, _) => section._id);
    fetchBookings(sectionIds);
  }, [props, startDate, endDate]);

  const changeBookingStatus = async (bookingId, status) => {
    try {
      console.log("called update");
      let updateStatusResponse = await fetch(
        "http://localhost:8080/updateDineinBookingStatus/" + bookingId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );
      updateStatusResponse = await updateStatusResponse.json();
      if (updateStatusResponse.success) {
        console.log("Updated status successfully");
        fetchBookings(props.sections.map((section, _) => section._id)); // to update bookings after status has been changed
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {selectedBooking ? (
        selectedBooking
      ) : (
        <Container>
          <Box
            sx={{
              width: "100%",

              marginTop: "1em",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="From"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="To"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>All</Typography>
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>Upcoming</Typography>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>Completed</Typography>
            </Button>
          </Box>

          {bookings ? (
            <Box
              component="main"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                marginTop: "1em",
                p: 3,
                width: "80vw",
              }}
            >
              {bookings.map((booking, index) => (
                <Paper
                  key={index}
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
                      {props.restaurant.name}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      {props.restaurant.location.District}
                    </Typography>

                    <Typography sx={{ textAlign: "left", marginTop: "1em" }}>
                      {dayjs(booking.reservationTime)
                        .locale("en")
                        .format("D MMMM, YYYY")}
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
                        <Typography
                          sx={{ textAlign: "left", color: "#4d4f4e" }}
                        >
                          Diners
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontWeight: "bold",
                            color: "#4d4f4e",
                          }}
                        >
                          {booking.guests.length}
                        </Typography>
                      </div>
                      <div style={{ marginLeft: "1em" }}>
                        <Typography
                          sx={{ textAlign: "left", color: "#4d4f4e" }}
                        >
                          Booking ID
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontWeight: "bold",
                            color: "#4d4f4e",
                          }}
                        >
                          {booking._id}
                        </Typography>
                      </div>
                      {/* <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>Sections</Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>{0}</Typography>
                  </div> */}
                    </Paper>
                  </Paper>
                  {dayjs(booking.reservationTime).isAfter(new Date()) ? (
                    <Stack spacing={2} direction="column">
                      {booking.status === "To Be Accepted" ? (
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "green" }}
                          onClick={() => {
                            changeBookingStatus(booking._id, "Booked-Open");
                          }}
                        >
                          <Typography>Accept</Typography>
                        </Button>
                      ) : (
                        <></>
                      )}
                      {booking.status === "To Be Accepted" ||
                      booking.status === "Booked-Open" ? (
                        <Button
                          variant="outlined"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => {
                            changeBookingStatus(booking._id, "Rejected");
                          }}
                        >
                          <Typography>Deny</Typography>
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <IconButton
                    onClick={() =>
                      setSelectedBooking(
                        <BookingSummary
                          restaurant={props.restaurant}
                          booking={booking}
                          section={ props.sections.filter( (section, _) => section._id === booking.sectionId )[0] }
                          onClick={() => setSelectedBooking(null)}
                        />
                      )
                    }
                  >
                    <KeyboardDoubleArrowRightIcon sx={{ fontSize: "80px" }} />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          ) : (
            <>No Bookings</>
          )}
        </Container>
      )}
    </div>
  );
};

export default AdminViewBookings;
