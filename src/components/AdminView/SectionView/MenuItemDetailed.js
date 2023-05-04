import React from 'react'
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
const MenuItemDetailed = () => {
  return (
    <div>
    


    <Container sx={{ display: "flex", gap: "3em" }}>
      <Box
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          width: 300,
          height: 400,
          color: "black",
          backgroundColor: "primary",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <img
          style={{ width: 300, height: 400 }}
          src='https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768'
          alt="Restaurant cover pic"
        ></img>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
        
          
        
        }}
      >
  
        <Box
          sx={{
           
        
            
          }}
        >
        <Grid container rowSpacing={4}>
  <Grid item xs={8}>
    <Item><Typography variant='h4'>Chicken 65</Typography></Item>
  </Grid>
  <Grid item xs={4}>
    <EditIcon fontSize='large'></EditIcon>
  </Grid>
  
</Grid>
        
       
        
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 2, sm: 1, md:2}}
            sx={{marginTop:'1em'}} 
          >
            <Grid item xs={3}>
            <Item><Typography variant='h5'>small</Typography></Item> 
            </Grid>
            <Grid item xs={4}>
              <Item><Typography variant='h5'>Avg persons</Typography></Item> 
            </Grid>
            <Grid item xs={3}>
              <Item><Typography variant='h5'>Cost</Typography></Item> 
            </Grid>
            <Grid item xs={2}>
              <Button>
                  <BackspaceIcon
                    sx={{ color: "black" }}
                    // onClick={(event) =>
                    //   props.setBooking({...props.booking, guests: props.booking.guests.filter((_, i) => i !== index)})
                    // }
                  />
                </Button>{" "}
            </Grid>
            <Grid item xs={3}>
            <Item><Typography variant='h5'>small</Typography></Item> 
            </Grid>
            <Grid item xs={4}>
              <Item><Typography variant='h5'>Avg persons</Typography></Item> 
            </Grid>
            <Grid item xs={3}>
              <Item><Typography variant='h5'>Cost</Typography></Item> 
            </Grid>
            <Grid item xs={2}>
              <Button>
                  <BackspaceIcon
                    sx={{ color: "black" }}
                    // onClick={(event) =>
                    //   props.setBooking({...props.booking, guests: props.booking.guests.filter((_, i) => i !== index)})
                    // }
                  />
                </Button>{" "}
            </Grid>
            <Grid item xs={3}>
            <Item><Typography variant='h5'>small</Typography></Item> 
            </Grid>
            <Grid item xs={4}>
              <Item><Typography variant='h5'>Avg persons</Typography></Item> 
            </Grid>
            <Grid item xs={3}>
              <Item><Typography variant='h5'>Cost</Typography></Item> 
            </Grid>
            <Grid item xs={2}>
              <Button>
                  <BackspaceIcon
                    sx={{ color: "black" }}
                    // onClick={(event) =>
                    //   props.setBooking({...props.booking, guests: props.booking.guests.filter((_, i) => i !== index)})
                    // }
                  />
                </Button>{" "}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>


    </div>
  )
}

export default MenuItemDetailed
