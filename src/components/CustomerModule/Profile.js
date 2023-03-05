import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const bookings = [
    {
      restaurantName: "Out of the box Courtyard",
      city: "Connaught Palace, Central Delhi, Delhi",
      guests: [
        { name: "Sampath", phone: "9390402984" },
        { name: "Srinivas", phone: "9347402984" },
        { name: "Sai kumar", phone: "9390402976" },
        { name: "Sai Teja", phone: "9390463039" },
      ],
      status: "SuccessFul Booking",
      dateTime: "15th Nov 2022 at 12:15 PM",
      BookingID: "DO18598744",
    },
    {
      restaurantName: "Out of the box Courtyard",
      city: "Connaught Palace, Central Delhi, Delhi",
      guests: [
        { name: "Sampath", phone: "9390402984" },
        { name: "Srinivas", phone: "9347402984" },
        { name: "Sai kumar", phone: "9390402976" },
        { name: "Sai Teja", phone: "9390463039" },
      ],
      status: "SuccessFul Booking",
      dateTime: "15th Nov 2022 at 12:15 PM",
      BookingID: "DO18598744",
    },
  ]

  const navigate = useNavigate();

  return (
    <div>
      <Paper elevation={3} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
        <div style={{ marginLeft: "2em" }}>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "20%",
            marginLeft: "2em",
          }}
        >
          <div style={{ display: "flex" }}>
            <Typography style={{ paddingLeft: "1em" }}>sampath</Typography>{" "}
            <EditIcon style={{ paddingLeft: "1em" }} />
          </div>
          <div style={{ display: "flex" }}>
            <LocalPhoneIcon />{" "}
            <Typography style={{ paddingLeft: "1em" }}>
              +919391104500
            </Typography>{" "}
            <span style={{ paddingLeft: "1em" }}>Edit</span>
          </div>
          <div style={{ display: "flex" }}>
            <EmailIcon /> <span style={{ paddingLeft: "1em" }}>EDIT</span>
          </div>
        </Paper>
      </Paper>

      <Paper elevation={3} sx={{ marginTop: "1em", display: "flex", flexDirection: "row", justifyContent: "space-around", }} >
        
        <Paper elevation={0} style={{ display: "flex", flexDirection: "column", width:'70%' }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Previous Reservations
          </Typography>
          {bookings.map((booking, i) => (
            <Paper key={i} elevation={2} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center",marginTop:'1em' }} >
              <LocalDiningIcon sx={{ fontSize: "80px" }} />
              <Paper elevation={0} sx={{ display: "flex", flexDirection: "column" }} >
                <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                  {booking.restaurantName}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  {booking.city}
                </Typography>
                
                <Typography sx={{ textAlign: "left", marginTop:"1em" }}>
                  {booking.dateTime}
                </Typography>
                <Paper elevation={0} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop:"1em", alignItems:'flex-start' }} >
                  <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>Diners</Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>
                      {booking.guests.length}
                    </Typography>
                  </div>
                  <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>
                      Booking ID
                    </Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>
                      {booking.BookingID}
                    </Typography>
                  </div>
                  <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>Sections</Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>{0}</Typography>
                  </div>
                </Paper>
              </Paper>
              <IconButton onClick={() => navigate("/BookingSummary")}>
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: "80px" }} />
              </IconButton>
            </Paper>
          ))}
        </Paper>
      </Paper>
    </div>
  );
};

export default Profile;
