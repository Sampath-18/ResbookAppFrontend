import { Container } from "@mui/system";

const BottomBar = () => {
    return ( 
        <Container>
            
        </Container>
     );
}
 
export default BottomBar;



// whole menuIntake previous without quantities


// import { Typography, Paper, TextField, Button, Grid } from "@mui/material";
// import { Container } from "@mui/system";
// import React, { useState } from "react";

// // menu=[{categoryName:'starters',menuItems:[{
// //   Item: "",
// //   About: "",
// //   quantities: [
// //     {Cost: 250, quantity: "regular",avgPersons: 2},
// //     {Cost: 150, quantity: "small",avgPersons: 1},
// //     {Cost: 400, quantity: "large",avgPersons: 3},
// //   ]
// // }]},
// // {}]

// const MenuIntake = () => {
//   const [menuCategories, setMenuCategories] = useState([]);

//   const handleAddMenuCategory = () => {
//     setMenuCategories([...menuCategories, { menuCategory: "", menuItems: [] }]);
//   };

//   const handleRemoveMenuCategory = (index1) => {
//     setMenuCategories(menuCategories.filter((_, index) => index !== index1));
//   };

//   const handleAddMenuItem = (categoryIndex) => {
//     // const newId = menuItems.length === 0 ? 1 : menuItems[menuItems.length - 1] + 1;
//     console.log(
//       "Before item add:",
//       categoryIndex,
//       menuCategories[categoryIndex].menuItems.length
//     );
//     const menuCategoriesNew = [...menuCategories];
//     const menuCategory = { ...menuCategoriesNew[categoryIndex] };
//     menuCategory.menuItems = [
//       ...menuCategory.menuItems,
//       {
//         // new item being added to the previous list
//         Item: "",
//         About: "",
//         quantities: [
//           {Cost: 0, quantity: "",avgPersons: 1},
//         ]
//       },
//     ];
//     menuCategoriesNew[categoryIndex] = menuCategory;
//     setMenuCategories(menuCategoriesNew);
//     console.log(
//       "After item add:",
//       categoryIndex,
//       menuCategories[categoryIndex].menuItems.length
//     );
//   };

//   const handleRemoveMenuItem = (index1, index2) => {
//     // setMenuCategories(menuCategories.filter((_,i) => i !== index2));
//     const menuCategory = menuCategories[index1];
//     menuCategory.menuItems = menuCategory.menuItems.filter(
//       (_, i) => i !== index2
//     );
//     const menuCategoryList = [...menuCategories];
//     menuCategoryList[index1] = menuCategory;
//     setMenuCategories(menuCategoryList);
//     console.log(menuCategories.length, menuCategories[index1].menuItems.length);
//   };

//   const handleChange = (e, index1, index2) => {
//     const menuCategoryList = [...menuCategories];
//     const prop = e.target.name;
//     if (index2 === -1) {
//       menuCategoryList[index1][prop] = e.target.value;
//     } else {
//       menuCategoryList[index1].menuItems[index2][prop] = e.target.value;
//     }
//     setMenuCategories(menuCategoryList);
//   };

//   const handleAddQuantity = (event, categoryIndex, itemIndex) => {
//     const menu = [...menuCategories];
//     const category = {...menuCategories[categoryIndex]};
//     const item = {...category.menuItems[itemIndex]};
//     const quantities = [...item.quantities, {Cost: 0, quantity: "",avgPersons: 1}  ];
//     item.quantities = quantities
//     category.menuItems[itemIndex] = item;
//     menu[categoryIndex] = category;
//     setMenuCategories(menu);
//   }

//   const handleRemoveQuantity = (event, categoryIndex, itemIndex, quantityIndex) => {
//     const menu = [...menuCategories];
//     const category = {...menuCategories[categoryIndex]};
//     const item = {...category.menuItems[itemIndex]};
//     const quantities = item.quantities.filter((_,i) => i!==quantityIndex);
//     item.quantities = quantities
//     category.menuItems[itemIndex] = item;
//     menu[categoryIndex] = category;
//     setMenuCategories(menu);
//   }



//   return (
//     <Paper elevation={3} sx={{ marginTop: "2em" }}>
//       <Typography variant="h4">Enter Menu Here</Typography>
//       {menuCategories.map((menuCategory, categoryIndex) => {
//         return (
//           <Paper elevation={0} sx={{ marginTop: "1em" }} key={categoryIndex}>
//             <TextField
//               id="outlined-basic"
//               label="Menu Category"
//               name="menuCategory"
//               variant="outlined"
//               value={menuCategory.menuCategory}
//               onChange={(event) => handleChange(event, categoryIndex, -1)}
//             />
//             {menuCategory.menuItems.map((menuItem, itemIndex) => {
//               return (
//                 <Paper
//                   elevation={0}
//                   sx={{ marginTop: "1em", padding: "1em" }}
//                   key={itemIndex}
//                 >
//                   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
//                     <Grid item xs={2} sm={4} md={4}>
//                       <TextField id="outlined-basic" label="Item" name="Item" variant="outlined" value={menuItem.Item} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
//                     </Grid>
//                     <Grid item xs={2} sm={4} md={4}>
//                       <TextField id="outlined-basic" label="About" name="About" variant="outlined" value={menuItem.About} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
//                     </Grid>
                    
//                     <Grid item xs={2} sm={4} md={4}>
//                       <TextField id="outlined-basic" label="Cost" name="Cost" variant="outlined" value={menuItem.Cost} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
//                     </Grid>
//                     <Grid item xs={2} sm={4} md={4}>
//                       <TextField id="outlined-basic" label="quantity" name="quantity" variant="outlined" value={menuItem.quantity} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
//                     </Grid>
//                     <Grid item xs={2} sm={4} md={4}>
//                       <TextField id="outlined-basic" label="avgPersons" name="avgPersons" variant="outlined" value={menuItem.avgPersons} onChange={(event) => handleChange(event, categoryIndex, itemIndex) } />
//                     </Grid>
//                     <Grid item xs={2} sm={4} md={4}>
//                       <Button variant="contained" onClick={() => handleRemoveMenuItem(categoryIndex, itemIndex)} >
//                         Remove Item
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               );
//             })}
//             <Button
//               variant="contained"
//               onClick={() => handleAddMenuItem(categoryIndex)}
//             >
//               Add Item
//             </Button>
//             <Button
//               variant="contained"
//               onClick={() => handleRemoveMenuCategory(categoryIndex)}
//             >
//               Remove menu category
//             </Button>
//           </Paper>
//         );
//       })}
//       <Button variant="contained" onClick={() => handleAddMenuCategory()}>
//         Add Menu Category
//       </Button>
//     </Paper>
//   );
// };

// export default MenuIntake;
