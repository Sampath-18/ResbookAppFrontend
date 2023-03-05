import { Paper, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const ReviewIntake = () => {
  const [review, setReview] = useState({ rating: 0, review: "" });
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
        <Typography variant="body1" fontWeight='bold'>Rate(out of 5):</Typography>
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
          setReview({ ...review, review: newValue });
        }}
        sx={{ width: "75%",
          marginTop: "1em", }}
      />
    </Paper>
  );
};

export default ReviewIntake;
