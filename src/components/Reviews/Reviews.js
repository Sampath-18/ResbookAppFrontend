import {
  Avatar,
  Button,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Progressbar from './ProgressBar';
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const reviews = [
    {
      user: "Sampath",
      photo: "",
      rating: "1",
      review: "Very bad food. Try to avoid the restaurant, but the app is good",
      dateTime: "2 August 2022",
    },
    {
      user: "Sai Teja",
      photo: "",
      rating: "4",
      review: "Very good food. Atleast visit once and the app is good",
      dateTime: "21 July 2022",
    },
    {
      user: "Srinivas",
      photo: "",
      rating: "5",
      review:
        "Good customer service, food would have been better and the app is good",
      dateTime: "15 November 2022",
    },
  ];
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{marginTop:'1em  '}}>
      <Typography variant="h4" fontWeight="bold" marginLeft="1em">Ratings & Reviews({reviews.length})</Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "1em",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Paper sx={{ display: "flex", flexDirection: "column", justifyContent:'space-between', alignItems:'center' }} elevation={0}>
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: "green", width:"100%" }}
          >
            <span style={{ fontSize: "150%" }}>3.8</span>
            <span> /5</span>
          </Button>
          <Typography variant="body1" marginTop='1em'>
            289 Reviews
          </Typography>
          <Typography variant="body1" marginTop='1em'>
            1492 Ratings
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
        <div  style={{
            display: "flex",
            flexDirection: "row",alignItems:'center'}}>
        <Typography fontSize='125%' >5</Typography>
        <StarBorderIcon/>
      <Progressbar bgcolor="orange" progress='30'  height={5} />
        </div>
       
        <div  style={{
            display: "flex",
            flexDirection: "row",alignItems:'center'}}>
        <Typography fontSize='125%'>4</Typography>
        <StarBorderIcon/>
        <Progressbar bgcolor="#99ff66" progress='50'  height={5} />
        </div>
        <div  style={{
            display: "flex",
            flexDirection: "row",alignItems:'center'}}>
        <Typography fontSize='125%'>3</Typography>
        <StarBorderIcon/>
        <Progressbar bgcolor="#ff00ff" progress='85'  height={5} />
        </div>
        <div  style={{
            display: "flex",
            flexDirection: "row",alignItems:'center'}}>
        <Typography fontSize='125%'>2</Typography>
        <StarBorderIcon/>
        <Progressbar bgcolor="#99ccff" progress='95'  height={5} />
        </div>
        <div  style={{
            display: "flex",
            flexDirection: "row",alignItems:'center'}}>
        <Typography fontSize='125%'>1</Typography>
        <StarBorderIcon/>
        <Progressbar bgcolor="red" progress='60'  height={5} />
        </div>
          {/* <div style={{ display: "flex", flexDirection: "row" alignItems:'center'}}>
            <span>5</span>
            <LinearProgress variant="determinate" value={45} color="success" />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span>4</span>
            <LinearProgress variant="determinate" value={30} color="primary" />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span>3</span>
            <LinearProgress variant="determinate" value={5} color="secondary" />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span>2</span>
            <LinearProgress variant="determinate" value={15} color="warning" />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span>1</span>
            <LinearProgress variant="determinate" value={5} color="error" />
          </div> */}
        </Paper>

        <Paper elevation={0}>
          <Button variant="contained" sx={{backgroundColor:"white", color:"ButtonText" }} onClick={() => navigate('/ReviewIntake')}>Rate your experience</Button>
        </Paper>
      </Paper>

      {reviews.map((review, i) => (
        <Paper
          marginTop="3em"
          sx={{ display: "flex", flexDirection: "row", alignItems: "center",  }}
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
            <Typography variant="h6" fontWeight="bold" sx={{marginTop: "0.5em",}}>
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
                Posted on {review.dateTime}
              </span>
            </Typography>
            <Typography variant="body2">{review.review}</Typography>
          </Paper>
        </Paper>
      ))}
    </Paper>
  );
};

export default Reviews;
