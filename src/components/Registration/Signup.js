import React, { useState } from "react";
import "./signup.css";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const paperStyle = { padding: "30px 20px", width: 750, margin: "40px auto" };
  const headerStyle = { margin: 10 };
  const marginStyle = { margin: "30px 0 0 180px " };
  const imgstyle = { margin: "80px 0 0 0" };
  // const classes = useStyles();

  const [user, setUser] = useState({fname:"", lname:"", email:"", password:"", cpassword:""});

  const onDetailChange = (event) => {
    // console.log({[event.target.name]:event.target.value});
    setUser({...user, [event.target.name]:event.target.value});
  }

  const navigate = useNavigate()
  const onSignUpClick = async (event) => {
    event.preventDefault();
    if(user.cpassword === user.password)
    {
      // console.log("passwords matched", JSON.stringify(user));
      const response = await fetch("http://localhost:8080/signup",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
      })
      response.json()
      .then(data => {
        console.log("response from backend after signup request:", data);
        if(!data.success)
        {
          alert("Enter Valid credentials");
        }
        else
        {
          setUser(data.user)
          navigate("/FavCuisineSelection/"+data.userId)
        }
      })
      .catch(err => {console.error(err)})      
    }
    else
    {
      console.log("passwords didn't match.");
    }
  }

  return (
    <>
      <Paper elevation={20} style={paperStyle}>
        <Grid container>
          <Grid item xs={6}>
            <div>here we will set the logo</div>
            <img
              className="img1"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt="error"
              height={350}
              width={350}
              style={imgstyle}
            ></img>
          </Grid>

          <Grid item xs={6}>
            <Grid align="center">
              <h2 style={headerStyle}>Welcome to Resbook</h2>
              <Typography variant="caption">
                please fill the account details
              </Typography>

              <form width={500}>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your Name"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="fname"
                  value={user.fname}
                  onChange={(event) => onDetailChange(event)}
                ></TextField>
                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your Last Name"
                  name="lname"
                  value={user.lname}
                  onChange={(event) => onDetailChange(event)}
                ></TextField>
                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="enter your email"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="email"
                  value={user.email}
                  onChange={(event) => onDetailChange(event)}
                ></TextField>

                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Your Password"
                  margin="normal"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  value={user.password}
                  onChange={(event) => onDetailChange(event)}
                ></TextField>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Re-enter Your Password"
                  margin="normal"
                  color="secondary"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  name="cpassword"
                  value={user.cpassword}
                  onChange={(event) => onDetailChange(event)}
                ></TextField>
                <Button
                  sx={{
                    borderRadius: "4rem",
                    width: "10rem",
                    height: "3.5rem",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "rgb(67, 110, 24)",
                      color: "white",
                    },
                  }}
                  // className={classes.btn1}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={marginStyle}
                  onClick={(event) => onSignUpClick(event)}
                >
                  Signup
                </Button>
              </form>
            </Grid>

            <h5 className="lgfont">
              Have an Account?
              <a href="/Login">
                <span className="span">Login</span>
              </a>
            </h5>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Signup;
