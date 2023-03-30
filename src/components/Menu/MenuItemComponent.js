import { Avatar, Badge, Button, Typography } from "@mui/material";
import React from "react";
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const MenuItemComponent = (props) => {
  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Button sx={{borderRadius:"50%", p:"0"}}>
            <AddCircleOutlineOutlinedIcon style={{ fontSize: "300%", color: "black" }} />
          </Button>
        }
      >
        <Avatar
          alt="Biryani"
          src= {props.img}
          sx={{ width: "150px", height: "150px" }}
        />
      </Badge>
      <Typography variant="body1">{props.itemName}</Typography>
    </>
  );
};

export default MenuItemComponent;

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLcjzfW_Wx_jh7swBDD9xC3WD4CqAQqarFA&usqp=CAU"
