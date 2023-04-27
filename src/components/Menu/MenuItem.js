import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function MenuItem() {

  return (

    <Card sx={{ display: "flex", width: "30%" }}>
      <Container sx={{ position: "relative" }}>
        <img
          style={{ width: 150, height:150 , borderRadius: "50%" }}
          src="https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg"
          alt="Live from space album cover"
        />
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 5,
            right: 0,
            width:50,
            height:50,
            borderRadius:"50%"
          }}
        >
          <AddIcon fontSize="large" />
        </Button>
      </Container>
      <Container>
        Chicken Biryani
      </Container>

      {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Chicken Biryani
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            150/-
          </Typography>
        </CardContent>
      </Box> */}
    </Card>

    
  );
}
