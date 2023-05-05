import { Button, Divider, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const AddMenuCategory = (props) => {
  const [menuCategory, setMenuCategory] = useState({
    categoryName: "",
    Items: [],
    sectionId: props.sectionId,
  });

  const onSaveClick = async () => {
    try {
      const menucategoryResponse = await fetch(
        "http://localhost:8080/updateRestaurant/updateSection/addMenuCategory/" +
          props.sectionId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName: menuCategory.categoryName,
          }),
        }
      );
      menucategoryResponse.json().then(async (categoryResponseData) => {
        if (categoryResponseData.success) {
          const categoryId = categoryResponseData.menuCategoryId;
          console.log(
            "Menu Category added successfully to DB"
          );
          for (const menuItem of menuCategory.Items) {
            console.log("item adding:", JSON.stringify(menuItem));
            // console.log("End point called:","http://localhost:8080/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/"+categoryId)
            const menuItemResponse = await fetch(
              "http://localhost:8080/updateRestaurant/updateSection/updateMenuCategory/addMenuItem/" +
                categoryId,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(menuItem),
              }
            );
            menuItemResponse.json().then(async (menuItemData) => {
              if (menuItemData.success) {
                console.log( "Menu Item:", menuItem.itemName, "added to Menu Category:", menuCategory.categoryName, "successfully to DB" );
              } else {
                // notify user that menu item addition failed
                console.log("Menu Item addition failed");
              }
            });
          }
        } else {
          // notify user that menu category addition failed
          console.log("Menu Category addition failed");
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      props.setBackdropComponent(null);
    }
  };

  const handleRemoveQuantity = (itemIndex, quantityIndex) => {
    let updatedCategory = JSON.parse(JSON.stringify(menuCategory));
    updatedCategory.Items[itemIndex].quantities = updatedCategory.Items[
      itemIndex
    ].quantities.filter((_, idx) => idx !== quantityIndex);
    setMenuCategory(updatedCategory);
  };

  const handleQuantityChange = (event, itemIndex, quantityIndex) => {
    let updatedCategory = JSON.parse(JSON.stringify(menuCategory));
    updatedCategory.Items[itemIndex].quantities[quantityIndex][
      event.target.name
    ] = event.target.value;
    setMenuCategory(updatedCategory);
  };

  const handleAddQuantity = (itemIndex) => {
    let updatedCategory = JSON.parse(JSON.stringify(menuCategory));
    updatedCategory.Items[itemIndex].quantities.push({
      quantity: "",
      cost: 0,
      avgPersons: 0,
    });
    setMenuCategory(updatedCategory);
  };

  const handleAddMenuItem = () => {
    setMenuCategory({
      ...menuCategory,
      Items: [
        ...menuCategory.Items,
        {
          itemName: "",
          type: "",
          quantities: [{ quantity: "", cost: 0, avgPersons: 0 }],
          menuCategoryId: props.menuCategoryId,
        },
      ],
    });
  };

  const handleRemoveMenuItem = (itemIndex) => {
    let updatedCategory = JSON.parse(JSON.stringify(menuCategory));
    updatedCategory.Items = updatedCategory.Items.filter(
      (_, idx) => idx !== itemIndex
    );
    setMenuCategory(updatedCategory);
  };

  const handleItemChange = (event, itemIndex) => {
    let updatedCategory = JSON.parse(JSON.stringify(menuCategory));
    updatedCategory.Items[itemIndex][event.target.name] = event.target.value;
    setMenuCategory(updatedCategory);
  };

  //changing category name
  const handleCategoryChange = (event) => {
    setMenuCategory({
      ...menuCategory,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Paper elevation={0} sx={{ marginTop: "1em" }}>
      <TextField
        id="outlined-basic"
        label="Menu Category"
        name="categoryName"
        variant="outlined"
        value={menuCategory.categoryName}
        onChange={(event) => handleCategoryChange(event)}
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "green", marginLeft: "2em" }}
        onClick={() => onSaveClick()}
      >
        Save
      </Button>
      {menuCategory.Items.map((menuItem, itemIndex) => {
        return (
          <Paper
            elevation={0}
            sx={{ marginTop: "1em", padding: "1em" }}
            key={itemIndex}
          >
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
                <TextField
                  sx={{ margin: "1em" }}
                  id="outlined-basic"
                  label="Item"
                  name="itemName"
                  variant="outlined"
                  value={menuItem.itemName}
                  onChange={(event) => handleItemChange(event, itemIndex)}
                />
                {/* <TextField sx={{margin:"1em"}} id="outlined-basic" label="About" name="About" variant="outlined" value={menuItem.About} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } /> */}
                <TextField
                  sx={{ margin: "1em" }}
                  id="outlined-basic"
                  label="Type"
                  name="type"
                  variant="outlined"
                  value={menuItem.type}
                  onChange={(event) => handleItemChange(event, itemIndex)}
                />
              </Paper>
              <Paper
                elevation={0}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {menuItem.quantities.map((quantity, quantityIndex) => (
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
                        handleQuantityChange(event, itemIndex, quantityIndex)
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="cost"
                      name="cost"
                      variant="outlined"
                      value={quantity.cost}
                      onChange={(event) =>
                        handleQuantityChange(event, itemIndex, quantityIndex)
                      }
                    />

                    <TextField
                      id="outlined-basic"
                      label="avgPersons"
                      name="avgPersons"
                      variant="outlined"
                      value={quantity.avgPersons}
                      onChange={(event) =>
                        handleQuantityChange(event, itemIndex, quantityIndex)
                      }
                    />

                    <Button
                      onClick={(event) =>
                        handleRemoveQuantity(itemIndex, quantityIndex)
                      }
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
                  onClick={() => handleAddQuantity(itemIndex)}
                >
                  Add quantity
                </Button>
                <Button
                  variant="contained"
                  sx={{ margin: "1em" }}
                  onClick={() => handleRemoveMenuItem(itemIndex)}
                >
                  Remove Item
                </Button>
              </Paper>
            </Paper>
          </Paper>
        );
      })}
      <Paper elevation={0}>
        <Button
          variant="contained"
          sx={{ margin: "1em" }}
          onClick={() => handleAddMenuItem()}
        >
          Add Item
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "1em" }}
          onClick={() => props.setBackdropComponent()}
        >
          Remove menu category
        </Button>
      </Paper>
    </Paper>
  );
};

export default AddMenuCategory;
