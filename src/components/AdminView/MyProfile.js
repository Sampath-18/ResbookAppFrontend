import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const drawerWidth = 240;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyProfile = (props) => {
  return (
    <Container sx={{ display: "flex", gap: "3em" }}>
      <Box
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          width: 500,
          height: 500,
          color: "black",
          backgroundColor: "primary",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <img
          style={{ width: 500, height: 500 }}
          src={props.restaurant.coverImage.url}
          alt="Restaurant cover pic"
        ></img>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          width: 500,
          height: 300,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
            <Item><Typography variant='h5'>Name :</Typography></Item> 
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>{props.restaurant.admin.name}</Typography></Item> 
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>Email :</Typography></Item> {" "}
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>{props.restaurant.admin.email}</Typography></Item> {" "}
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>Phone :</Typography></Item> {" "}
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>{props.restaurant.admin.phone1}</Typography></Item> {" "}
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>Phone2 :</Typography></Item> {" "}
            </Grid>
            <Grid item xs={6}>
              <Item><Typography variant='h5'>{props.restaurant.admin.phone2}</Typography></Item> {" "}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MyProfile;