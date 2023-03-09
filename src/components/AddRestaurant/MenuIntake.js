import { Typography, Paper, TextField, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";


// menu=[{categoryName:'starters',menuItems:[{
//   Item: "",
//   About: "",
//   quantities: [
//     {Cost: 250, quantity: "regular",avgPersons: 2},
//     {Cost: 150, quantity: "small",avgPersons: 1},
//     {Cost: 400, quantity: "large",avgPersons: 3},
//   ]
// }]},
// {}]

const MenuIntake = () => {
  const [menuCategories, setMenuCategories] = useState([]);

  const handleAddMenuCategory = () => {
    setMenuCategories([...menuCategories, { menuCategory: "", menuItems: [] }]);
  };

  const handleRemoveMenuCategory = (index1) => {
    setMenuCategories(menuCategories.filter((_, index) => index !== index1));
  };

  const handleAddMenuItem = (categoryIndex) => {
    // const newId = menuItems.length === 0 ? 1 : menuItems[menuItems.length - 1] + 1;
    console.log(
      "Before item add:",
      categoryIndex,
      menuCategories[categoryIndex].menuItems.length
    );
    const menuCategoriesNew = [...menuCategories];
    const menuCategory = { ...menuCategoriesNew[categoryIndex] };
    menuCategory.menuItems = [
      ...menuCategory.menuItems,
      {
        // new item being added to the previous list
        Item: "",
        About: "",
        quantities: [
          {Cost: 0, quantity: "",avgPersons: 1},
        ]
      },
    ];
    menuCategoriesNew[categoryIndex] = menuCategory;
    setMenuCategories(menuCategoriesNew);
    console.log(
      "After item add:",
      categoryIndex,
      menuCategories[categoryIndex].menuItems.length
    );
  };

  const handleRemoveMenuItem = (categoryIndex, itemIndex) => {
    // setMenuCategories(menuCategories.filter((_,i) => i !== index2));
    const menuCategory = menuCategories[categoryIndex];
    menuCategory.menuItems = menuCategory.menuItems.filter(
      (_, i) => i !== itemIndex
    );
    const menuCategoryList = [...menuCategories];
    menuCategoryList[categoryIndex] = menuCategory;
    setMenuCategories(menuCategoryList);
    console.log(menuCategories.length, menuCategories[categoryIndex].menuItems.length);
  };

  const handleChange = (event, categoryIndex, itemIndex) => {
    const menuCategoryList = [...menuCategories];
    const prop = event.target.name;
    if (itemIndex === -1) {
      menuCategoryList[categoryIndex][prop] = event.target.value;
    } else {
      menuCategoryList[categoryIndex].menuItems[itemIndex][prop] = event.target.value;
    }
    setMenuCategories(menuCategoryList);
  };

  const handleAddQuantity = (categoryIndex, itemIndex) => {
    const menu = [...menuCategories];
    const category = {...menuCategories[categoryIndex]};
    const item = {...category.menuItems[itemIndex]};
    const quantities = [...(item.quantities), {Cost: 0, quantity: "",avgPersons: 1}  ];
    item.quantities = quantities;
    category.menuItems[itemIndex] = item;
    menu[categoryIndex] = category;
    setMenuCategories(menu);
  }

  const handleQuantityChange = (event, categoryIndex, itemIndex, quantityIndex) => {
    const menu = [...menuCategories];
    const category = {...menuCategories[categoryIndex]};
    const item = {...category.menuItems[itemIndex]};
    const quantity = {...item.quantities[quantityIndex]};
    quantity[event.target.name] = event.target.value;
    item.quantities[quantityIndex]=quantity;
    category.menuItems[itemIndex]=item;
    menu[categoryIndex]=category;
    setMenuCategories(menu);
  }

  const handleRemoveQuantity = (event, categoryIndex, itemIndex, quantityIndex) => {
    const menu = [...menuCategories];
    const category = {...menuCategories[categoryIndex]};
    const item = {...category.menuItems[itemIndex]};
    const quantities = item.quantities.filter((_,i) => i!==quantityIndex);
    item.quantities = quantities
    if(item.quantities.length===0)
    {
      handleRemoveMenuItem(categoryIndex, itemIndex);
      return;
    }
    category.menuItems[itemIndex] = item;
    menu[categoryIndex] = category;
    setMenuCategories(menu);
  }



  return (
    <Paper elevation={3} sx={{ marginTop: "2em" }}>
      <Typography variant="h4">Enter Menu Here</Typography>
      {menuCategories.map((menuCategory, categoryIndex) => {
        return (
          <Paper elevation={0} sx={{ marginTop: "1em" }} key={categoryIndex}>
            <TextField
              id="outlined-basic"
              label="Menu Category"
              name="menuCategory"
              variant="outlined"
              value={menuCategory.menuCategory}
              onChange={(event) => handleChange(event, categoryIndex, -1)}
            />
            {menuCategory.menuItems.map((menuItem, itemIndex) => {
              return (
                <Paper
                  elevation={0}
                  sx={{ marginTop: "1em", padding: "1em" }}
                  key={itemIndex}
                >
                  <Paper elevation={0} sx={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                    <Paper elevation={0} sx={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
                      <TextField sx={{margin:"1em"}} id="outlined-basic" label="Item" name="Item" variant="outlined" value={menuItem.Item} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
                      <TextField sx={{margin:"1em"}} id="outlined-basic" label="About" name="About" variant="outlined" value={menuItem.About} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
                    </Paper>
                    <Paper elevation={0} sx={{display:"flex", flexDirection:"column"}}>
                    {
                        menuItem.quantities.map((quantity, quantityIndex) => (
                          <Paper elevation={0} sx={{display:"flex", flexDirection:"row", margin:"1em"}}>
                              <TextField id="outlined-basic" label="quantity" name="quantity" variant="outlined" value={quantity.quantity} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                              <TextField id="outlined-basic" label="Cost" name="Cost" variant="outlined" value={quantity.Cost} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                            
                              <TextField id="outlined-basic" label="avgPersons" name="avgPersons" variant="outlined" value={quantity.avgPersons} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                            
                              <Button onClick={(event) => handleRemoveQuantity(event, categoryIndex, itemIndex, quantityIndex)}>
                                    <BackspaceIcon
                          sx={{ color: "black" }}
                        />
                              </Button>
                          </Paper> 
                        ))
                    }
                    </Paper>
                    <Paper elevation={0} sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
                      <Button variant="contained" sx={{margin:"1em"}} onClick={() => handleAddQuantity(categoryIndex, itemIndex)} >
                        Add quantity
                      </Button>
                      <Button variant="contained" sx={{margin:"1em"}} onClick={() => handleRemoveMenuItem(categoryIndex, itemIndex)} >
                        Remove Item
                      </Button>
                    </Paper>
                  </Paper>
                  {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={2} sm={4} md={4}>
                      <TextField id="outlined-basic" label="Item" name="Item" variant="outlined" value={menuItem.Item} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                      <TextField id="outlined-basic" label="About" name="About" variant="outlined" value={menuItem.About} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
                    </Grid>
                    {
                      menuItem.quantities.map((quantity, quantityIndex) => (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                          <Grid item xs={2} sm={4} md={4}>
                            <TextField id="outlined-basic" label="quantity" name="quantity" variant="outlined" value={quantity.quantity} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                          </Grid>
                          <Grid item xs={2} sm={4} md={4}>
                            <TextField id="outlined-basic" label="Cost" name="Cost" variant="outlined" value={quantity.Cost} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                          </Grid>
                          <Grid item xs={2} sm={4} md={4}>
                            <TextField id="outlined-basic" label="avgPersons" name="avgPersons" variant="outlined" value={quantity.avgPersons} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                          </Grid>
                          <Grid item xs={2} sm={4} md={4}>
                            <Button onClick={(event) => handleRemoveQuantity(event, categoryIndex, itemIndex, quantityIndex)}>x</Button>
                          </Grid> 
                        </Grid>
                      ))
                    }
                    <Grid item xs={2} sm={4} md={4}>
                      <Button variant="contained" onClick={() => handleAddQuantity(categoryIndex, itemIndex)} >
                        Add quantity
                      </Button>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                      <Button variant="contained" onClick={() => handleRemoveMenuItem(categoryIndex, itemIndex)} >
                        Remove Item
                      </Button>
                    </Grid>
                  </Grid> */}
                </Paper>
              );
            })}
            <Paper elevation={0}>
            <Button variant="contained" sx={{margin:"1em",}} onClick={() => handleAddMenuItem(categoryIndex)} >
              Add Item
            </Button>
            <Button variant="contained" sx={{margin:"1em",}} onClick={() => handleRemoveMenuCategory(categoryIndex)} >
              Remove menu category
            </Button>
            </Paper>
            <Divider />
          </Paper>
        );
      })}
      <Button sx={{margin:"1em",}} variant="contained" onClick={() => handleAddMenuCategory()}>
        Add Menu Category
      </Button>
    </Paper>
  );
};

export default MenuIntake;
