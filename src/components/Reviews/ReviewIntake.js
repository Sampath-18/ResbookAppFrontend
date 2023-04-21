import { Button, Paper, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewIntake = () => {
  const [review, setReview] = useState({ rating: 0, restaurantRating: 0, review: "" });

  const location = useLocation()

  const navigate = useNavigate()

  const addReviewToDB = async() => {
    try {
      const userId = location.state.userId
      const sectionId = location.state.sectionId 
      const restaurantId = location.state.restaurantId
      let reviewResponse = await fetch("http://localhost:8080/addReview",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({...review,userId:userId,sectionId:sectionId})
      })
      reviewResponse = await reviewResponse.json()
      if(reviewResponse.success)
      {
        navigate("/Restaurants/"+restaurantId)
        // alert("review recorded!!!")
        console.log(reviewResponse.review)
      }
      else
      {
        // alert("review recording failed!!")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Paper elevation={3} sx={{padding:"1em"}}>
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
