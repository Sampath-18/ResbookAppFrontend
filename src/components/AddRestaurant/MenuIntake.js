import { Typography, Paper, TextField, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";


// menu=[{categoryName:'starters',menuItems:[{
//   Item: "",
//   About: "",
//   quantities: [
//     {cost: 250, quantity: "regular",avgPersons: 2},
//     {cost: 150, quantity: "small",avgPersons: 1},
//     {cost: 400, quantity: "large",avgPersons: 3},
//   ]
// }]},
// {}]


const MenuIntake = (props) => {
  const [menuCategories, setMenuCategories] = useState([]);

  const handleAddMenuCategory = () => {
    setMenuCategories([...menuCategories, { categoryName: "", menuItems: [] }]);
    props.setMenu(menuCategories);
  };

  const handleRemoveMenuCategory = (index1) => {
    setMenuCategories(menuCategories.filter((_, index) => index !== index1));
    props.setMenu(menuCategories);
  };

  const handleAddMenuItem = (categoryIndex) => {
    // const newId = menuItems.length === 0 ? 1 : menuItems[menuItems.length - 1] + 1;
    // console.log( "Before item add:", categoryIndex, menuCategories[categoryIndex].menuItems.length );
    const menuCategoriesNew = [...menuCategories];
    const menuCategory = { ...menuCategoriesNew[categoryIndex] };
    menuCategory.menuItems = [
      ...menuCategory.menuItems,
      {
        // new item being added to the previous list
        itemName: "",
        About: "",
        type: "",
        quantities: [
          {cost: 0, quantity: "",avgPersons: 1},
        ]
      },
    ];
    menuCategoriesNew[categoryIndex] = menuCategory;
    setMenuCategories(menuCategoriesNew);
    // console.log( "After item add:", categoryIndex, menuCategories[categoryIndex].menuItems.length );
    props.setMenu(menuCategories);
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
    // console.log(menuCategories.length, menuCategories[categoryIndex].menuItems.length);
    props.setMenu(menuCategories);
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
    props.setMenu(menuCategories);
  };

  const handleAddQuantity = (categoryIndex, itemIndex) => {
    const menu = [...menuCategories];
    const category = {...menuCategories[categoryIndex]};
    const item = {...category.menuItems[itemIndex]};
    const quantities = [...(item.quantities), {cost: 0, quantity: "",avgPersons: 1}  ];
    item.quantities = quantities;
    category.menuItems[itemIndex] = item;
    menu[categoryIndex] = category;
    setMenuCategories(menu);
    props.setMenu(menuCategories);
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
    props.setMenu(menuCategories);
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
    props.setMenu(menuCategories);
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
              name="categoryName"
              variant="outlined"
              value={menuCategory.categoryName}
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
                      <TextField sx={{margin:"1em"}} id="outlined-basic" label="Item" name="itemName" variant="outlined" value={menuItem.itemName} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
                      {/* <TextField sx={{margin:"1em"}} id="outlined-basic" label="About" name="About" variant="outlined" value={menuItem.About} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } /> */}
                      <TextField sx={{margin:"1em"}} id="outlined-basic" label="Type" name="type" variant="outlined" value={menuItem.type} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
                    </Paper>
                    <Paper elevation={0} sx={{display:"flex", flexDirection:"column"}}>
                    {
                        menuItem.quantities.map((quantity, quantityIndex) => (
                          <Paper elevation={0} sx={{display:"flex", flexDirection:"row", margin:"1em"}}>
                              <TextField id="outlined-basic" label="quantity" name="quantity" variant="outlined" value={quantity.quantity} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                              <TextField id="outlined-basic" label="cost" name="cost" variant="outlined" value={quantity.cost} onChange={(event) => handleQuantityChange(event, categoryIndex, itemIndex, quantityIndex) } />
                            
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
