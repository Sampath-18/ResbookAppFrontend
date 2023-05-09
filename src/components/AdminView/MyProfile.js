import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
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
  const [editItem, setEditItem] = useState(null); 

  const onSave = async() => {
    try {
      let restaurantResponse = await fetch(
        "http://localhost:8080/updateRestaurantDetails/" + props.restaurant._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({admin:{name:editItem.Name,email:editItem.Email,phone1:editItem.Phone1,phone2:editItem.Phone2,password:props.restaurant.admin.password}}),
        }
      );
      restaurantResponse = await restaurantResponse.json();
      if (restaurantResponse.success) {
        console.log("Updated Admin details Successfully");
        setAdminDetails(editItem)
        setEditItem(null)
      } else {
        console.log(restaurantResponse.message);
        alert('Check the details u entered');
      }
    } catch (error) {
      console.error(error)
    }
  }
  const [adminDetails,setAdminDetails] = useState({
    Name: props.restaurant.admin.name,
    Email: props.restaurant.admin.email,
    Phone1: props.restaurant.admin.phone1,
    Phone2: props.restaurant.admin.phone2,
  })
  const onAdminDetailsChange = (event) => {
    setEditItem({...editItem,[event.target.name]:event.target.value})
  }

  useEffect(() => {
    props.setAdminDetails({name:adminDetails.Name,email:adminDetails.Email,phone1:adminDetails.Phone1,phone2:adminDetails.Phone2,password:props.restaurant.admin.password})
  }, [adminDetails])

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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // width: 500,
          height: 300,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container sx={{ dispaly: "flex", flexDirection:'row', justifyContent: "flex-end", marginTop:'8em' }}>
            {editItem ? (
              <Container>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    margin: "1em",
                  }}
                  onClick={() => onSave()}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    margin: "1em",
                  }}
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </Button>
              </Container>
            ) : (
              <IconButton
                // sx={{ marginLeft: "1em" }}
                onClick={() => setEditItem(JSON.parse(JSON.stringify(adminDetails)))}
              >
                <EditIcon fontSize="large"></EditIcon>
              </IconButton>
            )}
          </Container>
          <TableContainer
            component={Paper}
            style={{ maxWidth: 600, marginTop: "1em" }}
          >
            <Table>
              <TableBody>
                {Object.entries(adminDetails).map(([field, value], index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">{field}</Typography>
                    </TableCell>
                    <TableCell>
                      {editItem ? (
                        <TextField
                          name={field}
                          value={editItem[field]}
                          onChange={(event) => onAdminDetailsChange(event)}
                        />
                      ) : (
                        <Typography>{value}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Grid
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
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
};

export default MyProfile;
