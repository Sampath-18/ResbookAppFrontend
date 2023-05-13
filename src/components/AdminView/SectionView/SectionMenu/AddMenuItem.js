import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "@mui/material/Button";

const AddMenuItem = (props) => {
  const [item, setItem] = useState({itemName:"",type:"",quantities:[{ quantity: "", cost: 0, avgPersons: 0 }],menuCategoryId:props.menuCategoryId});


  const onAddClick = async () => {
    try {
      const menuItemResponse = await fetch(
        `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/` +
          props.menuCategoryId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      menuItemResponse
        .json()
        .then(async (menuItemData) => {
          if (menuItemData.success) {
            console.log( "Menu Item successfully added to DB" );
          } else {
            // notify user that menu item addition failed
            console.log("Menu Item addition failed");
          }
        });
    } catch (error) {
      console.error(error);
    } finally{
        props.setBackdropComponent(null);
    }
  };

  const handleRemoveQuantity = (quantityIndex) => {
    setItem({
      ...item,
      quantities: item.quantities.filter((_, idx) => idx !== quantityIndex),
    });
  };

  const handleQuantityChange = (event, quantityIndex) => {
    let updatedItem =JSON.parse(JSON.stringify(item))
    updatedItem.quantities[quantityIndex][event.target.name]=event.target.value
    setItem(updatedItem)
  };

  const handleAddQuantity = () => {
    setItem({
      ...item,
      quantities: [
        ...item.quantities,
        { quantity: "", cost: 0, avgPersons: 0 },
      ],
    });
  };

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
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
          }}
        >
          <Box sx={{ alignItems: "center" }}>
            <Paper elevation={0} sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                sx={{ margin: "1em", width: "50%" }}
                id="outlined-basic"
                label="Item"
                name="itemName"
                variant="outlined"
                value={item.itemName}
                onChange={(event) => handleChange(event)}
              />

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
                  onClick={() => onAddClick()}
                >
                  Add
                </Button>
              </Container>
            </Paper>

            
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
                    value={item.type}
                    onChange={(event) => handleChange(event)}
                  />
                </Paper>
                <Paper
                  elevation={0}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {item.quantities.map((quantity, quantityIndex) => (
                    <Paper
                    key={quantityIndex}
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
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AddMenuItem;
