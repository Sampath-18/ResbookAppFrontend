import { Paper, Typography } from "@mui/material";
import React from "react";

const MenuCategory = () => {
    const Menu = [
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
  return (
    <Paper elevation={0} sx={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
        {
            Menu.map((menuCategory, categoryIndex) => (
                <Paper elevation={5} sx={{marginTop:"1em", width:"30%"}}>
                    <Typography variant="h5" fontWeight="bold">
                        {menuCategory.categoryName}
                    </Typography>
                    {
                        menuCategory.Items.map((item,itemIndex) => (
                            <>
                                {
                                    item.quantities.map((quantity, quantityIndex) => (
                                        <Paper elevation={0} sx={{display:"flex", justifyContent:"space-between"}}>
                                            <Typography variant="body1" sx={{ml:"1em"}}>{item.itemName} ({quantity.quantity})</Typography>
                                            <Typography variant="body1" sx={{mr:"1em"}}>{quantity.cost}/-</Typography>
                                        </Paper>
                                    ))
                                }
                            </>
                        ))
                    }
                </Paper>
            ))
        }
    </Paper>
  );
};

export default MenuCategory;
