import React, { useState } from "react";
import {
  Toolbar,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from '@mui/material/Button';
import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";

import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItemDetailed from "./MenuItemDetailed";
// const navigate = useNavigate();

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const SectionMenu = () => {
  const [backdrop, setBackdrop] = React.useState(<div>hello</div>);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",

          marginTop: "1em",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "green", width: "150px" }}
        >
          <Typography>Veg</Typography>
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "green", width: "150px" }}
        >
          <Typography>Non-Veg</Typography>
        </Button>
        <Search sx={{ borderColor: "blue", border: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
      <Container>
        <Box
          sx={{
            marginTop: "1em",
            width: "100%",
            backgroundColor: "#fff",
            minHeight: "53vh",
            borderRadius: "1em",
            justifyContent: "flex-start",
          }}
        >
          <Typography textAlign="left" variant="h4" padding="1em">
            Starters
          </Typography>
          {/* <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "50px",
              marginTop: "2em",
            }}
          > */}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                <TableRow hover>
                  {[
                    "Item1",
                    "Item2",
                    "Item3",
                    "Item4",
                    "Item5",
                    "Item6",
                    "Item7",
                    "Item8",
                    "Item9",
                  ].map((item, index) => (
                    <TableCell key={index}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "green", width: "150px" }}
                      >
                        <Typography>{item}</Typography>
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Stack> */}
          <Typography textAlign="left" variant="h4" padding="1em">
            Biryani
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "50px",
              marginTop: "3em",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>Item1</Typography>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>Item2</Typography>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>Item3</Typography>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", width: "150px" }}
            >
              <Typography>Item4</Typography>
            </Button>
          </Stack>
          <div>
            <Button onClick={handleOpen}>Show backdrop</Button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  p: 2,
                  color: "black",
                  position: "relative",
                  height: "60vh",
                  width: "80vw",
                  borderRadius: "1em",
                }}
              >
                <MenuItemDetailed />
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
                {/* <h2>This is a custom box!</h2>
                <p>You can add any content here.</p> */}
              </Box>
            </Backdrop>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default SectionMenu;
