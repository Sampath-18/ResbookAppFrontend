import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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

