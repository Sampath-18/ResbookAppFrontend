import React, { useContext, useEffect } from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Backdrop,
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DineinBooking from "../Booking/DineinBooking";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import "dayjs/locale/en"; // import the English locale for month names

// import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import DirectionsIcon from "@mui/icons-material/Directions";
import Reviews from "../Reviews/Reviews";
import { UserContext } from "../contexts/UserContext";
import MenuItemExpanded from "../Menu/MenuItemExpanded";
// import MenuItemComponent from "../Menu/MenuItemComponent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

const Restaurant = () => {
  const { id } = useParams();

  const { user, login, logout } = useContext(UserContext);

  const [restaurantFE, setRestaurantFE] = useState(null);
  const [allBookings, setAllBookings] = useState([]);

  // const handleClose = () => {
  //   setBackdropComponent(null);
  // };

  const ImageBoxWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
  });

  const RoundedAvatar = styled(Avatar)({
    borderRadius: "50%",
    height: "80px",
    width: "80px",
  });

  // const location = useLocation();
  const [userlikings, setUserlikings] = useState(null); //location.state.userlikings)

  const onAddMenuItemToFavoritesClick = async(itemId) => {
    try {
      // const operation = isFavoriteSection ? "$pull" : "$addToSet";
      let response = await fetch(
        `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateUserLikings/` + user._id,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            operation: "$addToSet",
            favType: "favMenuItems",
            id: itemId,
          }),
        }
      );
      response = await response.json();
      if (response.success) {
        alert('added item to favorites succesfully!')
        setUserlikings(response.userlikings);
        // setIsFavoriteSection(!isFavoriteSection);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchRestaurant = async () => {
      let restaurantStructured = null;
      const rid = id;
      try {
        let restaurant = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getRestaurant/` + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        restaurant = await restaurant.json();
        if (restaurant.success) {
          restaurantStructured = { ...restaurant.restaurant };
          // console.log(restaurant);
          // const restaurantResponse = restaurant.restaurant
          let sections = await fetch(
            `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/` + rid + "/getSections",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          sections = await sections.json();
          if (sections.success) {
            // console.log("sections found");
            const secs = [];
            for (const section of sections.sections) {
              const menu = [];
              for (const menuCategoryId of section.menu) {
                let menuCategory = await fetch(
                  `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getMenuCategory/` + menuCategoryId,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                menuCategory = await menuCategory.json();
                // console.log(menuCategory);
                if (menuCategory.success) {
                  menu.push(menuCategory.menuCategory);
                  // console.log( "category", menuCategory.menuCategory.categoryName, "retrieved successfully..." );
                }
              }
              section.menu = menu;
              // section.booking = {};
              secs.push(section);
            }
            restaurantStructured.sections = secs;
          } else {
            console.log("Sections not fetched/not present......");
          }
          setRestaurantFE(restaurantStructured);
          // console.log(restaurantStructured);
        } else {
          console.log("Restaurant not present");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurant();
  }, []);

  React.useEffect(() => {
    async function fetchUserLikings() {
      // console.log("called");
      if (!user) {
        console.log(
          "Couldn't fetch user likings because user hasn't logged in!!"
        );
        return;
      }
      try {
        let userLikings = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/getUserLikings/` + user._id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        userLikings = await userLikings.json();
        if (userLikings.success) {
          console.log("likings set in restaurant.js");
          setUserlikings(userLikings.userlikings);
        } else {
          console.log(userLikings.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserLikings();
  }, [user]);

  useEffect(() => {
    setCurrentSection(restaurantFE ? restaurantFE.sections[0] : null);
    if (currentSection) {
      // console.log("current section identified");
    }
    if (restaurantFE) {
      const bookings = [];
      for (const section of restaurantFE.sections) {
        bookings.push({
          userId: user ? user._id : null,
          sectionId: section._id,
          reservationTime: Date.now(),
          guests: [],
        });
      }
      setAllBookings(bookings);
      console.log("All bookings:", allBookings);
    }
  }, [restaurantFE]);

  const sectionWidth = 3;

  //function to handle when a restaurant section is clicked/selected
  const handleSectionClick = (event, section) => {
    if (section === currentSection) return;
    setCurrentSection(section);
    for (let element of document.getElementsByClassName("section-button")) {
      element.style.backgroundColor = "white";
    }
    event.currentTarget.style.backgroundColor = "pink";
    console.log(
      "Section '" +
        section.sectionName +
        "' selected. Images:" +
        currentSection.secImg.length
    );
  };

  const [currentSection, setCurrentSection] = useState(
    restaurantFE ? restaurantFE.sections[0] : null
  );

  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    const currSecId = currentSection ? currentSection._id : null;
    // console.log("currsection id:",currSecId,"allbookings:",allBookings)
    if (currSecId) {
      for (const booking of allBookings) {
        //update booking component
        if (booking.sectionId === currSecId) {
          setCurrentBooking(booking);
          console.log("current booking is set", booking);
        }
      }
      if (userlikings) {
        // console.log("called",userlikings.favSections.findIndex(sec => sec===currSecId),userlikings.savedSections.findIndex(sec => sec===currSecId));
        setIsFavoriteSection(
          userlikings.favSections.findIndex((sec) => sec === currSecId) !== -1
        );
        setIsSavedSection(
          userlikings.savedSections.findIndex((sec) => sec === currSecId) !== -1
        );
      }
    }
  }, [currentSection]);

  const onSectionFavoriteClick = async () => {
    if (!user) {
      alert("Login to favorite!!");
      return;
    }
    try {
      const operation = isFavoriteSection ? "$pull" : "$addToSet";
      let response = await fetch(
        `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateUserLikings/` + user._id,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            operation: operation,
            favType: "favSections",
            id: currentSection._id,
          }),
        }
      );
      response = await response.json();
      if (response.success) {
        setUserlikings(response.userlikings);
        setIsFavoriteSection(!isFavoriteSection);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isFavoriteSection, setIsFavoriteSection] = useState(false);

  const onSectionSaveClick = async () => {
    if (!user) {
      alert("Login to save!!");
      return;
    }
    try {
      const operation = isSavedSection ? "$pull" : "$addToSet";
      let response = await fetch(
        `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/updateUserLikings/` + user._id,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            operation: operation,
            favType: "savedSections",
            id: currentSection._id,
          }),
        }
      );
      response = await response.json();
      if (response.success) {
        setUserlikings(response.userlikings);
        setIsSavedSection(!isSavedSection);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isSavedSection, setIsSavedSection] = useState(false);

  const [selectedBackdropComponent, setSelectedBackdropComponent] =
    useState(null);

  useEffect(() => {
    if (currentBooking) {
      const currSecId = currentBooking.sectionId;
      const newAllBookings = [];
      for (const booking of allBookings) {
        if (booking.sectionId === currSecId)
          newAllBookings.push({ ...currentBooking });
        else newAllBookings.push(booking);
      }
      setAllBookings(newAllBookings);
    }
  }, [currentBooking]);

  const handleBookingChanges = (bookingModified) => {
    const sectionId = bookingModified.sectionId;
    const bookings = [];
    for (const booking of allBookings) {
      if (booking.sectionId === sectionId) {
        bookings.push(bookingModified);
      } else {
        bookings.push(booking);
      }
    }
    setAllBookings(bookings);
    // setCurrentBooking(bookingModified)
  };

  const navigate = useNavigate();

  const bookDinein = async (booking) => {
    try {
      if (booking.userId) {
        console.log(currentSection.autoAcceptBookings);
        let bookingResponse = await fetch(
          `${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/bookDineinSection`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...booking,
              status:
                currentSection.autoAcceptBookings === "No"
                  ? "To be Accepted"
                  : "Booked-Open",
            }),
          }
        );
        bookingResponse = await bookingResponse.json();
        console.log(bookingResponse);
        navigate("/BookingSummary", {
          state: {
            booking: bookingResponse.booking,
            restaurantName: bookingResponse.restaurant.name,
            sectionName: bookingResponse.section.sectionName,
            city: bookingResponse.restaurant.location.District,
            justBooked: true,
          },
        });
      } else {
        alert("Login to book a dine-in");
      }
    } catch (error) {
      console.log("booking failed");
    }
  };

  // const [backdropComponent, setBackdropComponent] = React.useState(null);

  return restaurantFE === null ? (
    <Typography variant="h5">Restaurant Loading</Typography>
  ) : (
    // Restaurant with id {id} not found
    <div>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {restaurantFE.name}
      </Typography>

      {currentSection ? (
        <>
          <Container sx={{ marginTop: "1em" }}>
            <Grid container>
              {restaurantFE.sections.map((section, secIndex) => (
                <Grid item xs={sectionWidth}>
                  <Item
                    className="section-button"
                    onClick={(event) => handleSectionClick(event, section)}
                    sx={{
                      backgroundColor:
                        section === currentSection ? "pink" : "white",
                    }}
                    key={secIndex}
                  >
                    {section.sectionName}
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
            <Paper
              elevation={0}
              sx={{ width: "60%", backgroundColor: "#eae6e6" }}
            >
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
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "0.5em",
                        right: "0.5em",
                        p: "0",
                      }}
                      onClick={onSectionFavoriteClick}
                    >
                      {isFavoriteSection ? (
                        <FavoriteOutlinedIcon
                          sx={{
                            height: "2em",
                            width: "2em",
                            color: "white",
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            height: "2em",
                            width: "2em",
                            color: "white",
                          }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "0.5em",
                        right: "0.5em",
                        p: "0",
                      }}
                      onClick={onSectionSaveClick}
                    >
                      {isSavedSection ? (
                        <BookmarkIcon
                          sx={{
                            height: "2em",
                            width: "2em",
                            color: "white",
                          }}
                        />
                      ) : (
                        <BookmarkBorderOutlinedIcon
                          sx={{
                            height: "2em",
                            width: "2em",
                            color: "white",
                          }}
                        />
                      )}
                    </IconButton>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      textAlign: "left",
                      marginLeft: "1em",
                      marginTop: "1em",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {currentSection.sectionName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentSection.avgCost} for 2|
                      {currentSection.cuisines.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {restaurantFE.location.District}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time: {dayjs(currentSection.OpenTime).locale("en").format('h:mm A')} to {dayjs(currentSection.CloseTime).locale("en").format('h:mm A')}
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
                  <Typography variant="h4" fontWeight="bold">
                    Overview
                  </Typography>
                  <Typography>{currentSection.sectionDescription}</Typography>
                </Paper>
              </Paper>

              <Paper sx={{ marginTop: "1em" }}>
                <Paper elavation={3}>
                  <Typography variant="h4" fontWeight="bold">
                    Menu
                  </Typography>

                  {/* search bar for menu */}
                  {/* <Paper
                    component="form"
                    elevation={4}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "90%",
                      marginTop: "1em",
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
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton
                      color="primary"
                      sx={{ p: "10px" }}
                      aria-label="directions"
                    >
                      <DirectionsIcon />
                    </IconButton>
                  </Paper> */}
                  {currentSection.menu
                    ? currentSection.menu.map((menuCategory, categoryIndex) => (
                        <Container key={categoryIndex}>
                          <Paper
                            elevation={0}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              textAlign="left"
                              fontWeight="bold"
                              variant="h5"
                              padding="1em"
                            >
                              {menuCategory.categoryName}
                            </Typography>
                          </Paper>

                          {menuCategory.Items.length === 0 ? (
                            <Typography sx={{ marginTop: "1em" }}>
                              No Items in {menuCategory.categoryName}
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
                                    {menuCategory.Items.map(
                                      (item, itemIndex) => (
                                        <TableCell
                                          style={{ position: "relative" }}
                                          key={itemIndex}
                                        >
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
                                            onClick={()=>onAddMenuItemToFavoritesClick(item._id)}
                                          >
                                            <AddIcon />
                                          </Button>
                                        </TableCell>
                                      )
                                    )}
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </Container>
                      ))
                    : null}
                </Paper>
              </Paper>
              <Reviews
                restaurantId={restaurantFE._id}
                sectionId={currentSection._id}
                sectionRating={currentSection.rating}
                reviews={currentSection.reviews}
                ratings={currentSection.ratings}
                setSelectedBackdropComponent={setSelectedBackdropComponent}
              />
            </Paper>
            {currentBooking ? (
              <DineinBooking
                bookDinein={(booking) => bookDinein(booking)}
                setBooking={setCurrentBooking}
                booking={currentBooking}
                setBookings={(booking) => handleBookingChanges(booking)}
              />
            ) : (
              <></>
            )}
          </Paper>
        </>
      ) : (
        <Typography>Loading sections.......</Typography>
      )}
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
    </div>
  );
};

export default Restaurant;
