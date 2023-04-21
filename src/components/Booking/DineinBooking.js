import { Button, Paper, TextField, Typography, Grid } from "@mui/material";
import React, {  useEffect } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

const DineinBooking = (props) => {

  // console.log(props)

  // const [booking, setBooking] = useState(props.booking)

  // useEffect(() => {
  //   setBooking(props.booking)
  //   console.log(props.booking)
  // }, [])
    

  const handleReservationTimeChange = (newValue) => {
    props.setBooking({...props.booking, reservationTime:newValue})
  };
  
  const navigate = useNavigate();

  const bookChairs = () => {
    navigate("/BookingSummary")
  }
  
  // useEffect(() => {
  //   props.setBookings(booking)
  // }, [booking])
  

  // const [guests, setGuests] = useState([]);

  const handleGuestChange = (event, index) => {
    const changedGuest = { ...props.booking.guests[index] };
    changedGuest[event.target.name] = event.target.value;
    const changedGuests = [...props.booking.guests];
    changedGuests[index] = changedGuest;
    props.setBooking({...props.booking,guests:changedGuests});
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
          label="Select Reservation Date"
          value={props.booking.reservationTime}
          onChange={handleReservationTimeChange}
          renderInput={(params) => (
            <TextField sx={{ marginTop: "1em" }} {...params} />
          )}
        />
      </LocalizationProvider>
      <Typography variant="h5" marginTop="1em">
        Guests and details
      </Typography>
      {props.booking.guests.map((guest, index) => (
        <Paper elevation={0} sx={{ marginTop: "1em" }} key={index}>
          <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={guest["guestName"]}
                  name="guestName"
                  onChange={(event) => handleGuestChange(event, index)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  type="number"
                  variant="outlined"
                  value={guest["phone"]}
                  name="phone"
                  onChange={(event) => handleGuestChange(event, index)}
                />
              </Grid>
              <Grid item>
                <Button>
                  <BackspaceIcon
                    sx={{ color: "black" }}
                    onClick={(event) =>
                      props.setBooking({...props.booking, guests: props.booking.guests.filter((_, i) => i !== index)})
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
        onClick={() => props.setBooking({...props.booking, guests:[...props.booking.guests, { "guestName": "", phone: "" }]})}
      >
        <AddCircleIcon />
        <Typography variant="button">Guest</Typography>
      </Button>
      <Button variant="contained" sx={{margin:'1em'}} onClick={() => props.bookDinein(props.booking)}>
        Book Chairs
      </Button>
    </Paper>
  );
};

export default DineinBooking;




// import { Button, Paper, TextField, Typography, Grid } from "@mui/material";
// import React, {  useEffect } from "react";
// import dayjs from "dayjs";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useState } from "react";
// import BackspaceIcon from "@mui/icons-material/Backspace";
// import { Container } from "@mui/system";
// import { useNavigate } from "react-router-dom";

// const DineinBooking = (props) => {

//   // console.log(props)

//   const [booking, setBooking] = useState(props.booking)

//   useEffect(() => {
//     setBooking(props.booking)
//     console.log(props.booking)
//   }, [])
    

//   const handleReservationTimeChange = (newValue) => {
//     setBooking({...booking, reservationTime:newValue})
//   };
  
//   const navigate = useNavigate();

//   const bookChairs = () => {
//     navigate("/BookingSummary")
//   }
  
//   useEffect(() => {
//     props.setBookings(booking)
//   }, [booking])
  

//   // const [guests, setGuests] = useState([]);

//   const handleGuestChange = (event, index) => {
//     const changedGuest = { ...booking.guests[index] };
//     changedGuest[event.target.name] = event.target.value;
//     const changedGuests = [...booking.guests];
//     changedGuests[index] = changedGuest;
//     setBooking({...booking,guests:changedGuests});
//     // console.log( "Guest changed:" + (index + 1) + " " + event.target.name + ":" + changedGuests[index][event.target.name] );
//   };

//   // const removeGuests = (event,index) => {
//   //   setGuests(guests.filter((_,i) => i!==index))
//   // }

//   return (
//     <Paper
//       elevation={3}
//       sx={{ width: "25%", height: "50%",  }}
//     >
//       <Typography
//         variant="h4"
//         color="white"
//         sx={{ backgroundColor: "black" }}
//       >
//         Book your chairs
//       </Typography>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateTimePicker
//           label="Date&Time picker"
//           value={props.booking.reservationTime}
//           onChange={handleReservationTimeChange}
//           renderInput={(params) => (
//             <TextField sx={{ marginTop: "1em" }} {...params} />
//           )}
//         />
//       </LocalizationProvider>
//       <Typography variant="h5" marginTop="1em">
//         Guests and details
//       </Typography>
//       {props.booking.guests.map((guest, index) => (
//         <Paper elevation={0} sx={{ marginTop: "1em" }} key={index}>
//           <Container>
//             <Grid container spacing={{ xs: 2, md: 3 }}>
//               <Grid item xs={2} sm={4} md={4}>
//                 <TextField
//                   id="outlined-basic"
//                   label="Name"
//                   variant="outlined"
//                   value={guest["guestName"]}
//                   name="guestName"
//                   onChange={(event) => handleGuestChange(event, index)}
//                 />
//               </Grid>
//               <Grid item xs={2} sm={4} md={4}>
//                 <TextField
//                   id="outlined-basic"
//                   label="Phone"
//                   type="number"
//                   variant="outlined"
//                   value={guest["phone"]}
//                   name="phone"
//                   onChange={(event) => handleGuestChange(event, index)}
//                 />
//               </Grid>
//               <Grid item>
//                 <Button>
//                   <BackspaceIcon
//                     sx={{ color: "black" }}
//                     onClick={(event) =>
//                       setBooking({...booking, guests: booking.guests.filter((_, i) => i !== index)})
//                     }
//                   />
//                 </Button>
//               </Grid>
//             </Grid>
//           </Container>
//         </Paper>
//       ))}
//       <Button
//         variant="contained"
//         sx={{ margin: "1em" }}
//         onClick={() => setBooking({...booking, guests:[...booking.guests, { "guestName": "", phone: "" }]})}
//       >
//         <AddCircleIcon />
//         <Typography variant="button">Guest</Typography>
//       </Button>
//       <Button variant="contained" sx={{margin:'1em'}} onClick={() => props.bookDinein(booking)}>
//         Book Chairs
//       </Button>
//     </Paper>
//   );
// };

// export default DineinBooking;
