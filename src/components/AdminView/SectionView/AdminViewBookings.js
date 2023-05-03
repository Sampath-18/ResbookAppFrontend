import * as React from "react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { Container, Paper, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";

import LocalDiningIcon from "@mui/icons-material/LocalDining";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const drawerWidth = 240;

const AdminViewBookings = () => {
  const [value, setValue] = React.useState(null);

  return (
    <div>
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
            <DateTimePicker
              label="From"
              // value={props.booking.reservationTime}
              // onChange={handleReservationTimeChange}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: "1em", width: "150px" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="To"
              // value={props.booking.reservationTime}
              // onChange={handleReservationTimeChange}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: "1em", width: "150px" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            style={{ backgroundColor: "green", width: "150px" }}
          >
            <Typography>Active</Typography>
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: "green", width: "150px" }}
          >
            <Typography>Access</Typography>
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "green", width: "150px" }}
          >
            <Typography>Access</Typography>
          </Button>
        </Box>

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
          <Paper
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
                booking.restaurant.name
              </Typography>
              <Typography sx={{ textAlign: "left" }}>
                booking.restaurant.location.District
              </Typography>

              <Typography sx={{ textAlign: "left", marginTop: "1em" }}>
                booking.booking.reservationTime
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
                    booking.booking.guests.length
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
                    booking.booking._id
                  </Typography>
                </div>
                {/* <div>
                    <Typography sx={{ textAlign: "left", color:"#4d4f4e" }}>Sections</Typography>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold", color:"#4d4f4e" }}>{0}</Typography>
                  </div> */}
              </Paper>
            </Paper>
            <Stack spacing={2} direction="column">
              <Button variant="contained" style={{ backgroundColor: "green" }}>
                <Typography>Accept</Typography>
              </Button>
              <Button
                variant="outlined"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <Typography>Deny</Typography>
              </Button>
            </Stack>
            <IconButton>
              <KeyboardDoubleArrowRightIcon sx={{ fontSize: "80px" }} />
            </IconButton>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default AdminViewBookings;
