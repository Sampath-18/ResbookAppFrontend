import { Avatar, Button, Paper, Rating, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Progressbar from "./ProgressBar";
import React, { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Reviews = (props) => {
  // const reviews = [
  //   {
  //     user: "Sampath",
  //     photo: "",
  //     rating: 1,
  //     review: "Very bad food. Try to avoid the restaurant, but the app is good",
  //     dateTime: "2 August 2022",
  //   },
  //   {
  //     user: "Sai Teja",
  //     photo: "",
  //     rating: 4,
  //     review: "Very good food. Atleast visit once and the app is good",
  //     dateTime: "21 July 2022",
  //   },
  //   {
  //     user: "Srinivas",
  //     photo: "",
  //     rating: 5,
  //     review:
  //       "Good customer service, food would have been better and the app is good",
  //     dateTime: "15 November 2022",
  //   },
  // ];
  const navigate = useNavigate();

  const rateYourExperience = () => {
    if(user===null)
    {
      alert("Login to give review!!!")
      return
    }
    navigate("/ReviewIntake",{state:{userId:user._id, sectionId:props.sectionId, restaurantId:props.restaurantId}})
  }
  const [reviews, setReviews] = useState([]);
  // console.log("props",props);

  const { user, login, logout } = useContext(UserContext);
  // console.log("reviews",reviews)
  const onAdd3ReviewsClick = async () => {
    // console.log("props",props);
    try {
      const last = Math.min(props.reviews.length,3+reviews.length)
      let newReviews = []
      for (let i = reviews.length; i < last; i++) {
        let reviewResponse = await fetch("http://localhost:8080/getReview/"+(props.reviews)[i], {
          method:"GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        reviewResponse = await reviewResponse.json()
        if(reviewResponse.success)
        {
          // console.log("review",reviewResponse.review._id,"found");
          newReviews.push(reviewResponse.review)
        }
      }
      // console.log("new reviews",newReviews);
      setReviews([...reviews, ...newReviews])
    } catch (error) {
      console.error(error)
    }
    // console.log(reviews)
  };

  

  useEffect(() => {
    const fetchReviews = async() => {
      // console.log("props",props);
      console.log("fetch reviews called")
      try {
        const last = Math.min(props.reviews.length,3+reviews.length)
        let newReviews = []
        for (let i = 0; i < last; i++) {
          let reviewResponse = await fetch("http://localhost:8080/getReview/"+(props.reviews)[i], {
            method:"GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
          reviewResponse = await reviewResponse.json()
          if(reviewResponse.success)
          {
            // console.log("review",reviewResponse.review._id,"found");
            newReviews.push(reviewResponse.review)
          }
        }
        // return newReviews
        setReviews(newReviews)
      } catch (error) {
        console.error(error)
        return null
      }
    }
    fetchReviews()
  }, [props]);

  return (
    <Paper elevation={3} sx={{ marginTop: "1em  " }}>
      <Typography variant="h4" fontWeight="bold" marginLeft="1em">
        Ratings & Reviews({props.reviews.length})
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "1em",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          elevation={0}
        >
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: "green", width: "100%" }}
          >
            <span style={{ fontSize: "150%" }}>{props.sectionRating.toFixed(1)}</span>
            <span> /5</span>
          </Button>
          <Typography variant="body1" marginTop="1em">
            {props.reviews ? props.reviews.length :0} Reviews
          </Typography>
          <Typography variant="body1" marginTop="1em">
            {props.ratings && props.reviews ? (props.ratings.length + props.reviews.length) :0} Ratings
          </Typography>
        </Paper>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "space-evenly",
          }}
          elevation={0}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography fontSize="125%">5</Typography>
            <StarBorderIcon />
            <Progressbar bgcolor="orange" progress="30" height={5} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography fontSize="125%">4</Typography>
            <StarBorderIcon />
            <Progressbar bgcolor="#99ff66" progress="50" height={5} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography fontSize="125%">3</Typography>
            <StarBorderIcon />
            <Progressbar bgcolor="#ff00ff" progress="85" height={5} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography fontSize="125%">2</Typography>
            <StarBorderIcon />
            <Progressbar bgcolor="#99ccff" progress="95" height={5} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography fontSize="125%">1</Typography>
            <StarBorderIcon />
            <Progressbar bgcolor="red" progress="60" height={5} />
          </div>
        </Paper>

        <Paper elevation={0}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#054854", color: "white" }}
            onClick={() => rateYourExperience()}
          >
            Rate your experience
          </Button>
        </Paper>
      </Paper>

      {
        reviews
        ?
        reviews.map((review, i) => (
          <Paper
            marginTop="3em"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <div style={{ marginLeft: "2em", marginTop: "-1em" }}>
              <Avatar sx={{}}>
                <PersonIcon />
              </Avatar>
            </div>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "2em",
                textAlign: "left",
              }}
              key={i}
              elevation={0}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginTop: "0.5em" }}
              >
                {review.user}
              </Typography>
              <Typography variant="body1">
                <span>
                  <Rating name="simple-controlled" value={review.rating} />
                </span>
                <span
                  style={{
                    color: "#4f4f4f",
                    fontSize: "85%",
                    alignSelf: "center",
                  }}
                >
                  Posted on {review.date}
                </span>
              </Typography>
              <Typography variant="body2">{review.review}</Typography>
            </Paper>
          </Paper>
        ))
        :
        <></>
      }
      <Button variant="contained" sx={{margin:"1em"}} onClick={onAdd3ReviewsClick}>Show more</Button>
    </Paper>
  );
};

export default Reviews;
