import { Button, Paper, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewIntake = (props) => {
  const [review, setReview] = useState({ rating: 0, restaurantRating: 0, review: "" });

  // const location = useLocation()

  // const navigate = useNavigate()

  const addReviewToDB = async() => {
    try {
      const userId = props.userId
      const sectionId = props.sectionId 
      const restaurantId = props.restaurantId
      console.log(review);
      let reviewResponse = await fetch(`${process.env.REACT_APP_NODEJS_BACKEND_API_ENDPOINT}/addReview`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({...review,userId:userId,sectionId:sectionId})
      })
      reviewResponse = await reviewResponse.json()
      console.log(reviewResponse);
      if(reviewResponse.success)
      {
        props.setSelectedBackdropComponent(null)
        // navigate("/Restaurants/"+restaurantId)
        // alert("review recorded!!!")
        console.log(reviewResponse.review)
      }
      else
      {
        alert("Enter all the details correctly!")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Paper elevation={0} sx={{padding:"1em"}}>
      <Typography variant="h4" sx={{}}>
        Rate you experience
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1em",
        }}
        elevation={0}
      >
        <Typography variant="body1" fontWeight='bold'>Rate restaurant(out of 5):</Typography>
        <Rating
          name="size-large"
          value={review.restaurantRating}
          onChange={(_, newValue) => {
            setReview({ ...review, restaurantRating: newValue });
          }}
        />
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1em",
        }}
        elevation={0}
      >
        <Typography variant="body1" fontWeight='bold'>Rate section(out of 5):</Typography>
        <Rating
          name="size-large"
          value={review.rating}
          onChange={(event, newValue) => {
            setReview({ ...review, rating: newValue });
          }}
        />
      </Paper>
      <TextField
        multiline
        minRows={4}
        variant="outlined"
        label="Let your experience help others"
        value={review.review}
        onChange={(event, newValue) => {
          setReview({ ...review, review: event.target.value });
        }}
        sx={{ width: "75%",
          marginTop: "1em", }}
      />
      <Button variant="contained" onClick={addReviewToDB}>
        Submit
      </Button>
    </Paper>
  );
};

export default ReviewIntake;
