import { Container, Typography, Button, Paper, TableContainer, Table, TableBody, TableRow, TableCell, styled, Backdrop, Grid, } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItemExpanded from "../Menu/MenuItemExpanded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import EditIcon from "@mui/icons-material/Edit";

const MyFavourite = (props) => {
  const ImageBoxWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  const RoundedAvatar = styled(Avatar)({
    borderRadius: "50%",
    height: "80px",
    width: "80px",
  });
  const [selectedBackdropComponent, setSelectedBackdropComponent] =
    React.useState(null);

  const [favItems, setFavItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchMenuItems(itemIds) {
      let favitems = [];
      try {
        for (let i = 0; i < itemIds.length; i++) {
          let itemResponse = await fetch(
            "http://localhost:8080/getMenuItem/" + itemIds[i],
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          itemResponse = await itemResponse.json();
          if (itemResponse.success) {
            favitems.push(itemResponse.menuItem);
          } else {
            console.log("Item with id:" + itemIds[i] + "not found in DB");
          }
        }
        setFavItems(favitems);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMenuItems(props.userLikings.favMenuItems);
  }, [props]);

  const onSaveClick = async () => {
    let justCuisines = editCuisines.filter((cuisine) => cuisine[1]);
    justCuisines = { justCuisines: justCuisines.map((cuisine) => cuisine[0]) };
    let response = await fetch(
      "http://localhost:8080/addUserFavorites/" + props.userLikings.userId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...justCuisines }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("added favorite cuisines successfully");
      props.updateProps(response.userlikings);
      setEdit(false);
    } else {
      alert("adding favorite cuisines failed");
    }
  };

  const onMinusClick = async (itemId) => {
    try {
      // const operation = isFavoriteSection ? "$pull" : "$addToSet";
      let response = await fetch(
        "http://localhost:8080/updateUserLikings/" + props.userLikings.userId,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            operation: "$pull",
            favType: "favMenuItems",
            id: itemId,
          }),
        }
      );
      response = await response.json();
      if (response.success) {
        alert("removed item from favorites successfully");
      } else {
        alert("failed to remove item!!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [edit, setEdit] = React.useState(false);

  const [editCuisines, setEditCuisines] = React.useState([
    ["Italian", false],
    ["North-Indian", false],
    ["Chinese", false],
    ["Japanese", false],
    ["South-Indian", false],
    ["Spanish", false],
    ["European", false],
    ["American", false],
    ["Andhra", false],
    ["Hyderabadi", false],
    ["Gujarathi", false],
    ["Bengali", false],
  ]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const onEditClick = () => {
    let availableCuisines = JSON.parse(JSON.stringify(editCuisines));
    availableCuisines = availableCuisines.map((cuisine) => [
      cuisine[0],
      props.userLikings.favCuisines.includes(cuisine[0]),
    ]);
    setEditCuisines(availableCuisines);
    setEdit(true);
  };

  return (
    <Container sx={{marginTop:props.mt ? props.mt :0}}>
      <Box
        sx={{
          width: "100%",
          height: 80,
          backgroundColor: "primary.dark",
          // marginTop: "1.1em",
          borderRadius: "1em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="white" marginLeft="1em">
          My Favourites
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          // height: 200,
          backgroundColor: "white",
          borderRadius: "1em",
          marginTop: "1em",
          
        }}
      >
        <Paper
          elevation={0}
          sx={{ display: "flex", justifyContent: "space-between",alignItems:'center' }}
        >
          <Typography
            textAlign="left"
            fontWeight="bold"
            variant="h5"
            padding="1em"
          >
            My Cuisines
          </Typography>
          {edit ? (
            <div sx={{ display: "flex" }}>
              <Button
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  marginRight: "1em",
                  "&:hover": {
                    backgroundColor: "#8c3273",
                    color: "white",
                  },
                }}
                onClick={() => onSaveClick()}
              >
                Save
              </Button>
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  marginRight: "2em",
                  "&:hover": {
                    backgroundColor: "#8c3273",
                    color: "white",
                  },
                }}
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <IconButton
              onClick={() => onEditClick()}
              sx={{ marginRight: "2em" }}
            >
              <EditIcon fontSize="large" />
            </IconButton>
          )}
        </Paper>

        {edit ? (
          editCuisines.length===0 ?
          <Typography sx={{ marginTop: "1em" }}>
            No Cuisines in your favorites. Quickly add by clicking on edit symbol
          </Typography>
          :
          <Grid
            sx={{ marginTop: "1em" }}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {editCuisines.map((cuisine, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                {cuisine[1] ? (
                  <Item
                    sx={{ backgroundColor: "#8a888a" }}
                    onClick={() => {
                      setEditCuisines(
                        editCuisines.map((cuisine, idx) =>
                          idx === index ? [cuisine[0], !cuisine[1]] : cuisine
                        )
                      );
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Typography sx={{ color: "black" }}>
                        {cuisine[0]}
                      </Typography>
                      <DoneRoundedIcon />
                    </div>
                  </Item>
                ) : (
                  <Item
                    onClick={() => {
                      setEditCuisines(
                        editCuisines.map((cuisine, idx) =>
                          idx === index ? [cuisine[0], !cuisine[1]] : cuisine
                        )
                      );
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      {cuisine[0]}
                    </Typography>
                  </Item>
                )}
              </Grid>
            ))}
          </Grid>
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
                  {props.userLikings.favCuisines.map((cuisine, index) => (
                    <TableCell key={index} style={{}}>
                      <Button
                        elavation={4}
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          "&:hover": { backgroundColor: "#d4d5d6" },
                        }}
                      >
                        <Typography>{cuisine}</Typography>
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 270,
          backgroundColor: "white",
          borderRadius: "1em",
          marginTop: "1em",
        }}
      >
        <Typography
          textAlign="left"
          fontWeight="bold"
          variant="h5"
          padding="1em"
        >
          My Food Items
        </Typography>
        {favItems.length === 0 ? (
          <Typography sx={{ marginTop: "1em" }}>
            No Items in your favorites
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
                  {favItems.map((item, itemIndex) => (
                    <TableCell style={{ position: "relative" }} key={itemIndex}>
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
                        onClick={() =>
                          setSelectedBackdropComponent(
                            <MenuItemExpanded item={item} />
                          )
                        }
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
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {/* {item.itemName} */}
                              {item.itemName}
                            </Typography>
                          </Button>
                        </ImageBoxWrapper>
                      </Paper>
                      <Button
                        variant="contained"
                        sx={{
                          position: "absolute",
                          bottom: 5,
                          right: 0,
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: "#6e7073",
                          "&:hover": {
                            backgroundColor: "#0c0d0f",
                          },
                        }}
                        onClick={() => onMinusClick(item._id)}
                      >
                        <RemoveCircleOutlineIcon />
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* <TableContainer sx={{ maxHeight: 440 }}>
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
                <TableCell style={{}}>
                  <Paper
                    elavation={4}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      position: "relative",
                      "& > :not(style)": {
                        m: 1,
                        width: 200,
                        height: 128,
                      },
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ImageBoxWrapper
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <IconButton
                        sx={{ position: "absolute", top: 2, right: 3 }}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
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
                        <Typography style={{ textTransform: "capitalize" }}>
                          item.itemName
                        </Typography>
                      </Button>
                    </ImageBoxWrapper>
                  </Paper>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={selectedBackdropComponent ? true : false}
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
          {selectedBackdropComponent}
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setSelectedBackdropComponent(null)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Backdrop>
    </Container>
  );
};

export default MyFavourite;
