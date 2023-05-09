import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Backdrop from "@mui/material/Backdrop";
// import Button from '@mui/material/Button';
import { alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuItemDetailed from "./MenuItemDetailed";
import AddMenuItem from "./AddMenuItem";
import AddMenuCategory from "./AddMenuCategory";
// const navigate = useNavigate();
const ImageBoxWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const RoundedAvatar = styled(Avatar)({
  borderRadius: "50%",
  height: "80px",
  width: "80px",
});

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
const SectionMenu = (props) => {
  const [backdropComponent, setBackdropComponent] = React.useState(null);
  const [menu, setMenu] = useState(null);
  const [edit,setEdit] = useState(null);
  const handleClose = () => {
    setBackdropComponent(null);
  };

  useEffect(() => {
    async function fetchMenu(sectionId) {
      try {
        let menuResponse = await fetch(
          "http://localhost:8080/" + sectionId + "/getWholeSectionMenu/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        menuResponse = await menuResponse.json();
        if (menuResponse.success) {
          setMenu(menuResponse.menu);
          console.log("Menu fetched successfully");
        } else {
          console.log("Fetch Menu Failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMenu(props.sectionId);
  }, [props, backdropComponent]);

  const handleMenuItemClick = (item) => {
    setBackdropComponent(
      <MenuItemDetailed
        item={item}
        setBackdropComponent={setBackdropComponent}
      />
    );
  };

  const handleAddItemClick = (menuCategoryId) => {
    // console.log("called add item");
    setBackdropComponent(
      <AddMenuItem
        menuCategoryId={menuCategoryId}
        setBackdropComponent={setBackdropComponent}
      />
    );
  };

  const handleRemoveMenuCategoryClick = async (menuCategoryId) => {
    try {
      let deleteResponse = await fetch(
        "http://localhost:8080/deleteMenuCategory/" + menuCategoryId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      deleteResponse = await deleteResponse.json();
      if (deleteResponse.success) {
        console.log("Successfully deleted menu category");
      } else {
        console.log(
          "Menu categorydeletion failed with message:" + deleteResponse.message
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryNameChange = async (menuCategoryId,categoryName) => {
    try {
      setEdit(false);
      // console.log(eitem);
      let itemResponse = await fetch(
        "http://localhost:8080/updateMenuCategory/" + menuCategoryId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({categoryName:categoryName}),
        }
      );
      itemResponse = await itemResponse.json();
      if (itemResponse.success) {
        console.log("Updated Menu Category Successfully");
      } else {
        console.log(itemResponse.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setEitem(null);
    }
  }

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
            marginBottom: "1em",
            width: "100%",
            backgroundColor: "#fff",
            minHeight: "53vh",
            borderRadius: "1em",
            justifyContent: "flex-start",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "pink",
              color: "black",
              marginTop: "1em",
              marginRight: "0",
            }}
            onClick={() => {
              setBackdropComponent(
                <AddMenuCategory
                  sectionId={[props.sectionId]}
                  setBackdropComponent={setBackdropComponent}
                />
              );
            }}
          >
            Add Menu Category
          </Button>
          {menu
            ? menu.map((menuCategory, categoryIndex) => (
                <Container key={categoryIndex}>
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography textAlign="left" fontWeight='bold' variant="h5" padding="1em">
                      {menuCategory.categoryName}
                      {/* <IconButton
                        sx={{ marginLeft: "1em" }}
                        onClick={() => setEdit(true)}
                      >
                        <EditIcon fontSize="large"></EditIcon>
                      </IconButton> */}
                    </Typography>
                    {/* <TextField name="" value={menuCategory.categoryName} onChange={() => } /> */}
                    <Paper elevation={0} sx={{ p: 0 }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={() => handleAddItemClick(menuCategory._id)}
                      >
                        Add Item
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginLeft: "1em",
                        }}
                        onClick={() =>
                          handleRemoveMenuCategoryClick(menuCategory._id)
                        }
                      >
                        Remove Menu Category
                      </Button>
                    </Paper>
                  </Paper>

                  {menuCategory.Items.length === 0 ? (
                    <Typography sx={{ marginTop: "1em" }}>
                      No Items in {menuCategory.categoryName}. Quickly Add!!
                    </Typography>
                  ) : (
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableBody>
                          <TableRow
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              gap: "16px",
                            }}
                            hover
                          >
                            {menuCategory.Items.map((item, itemIndex) => (
                              <TableCell style={{}} key={itemIndex}>
                                <Paper
                                  elavation={4}
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    "& > :not(style)": {
                                      m: 1,
                                      width: 200,
                                      height: 128,
                                    },
                                    "&:hover": {
                                      cursor: "pointer",
                                    },
                                  }}
                                  onClick={() => handleMenuItemClick(item)}
                                >
                                  <ImageBoxWrapper>
                                    <RoundedAvatar
                                      src="https://www.licious.in/blog/wp-content/uploads/2022/06/mutton-hyderabadi-biryani-01-750x750.jpg"
                                      alt="Your Image"
                                    />

                                    <Button
                                      variant="contained"
                                      style={{
                                        backgroundColor: "green",
                                        width: "auto",
                                        marginLeft: "1em",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100px",
                                      }}
                                    >
                                      <Typography
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {item.itemName}
                                      </Typography>
                                    </Button>
                                  </ImageBoxWrapper>
                                </Paper>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Container>
              ))
            : null}
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropComponent ? true : false}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                p: 2,
                color: "black",
                position: "relative",
                // height: "60vh",
                width: "80vw",
                borderRadius: "1em",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              {backdropComponent ? backdropComponent : null}
              <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Backdrop>
        </Box>
      </Container>
    </div>
  );
};

export default SectionMenu;
