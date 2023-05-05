import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const MenuItemDetailed = (props) => {
  const [item, setItem] = useState(props.item);
  const [edit, setEdit] = useState(false);
  const [eitem, setEitem] = useState(null);

  useEffect(() => {
    setItem(props.item);
  }, [props]);

  const onSave = async () => {
    try {
      setEdit(false);
      // console.log(eitem);
      let itemResponse = await fetch(
        "http://localhost:8080/updateMenuItem/" + eitem._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eitem),
        }
      );
      itemResponse = await itemResponse.json();
      if (itemResponse.success) {
        console.log("Updated Menu Item Successfully");
        setItem(eitem);
      } else {
        console.log(itemResponse.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEitem(null);
    }
  };

  const onEditClick = () => {
    setEitem(JSON.parse(JSON.stringify(item)));
    setEdit(true);
  };

  const onCancel = () => {
    setEitem(null);
    setEdit(false);
  };

  const handleRemoveQuantity = (quantityIndex) => {
    setEitem({
      ...eitem,
      quantities: eitem.quantities.filter((_, idx) => idx !== quantityIndex),
    });
  };

  const handleQuantityChange = (event, quantityIndex) => {
    const quantityUpdated = { ...eitem.quantities[quantityIndex] };
    quantityUpdated[event.target.name] = event.target.value;
    const quantitiesUpdated = [...eitem.quantities];
    quantitiesUpdated[quantityIndex] = quantityUpdated;
    setEitem({ ...eitem, quantities: quantitiesUpdated });
  };

  const handleAddQuantity = () => {
    setEitem({
      ...eitem,
      quantities: [
        ...eitem.quantities,
        { quantity: "", cost: 0, avgPersons: 0 },
      ],
    });
  };

  const handleChange = (event) => {
    setEitem({ ...eitem, [event.target.name]: event.target.value });
  };

  return (
    <div>
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
            <Paper elevation={0} sx={{ display: "flex", flexDirection: "row" }}>
              {edit ? (
                <TextField
                  sx={{ margin: "1em", width: "50%" }}
                  id="outlined-basic"
                  label="Item"
                  name="itemName"
                  variant="outlined"
                  value={eitem.itemName}
                  onChange={(event) => handleChange(event)}
                />
              ) : (
                <Typography variant="h4">{item.itemName}</Typography>
              )}

              {edit ? (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "green", height: "50%" }}
                    onClick={() => onSave()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      height: "50%",
                      marginLeft: "2em",
                    }}
                    onClick={() => onCancel()}
                  >
                    Cancel
                  </Button>
                </Container>
              ) : (
                <IconButton
                  sx={{ marginLeft: "1em" }}
                  onClick={() => onEditClick()}
                >
                  <EditIcon fontSize="large"></EditIcon>
                </IconButton>
              )}
            </Paper>

            {edit ? (
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  {/* <TextField sx={{margin:"1em"}} id="outlined-basic" label="Item" name="itemName" variant="outlined" value={menuItem.itemName} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } /> */}
                  {/* <TextField sx={{margin:"1em"}} id="outlined-basic" label="About" name="About" variant="outlined" value={menuItem.About} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } /> */}
                  <TextField
                    sx={{ margin: "1em" }}
                    id="outlined-basic"
                    label="Type"
                    name="type"
                    variant="outlined"
                    value={eitem.type}
                    onChange={(event) => handleChange(event)}
                  />
                </Paper>
                <Paper
                  elevation={0}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {eitem.quantities.map((quantity, quantityIndex) => (
                    <Paper
                      elevation={0}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "1em",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="quantity"
                        name="quantity"
                        variant="outlined"
                        value={quantity.quantity}
                        onChange={(event) =>
                          handleQuantityChange(event, quantityIndex)
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="cost"
                        name="cost"
                        variant="outlined"
                        value={quantity.cost}
                        onChange={(event) =>
                          handleQuantityChange(event, quantityIndex)
                        }
                      />

                      <TextField
                        id="outlined-basic"
                        label="avgPersons"
                        name="avgPersons"
                        variant="outlined"
                        value={quantity.avgPersons}
                        onChange={(event) =>
                          handleQuantityChange(event, quantityIndex)
                        }
                      />

                      <Button
                        onClick={() => handleRemoveQuantity(quantityIndex)}
                      >
                        <BackspaceIcon sx={{ color: "black" }} />
                      </Button>
                    </Paper>
                  ))}
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ margin: "1em" }}
                    onClick={() => handleAddQuantity()}
                  >
                    Add quantity
                  </Button>
                </Paper>
              </Paper>
            ) : (
              <TableContainer component={Paper}>
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
                    {item.quantities.map((quantity, quantityIndex) => (
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
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default MenuItemDetailed;
