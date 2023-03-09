import React from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Booking from "./Booking";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Reviews from "../Reviews/Reviews";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

const Restaurant = () => {

  const restaurants = [
    {
      name: "Tamasha",
      Location: "Central Delhi",
      AvgCost: 2000,
      sections: [
        {
          secName: "Bar",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/j/p20996-145631488756cd9a0796608.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/x/c/p20996-1484733974587f3e1682218.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 1.1,
          Overview:
            "This section of our TAMASHA Restaurant serves food along with alcohol for the alcohol lovers. Wine and a friend is always a divine combo.",
          Menu: [
            {
              categoryName: "Salads",
              Items: [
                {
                  itemName: "Phuket's SOM TAM",
                  cost: 455,
                },
                {
                  itemName: "CAESAR Baby COS - Veg",
                  cost: 455,
                },
                {
                  itemName: "CAESAR Baby COS - Chicken",
                  cost: 485,
                },
              ],
            },
            {
              categoryName: "Soups",
              Items: [
                {
                  itemName: "Oven Roasted Tomato",
                  cost: 285,
                },
                {
                  itemName: "Sweet Corn Soup",
                  cost: 315,
                },
                {
                  itemName: "Veg mancho soup",
                  cost: 335,
                },
              ],
            },
            {
              categoryName: "Starters",
              Items: [
                {
                  itemName: "Chicken 65",
                  cost: 370,
                },
                {
                  itemName: "Chicken lollipop",
                  cost: 385,
                },
                {
                  itemName: "Chicken Manchuria",
                  cost: 330,
                },
                {
                  itemName: "Chilli chicken",
                  cost: 385,
                },
                {
                  itemName: "Apollo fish",
                  cost: 415,
                },
                {
                  itemName: "Dry prawns",
                  cost: 400,
                },
                {
                  itemName: "Chicken Pakoda",
                  cost: 270,
                },
              ],
            },
          ],
        },
        {
          secName: "Family",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/d/p20996-145631488756cd9a077db0c.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/x/h/p20996-14609783895714c2d5ce139.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2000,
          sectionId: 1.2,
          Overview:
            "This section of our TAMASHA Restaurant is specially designed for families to make their moments memories.",
          Menu: [
            {
              categoryName: "Salads",
              Items: [
                {
                  itemName: "Custard",
                  cost: 455,
                },
                {
                  itemName: "Apple special",
                  cost: 455,
                },
                {
                  itemName: "Caramel apple special",
                  cost: 485,
                },
              ],
            },
            {
              categoryName: "Soups",
              Items: [
                {
                  itemName: "Chicken mancho soup",
                  cost: 285,
                },
                {
                  itemName: "Sweet Corn Soup",
                  cost: 315,
                },
                {
                  itemName: "Veg mancho soup",
                  cost: 335,
                },
              ],
            },
            {
              categoryName: "Starters",
              Items: [
                {
                  itemName: "Chicken roll",
                  cost: 370,
                },
                {
                  itemName: "Fried Chicken",
                  cost: 385,
                },
                {
                  itemName: "Chicken Manchuria",
                  cost: 330,
                },
                {
                  itemName: "Chilli chicken",
                  cost: 385,
                },
                {
                  itemName: "Apollo fish",
                  cost: 415,
                },
                {
                  itemName: "Dry prawns",
                  cost: 400,
                },
                {
                  itemName: "Chicken Pakoda",
                  cost: 270,
                },
              ],
            },
          ],
        },
        {
          secName: "Smoke Area",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/i/i/p20996-14609783895714c2d59bc65.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.3,
          time: "8AM to 12PM",
          AvgCost: 2200,
          sectionId: 1.3,
          Overview:
            "This section of our TAMASHA Restaurant is for smokers to relieve all their tensions.",
          Menu: [
            {
              categoryName: "Soups",
              Items: [
                {
                  itemName: "Chicken mancho soup",
                  cost: 285,
                },
                {
                  itemName: "Sweet Corn Soup",
                  cost: 315,
                },
                {
                  itemName: "Veg mancho soup",
                  cost: 335,
                },
              ],
            },
            {
              categoryName: "Starters",
              Items: [
                {
                  itemName: "Chicken roll",
                  cost: 370,
                },
                {
                  itemName: "Fried Chicken",
                  cost: 385,
                },
                {
                  itemName: "Chicken Manchuria",
                  cost: 330,
                },
                {
                  itemName: "Chilli chicken",
                  cost: 385,
                },
                {
                  itemName: "Apollo fish",
                  cost: 415,
                },
                {
                  itemName: "Dry prawns",
                  cost: 400,
                },
                {
                  itemName: "Chicken Pakoda",
                  cost: 270,
                },
              ],
            },
          ],
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/j/p20996-145631488756cd9a0796608.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/x/c/p20996-1484733974587f3e1682218.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/d/p20996-145631488756cd9a077db0c.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/x/h/p20996-14609783895714c2d5ce139.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/i/i/p20996-14609783895714c2d59bc65.jpg?tr=tr:n-large",
        },
      ],
      rating: 4.1,
      time: "8AM to 12PM",
      id: 1,
    },
    {
      name: "Unplugged Courtyard",
      Location: "Central Delhi",
      AvgCost: 3300,
      sections: [
        {
          secName: "Coffee Area",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/u/y/p20941-15700828565d959028e9f28.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/p/r/p20941-15378744225baa19f63ff48.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 1000,
          sectionId: 2.1,
        },
        {
          secName: "BreakFasts",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/p/g/p20941-15378745145baa1a52c7093.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/o/o/p20941-15666535955d613c9b31b94.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 2.2,
        },
        {
          secName: "AC Dining",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/q/a/p20941-15666535895d613c95c3867.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.3,
          time: "8AM to 12PM",
          AvgCost: 3300,
          sectionId: 2.3,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/u/y/p20941-15700828565d959028e9f28.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/p/r/p20941-15378744225baa19f63ff48.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/p/g/p20941-15378745145baa1a52c7093.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/o/o/p20941-15666535955d613c9b31b94.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/q/a/p20941-15666535895d613c95c3867.jpg?tr=tr:n-large",
        },
      ],
      rating: 4,
      time: "8AM to 12PM",
      id: 2,
    },
    {
      name: "Cafe High 5",
      Location: "Central Delhi",
      AvgCost: 1700,
      sections: [
        {
          secName: "AC Dining",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/d/f/p69146-16614287776307642999f0a.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/i/l/p69146-166142874163076405942d5.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 1900,
          sectionId: 3.1,
        },
        {
          secName: "Open Area",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/g/z/p69146-16614287566307641402616.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/y/l/p69146-1661428770630764221c5e6.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2000,
          sectionId: 3.2,
        },
        {
          secName: "Railway Theme",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/b/z/p69146-16614287916307643776772.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.3,
          time: "8AM to 12PM",
          AvgCost: 2200,
          sectionId: 3.3,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/d/f/p69146-16614287776307642999f0a.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/i/l/p69146-166142874163076405942d5.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/g/z/p69146-16614287566307641402616.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/y/l/p69146-1661428770630764221c5e6.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/b/z/p69146-16614287916307643776772.jpg?tr=tr:n-large",
        },
      ],
      rating: 4,
      time: "8AM to 12PM",
      id: 3,
    },
    {
      name: "Lord of the drinks",
      Location: "Central Palace",
      AvgCost: 2500,
      sections: [
        {
          secName: "Ground Floor",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/o/g/p19975-1649416421625018e5d4198.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/r/q/p19975-1649416428625018ec6a97a.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2300,
          sectionId: 4.1,
        },
        {
          secName: "Floor-I VIP",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/g/o/p19975-1649416435625018f37edd6.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/p/a/p19975-1649416441625018f9b1fcc.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 4.2,
        },
        {
          secName: "Floor-II Bar",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/p/o/p19975-1649416389625018c5ae7ea.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.3,
          time: "8AM to 12PM",
          AvgCost: 3000,
          sectionId: 4.3,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/o/g/p19975-1649416421625018e5d4198.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/r/q/p19975-1649416428625018ec6a97a.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/g/o/p19975-1649416435625018f37edd6.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/p/a/p19975-1649416441625018f9b1fcc.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/p/o/p19975-1649416389625018c5ae7ea.jpg?tr=tr:n-large",
        },
      ],
      rating: 4.2,
      time: "8AM to 12PM",
      id: 4,
    },
    {
      name: "38 barracks",
      Location: "Central Palace",
      AvgCost: 2700,
      sections: [
        {
          secName: "Open Area",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/y/j/p21171-166019927162f4a167b10af.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/l/m/p21171-166019928162f4a171df4fb.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2300,
          sectionId: 5.1,
        },
        {
          secName: "Read Area",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/h/p/p21171-166019931162f4a18fbba76.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 5.2,
        },
        {
          secName: "Pastry Parlour",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/z/y/p21171-166019930162f4a1854c64b.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.3,
          time: "8AM to 12PM",
          AvgCost: 3000,
          sectionId: 5.3,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/y/j/p21171-166019927162f4a167b10af.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/l/m/p21171-166019928162f4a171df4fb.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/h/p/p21171-166019931162f4a18fbba76.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/z/y/p21171-166019930162f4a1854c64b.jpg?tr=tr:n-large",
        },
      ],
      rating: 4.3,
      time: "8AM to 12PM",
      id: 5,
    },
    {
      name: "Somewhere Restaurant and Bar",
      Location: "Central Palace",
      AvgCost: 1000,
      sections: [
        {
          secName: "Casual Dining",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/o/t/p105609-16509585636267a0e3c2854.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/q/s/p105609-16509585776267a0f18d815.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2300,
          sectionId: 6.1,
        },
        {
          secName: "Ice cream Parlour",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/m/p/p105609-16509585496267a0d52450f.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/t/q/p105609-16509585566267a0dc2470b.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 6.2,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/m/p/p105609-16509585496267a0d52450f.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/t/q/p105609-16509585566267a0dc2470b.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/o/t/p105609-16509585636267a0e3c2854.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/q/s/p105609-16509585776267a0f18d815.jpg?tr=tr:n-large",
        },
      ],
      rating: 4.1,
      time: "8AM to 12PM",
      id: 6,
    },
    {
      name: "Ministry of Beer",
      Location: "Central Delhi",
      AvgCost: 3000,
      sections: [
        {
          secName: "Bar and Pub",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/a/d/p32381-1495943585592a49a166fe7.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/r/x/p32381-1495943502592a494e446f1.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2300,
          sectionId: 7.1,
        },
        {
          secName: "Bar and Dine-in",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/f/m/p32381-1495943545592a4979928fe.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/c/l/p32381-1495943574592a499646d08.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 7.2,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/a/d/p32381-1495943585592a49a166fe7.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/r/x/p32381-1495943502592a494e446f1.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/f/m/p32381-1495943545592a4979928fe.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/3/c/l/p32381-1495943574592a499646d08.jpg?tr=tr:n-large",
        },
      ],
      rating: 4,
      time: "8AM to 12PM",
      id: 7,
    },
    {
      name: "Dasaprakash",
      Location: "Central Delhi",
      AvgCost: 800,
      sections: [
        {
          secName: "Pure Veg",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/x/t/p98423-1634644819616eb353a1181.jpg?tr=tr:n-medium",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/j/p20996-145631488756cd9a0796608.jpg?tr=tr:n-medium",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2300,
          sectionId: 8.1,
        },
        {
          secName: "Veg and Non-veg",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/r/p/p98423-1634644812616eb34ce20f6.jpg?tr=tr:n-large",
            },
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/s/m/p98423-1634644826616eb35aac5ba.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.2,
          time: "8AM to 12PM",
          AvgCost: 2500,
          sectionId: 4.2,
        },
        {
          secName: "Icecream Parlour",
          secImg: [
            {
              url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/j/y/p98423-1634644841616eb3691f79e.jpg?tr=tr:n-large",
            },
          ],
          rating: 4.3,
          time: "8AM to 12PM",
          AvgCost: 3000,
          sectionId: 4.3,
        },
      ],
      img: [
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/x/t/p98423-1634644819616eb353a1181.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/a/j/p20996-145631488756cd9a0796608.jpg?tr=tr:n-medium",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/r/p/p98423-1634644812616eb34ce20f6.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/s/m/p98423-1634644826616eb35aac5ba.jpg?tr=tr:n-large",
        },
        {
          url: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/j/y/p98423-1634644841616eb3691f79e.jpg?tr=tr:n-large",
        },
      ],
      rating: 4.2,
      time: "8AM to 12PM",
      id: 8,
    },
  ];
  const restaurantId = useParams();
  const sectionWidth = 3;

  //function to handle when a restaurant section is clicked/selected
  const handleSectionClick = (event, section) => {
    setCurrentSection(section);
    for (let element of document.getElementsByClassName("section-button")) {
      element.style.backgroundColor = "white";
    }
    event.currentTarget.style.backgroundColor = "pink";
    console.log(
      "Section '" +
        currentSection.secName +
        "' selected. Images:" +
        currentSection.secImg.length
    );
  };

  //find the restaurant in the list of available restaurants
  let restaurant = null;

  for (let i = 0; i < restaurants.length; i++) {
    if (restaurants[i].id == restaurantId.id) {
      restaurant = restaurants[i];
    } else {
      // console.log(restaurants[i].id);
    }
  }

  //booking objects per section in the selected restaurant
  // const initialBookings = []
  // for(const section in restaurant.sections)
  // {

  // }
  // const [bookings,setBookings] = useState([])

  const [currentSection, setCurrentSection] = useState(restaurant.sections[0]);

  return restaurant === null ? (
    <Typography variant="h1">
      Restaurant with id {restaurantId.id} not found
    </Typography>
  ) : (
    <div>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {restaurant.name}
      </Typography>

      <Container sx={{ marginTop: "1em" }}>
        <Grid container>
          {restaurant.sections.map((section) => (
            <Grid item xs={sectionWidth}>
              <Item
                className="section-button"
                onClick={(event) => handleSectionClick(event, section)}
                sx={{
                  backgroundColor:
                    section === currentSection ? "pink" : "white",
                }}
                key={section.sectionId}
              >
                {section.secName}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "1em",
          backgroundColor: "#eae6e6",
        }}
      >
        <Paper elevation={0} sx={{ width: "60%", backgroundColor: "#eae6e6" }}>
          <Paper sx={{ borderRadius: "20%" }}>
            <Paper elevation={3} sx={{ width: "100%", height: "100%" }}>
              <Paper sx={{ position: "relative" }}>
                <SimpleImageSlider
                  autoPlay={true}
                  autoPlayDelay={2}
                  width="100%"
                  height={504}
                  // borderRadius="20%"
                  images={currentSection.secImg}
                  showBullets={true}
                  showNavs={true}
                />
                <FavoriteBorderIcon
                  sx={{
                    position: "absolute",
                    top: "0.5em",
                    right: "0.5em",
                    height: "2em",
                    width: "2em",
                    color: "white",
                  }}
                />
              </Paper>

              <Paper
                elevation={0}
                sx={{ textAlign: "left", marginLeft: "1em", marginTop: "1em" }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {currentSection.secName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentSection.AvgCost} for 2|Continental, Asian, Italian
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.Location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {currentSection.time}
                </Typography>
              </Paper>
            </Paper>
          </Paper>

          <Paper sx={{ marginTop: "1em" }}>
            <Paper elavation={3}>
              <Grid container>
                <Grid item xs={2.4}>
                  <Item>Overview</Item>
                </Grid>
                <Grid item xs={2.4}>
                  <Item>Menu</Item>
                </Grid>
                <Grid item xs={2.4}>
                  <Item>About</Item>
                </Grid>
                <Grid item xs={2.4}>
                  <Item>Reviews</Item>
                </Grid>
                <Grid item xs={2.4}>
                  <Item>Help</Item>
                </Grid>
              </Grid>
            </Paper>
          </Paper>

          <Paper sx={{ marginTop: "1em" }}>
            <Paper elavation={3}>
              <Typography variant="h4" fontWeight="bold">Overview</Typography>
              <Typography>{currentSection.Overview}</Typography>
            </Paper>
          </Paper>
          
          <Paper sx={{ marginTop: "1em" }}>
            <Paper elavation={3}>
              <Typography variant="h4" fontWeight="bold">Menu</Typography>
              
              {/* search bar for menu */}
              <Paper
                component="form"
                elevation={4}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: '90%',
                  marginTop: '1em',
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Menu"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <DirectionsIcon />
                </IconButton>
              </Paper>
              
              <Grid container>
                {Array.from(currentSection.Menu).map((menu) => (
                  <Grid item xs={6}>
                    <Item>
                      <Container>
                        <Typography variant="h5" component="div">
                          {menu.categoryName}
                        </Typography>
                        <Grid container>
                          {Array.from(menu.Items).map((item) => (
                            <Grid item xs={4}>
                              <Item>{item.itemName}</Item>
                              <Item>{item.cost}</Item>
                            </Grid>
                          ))}
                        </Grid>
                      </Container>
                    </Item>
                  </Grid>
                ))}
              </Grid>
              
            </Paper>
          </Paper>

          <Reviews />
        </Paper>
        <Booking />
      </Paper>
    </div>
  );
};

export default Restaurant;
