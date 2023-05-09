import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function MenuItemExpanded(props) {

  return (

    <Container sx={{ display: "flex", gap: "3em", alignItems: "center" }}>
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
            src="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768"
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
          <Box sx={{ alignItems: "center" }}>

            
              <TableContainer sx={{marginTop:'1em'}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Quantity
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1" fontWeight="bold">
                          Average Persons
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1" fontWeight="bold">
                          Cost
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.item.quantities.map((quantity, quantityIndex) => (
                      <TableRow
                        key={quantityIndex}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {quantity.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {quantity.avgPersons}
                        </TableCell>
                        <TableCell align="right">{quantity.cost}/-</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Box>
        </Box>
      </Container>

  );
}

//  <Card sx={{ display: "flex", width: "30%" }}>
//       <Container sx={{ position: "relative" }}>
//         <img
//           style={{ width: 150, height:150 , borderRadius: "50%" }}
//           src="https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg"
//           alt="Live from space album cover"
//         />
//         <Button
//           variant="contained"
//           sx={{
//             position: "absolute",
//             bottom: 5,
//             right: 0,
//             width:50,
//             height:50,
//             borderRadius:"50%"
//           }}
//         >
//           <AddIcon fontSize="large" />
//         </Button>
//       </Container>
//       <Container>
//         Chicken Biryani
//       </Container>

//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <CardContent sx={{ flex: "1 0 auto" }}>
//           <Typography component="div" variant="h5">
//             Chicken Biryani
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             color="text.secondary"
//             component="div"
//           >
//             150/-
//           </Typography>
//         </CardContent>
//       </Box>
//     </Card> 
