import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

const BookCatering = () => {
  const menu = [
    {
      categoryName: "Salads",
      Items: [
        {
          itemName: "Phuket's SOM TAM",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "CAESAR Baby COS - Veg",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "CAESAR Baby COS - Chicken",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
      ],
    },
    {
      categoryName: "Soups",
      Items: [
        {
          itemName: "Oven Roasted Tomato",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Sweet Corn Soup",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Veg mancho soup",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
      ],
    },
    {
      categoryName: "Starters",
      Items: [
        {
          itemName: "Chicken 65",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Chicken lollipop",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Chicken Manchuria",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Chilli chicken",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Apollo fish",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Dry prawns",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
        {
          itemName: "Chicken Pakoda",
          quantities: [
            {
              quantity: "small",
              cost: 200,
            },
            {
              quantity: "regular",
              cost: 300,
            },
            {
              quantity: "large",
              cost: 400,
            },
          ],
          quantityIndexSelected: 0,
        },
      ],
    },
  ];
  //   console.log(menu);
  const [Menu, setMenu] = useState(menu);

  const initialBooking = [];
  for (let i = 0; i < Menu.length; i++) {
    initialBooking.push({ categoryName: Menu[i].categoryName, ItemsAdded: [] });
  }
  const [bookingDetails, setBookingDetails] = useState(initialBooking);
  //   console.log(bookingDetails);

  const quantityIndexfn = (item, quantity) => {
    let quantityIndex = 0;
    for (let i = 0; i < item.quantities.length; i++) {
      if (item.quantities[i].quantity === quantity) {
        quantityIndex = i;
        break;
      }
    }
    return quantityIndex;
  };

  const handleQuantityChange = (event, categoryIndex, ItemIndex) => {
    const item = { ...Menu[categoryIndex].Items[ItemIndex] };
    const quantityIndex = quantityIndexfn(item, event.target.value);
    // console.log(quantityIndex);
    item.quantityIndexSelected = quantityIndex;
    // console.log(item);
    const categoryBookings = { ...Menu[categoryIndex] };
    categoryBookings.Items[ItemIndex] = item;
    const newMenu = [...Menu];
    newMenu[categoryIndex] = categoryBookings;
    setMenu(newMenu);
    // console.log(newBookingDetails[categoryIndex].Items[ItemIndex])
    // console.log(Menu[categoryIndex].Items[ItemIndex].quantityIndexSelected);
    // console.log(bookingDetails[categoryIndex].Items[ItemIndex].quantities[bookingDetails[categoryIndex].Items[ItemIndex].quantityIndexSelected].quantity);
  };

  const handleAddToBooking = (categoryIndex, ItemIndex) => {
    const newBookingDetails = [...bookingDetails];
    const categoryBookings = { ...bookingDetails[categoryIndex] };
    const item = Menu[categoryIndex].Items[ItemIndex];
    const quantityIndex = item.quantityIndexSelected;
    const itemToAdd = {
      itemName: item.itemName,
      quantity: item.quantities[quantityIndex].quantity,
      cost: item.quantities[quantityIndex].cost,
      orderQuantity: 1,
    };
    for (let i = 0; i < categoryBookings.ItemsAdded.length; i++) {
      // let currentItem = categoryBookings.ItemsAdded[i]
      if (
        itemToAdd.itemName === categoryBookings.ItemsAdded[i].itemName &&
        categoryBookings.ItemsAdded[i].quantity === itemToAdd.quantity
      ) {
        //item already in cart, so no need to add again
        console.log(
          "Item : " +
            itemToAdd.itemName +
            "(" +
            itemToAdd.quantity +
            ") is already present in cart..."
        );
        return;
      }
    }
    categoryBookings.ItemsAdded.push(itemToAdd);
    newBookingDetails[categoryIndex] = categoryBookings;
    setBookingDetails(newBookingDetails);
    // console.log(bookingDetails[categoryIndex].ItemsAdded);
    console.log(
      "Item : " +
        itemToAdd.itemName +
        "(" +
        itemToAdd.quantity +
        ") is added to cart..."
    );
  };

  const handleRemoveFromBooking = (categoryIndex, ItemIndex) => {
    const newBookingDetails = [...bookingDetails];
    const categoryBookings = { ...bookingDetails[categoryIndex] };
    console.log(
      "Item : " +
        categoryBookings.ItemsAdded[ItemIndex].itemName +
        "(" +
        categoryBookings.ItemsAdded[ItemIndex].quantity +
        ") is removed from cart..."
    );
    categoryBookings.ItemsAdded = categoryBookings.ItemsAdded.filter(
      (_, i) => i !== ItemIndex
    );
    newBookingDetails[categoryIndex] = categoryBookings;
    setBookingDetails(newBookingDetails);
  };

  const handleOrderQuantityChange = (event, categoryIndex, itemIndex) => {
    const changedBookingDetails = [...bookingDetails];
    const changedCategory = { ...bookingDetails[categoryIndex] };
    const changedItem = { ...changedCategory.ItemsAdded[itemIndex] };
    let changedValue = changedItem.orderQuantity;
    if (event.target.name === "-") changedValue = changedValue - 1;
    else if (event.target.name === "+") changedValue = changedValue + 1;
    else changedValue = event.target.value;
    changedItem.orderQuantity = changedValue;
    changedCategory.ItemsAdded[itemIndex] = changedItem;
    changedBookingDetails[categoryIndex] = changedCategory;
    setBookingDetails(changedBookingDetails);
  };

  const totalBillValue = () => {
    let billValue = 0;
    for(let categoryIndex in bookingDetails)
    {
      const items = bookingDetails[categoryIndex].ItemsAdded
      for(let itemIndex in items)
      {
        billValue+=(items[itemIndex].cost)*(items[itemIndex].orderQuantity)
      }
    }
    return billValue
  }

  return (
    <Paper elevation={3}>
      <Typography variant="h4" fontWeight="bold">
        Book your Catering
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Paper sx={{ width: "45%" }}>
          {Menu.map((menuCategory, categoryIndex) => (
            <Paper
              key={categoryIndex}
              elevation={3}
              sx={{ marginTop: "1.5em" }}
            >
              <Typography variant="h5" fontWeight="bold">
                {menuCategory.categoryName}
              </Typography>
              {menuCategory.Items.map((item, itemIndex) => (
                <Paper
                  key={itemIndex}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "0.5em",
                  }}
                >
                  <div style={{ marginLeft: "1em" }}>
                    <Avatar sx={{}}>
                      <PersonIcon />
                    </Avatar>
                  </div>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "1em",
                      textAlign: "left",
                      width: "100%",
                    }}
                    elevation={0}
                  >
                    <Typography variant="h6" fontWeight="body1" sx={{}}>
                      {item.itemName}
                    </Typography>
                    <Paper
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <FormControl fullWidth sx={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Quantity
                        </InputLabel>
                        <Select
                          value={
                            item.quantities[item.quantityIndexSelected].quantity
                          }
                          name="quantities"
                          label="Quantity"
                          onChange={(event) =>
                            handleQuantityChange(
                              event,
                              categoryIndex,
                              itemIndex
                            )
                          }
                        >
                          {item.quantities.map((quantity, quantityIndex) => (
                            <MenuItem
                              name="quantity"
                              key={quantityIndex}
                              value={quantity.quantity}
                            >
                              {quantity.quantity}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Typography>
                        {item.quantities[item.quantityIndexSelected].cost}
                      </Typography>
                      <Button
                        onClick={() =>
                          handleAddToBooking(categoryIndex, itemIndex)
                        }
                      >
                        +
                      </Button>
                    </Paper>
                  </Paper>
                </Paper>
              ))}
            </Paper>
          ))}
        </Paper>
        <Paper sx={{ width: "45%" }}>
          <Typography variant="h5" fontWeight="bold">
            Order Summary:
          </Typography>
          {bookingDetails.map((category, categoryIndex) =>
            category.ItemsAdded.length !== 0 ? (
              <Paper sx={{ marginTop: "1em" }}>
                <Typography variant="h5" fontWeight="bold">
                  {category.categoryName}
                </Typography>
                {category.ItemsAdded.map((item, itemIndex) => (
                  <Paper
                    key={itemIndex}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "0.5em",
                    }}
                  >
                    <div style={{ marginLeft: "1em" }}>
                      <Avatar sx={{}}>
                        <PersonIcon />
                      </Avatar>
                    </div>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "1em",
                        textAlign: "left",
                        width: "100%",
                      }}
                      elevation={0}
                    >
                      <Paper elevation={0} sx={{display:'flex', justifyContent:'space-between'}}>
                        <Typography variant="h6" fontWeight="body1" sx={{}}>
                          {item.itemName}
                        </Typography>
                        <Button onClick={() => handleRemoveFromBooking(categoryIndex, itemIndex) } >
                          x
                        </Button>
                      </Paper>
                      <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", }} >
                        <Typography>{item.quantity}</Typography>
                        <Paper elevation={0} sx={{ display: "flex", width: "60%" }} >
                          <Button name="-" onClick={(event) => handleOrderQuantityChange( event, categoryIndex, itemIndex ) } >
                            -
                          </Button>
                          <TextField name="orderQuantity" value={item.orderQuantity} onChange={(event) => handleOrderQuantityChange( event, categoryIndex, itemIndex ) } />
                          <Button name="+" onClick={(event) => handleOrderQuantityChange( event, categoryIndex, itemIndex ) } >
                            +
                          </Button>
                        </Paper>
                        <Typography>
                          {item.cost * item.orderQuantity}
                        </Typography>
                      </Paper>
                    </Paper>
                  </Paper>
                ))}
              </Paper>
            ) : (
              null
            )
          )}
          <Typography sx={{marginTop:'1em'}}><b>Total Bill Value</b> : {totalBillValue()}</Typography>
        </Paper>
      </Paper>
    </Paper>
  );
};

export default BookCatering;
