import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Grid,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import LockIcon from "@mui/icons-material/Lock";
import "./login.css";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const paperStyle = { padding: "30px 20px", width: 750, margin: "50px auto" };
  const headerStyle = { margin: 10 };
  const marginStyle = { margin: "30px 0 0 180px " };
  const imgstyle = { margin: "50px 0 0 0" };

  const navigate = useNavigate();

  const { user, login, logout } = useContext(UserContext);

  const [loginDetails, setLoginDetails] = useState({email:"", password:""})

  const handleDetailChange = (event) => {
    setLoginDetails({...loginDetails, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:8080/login",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(loginDetails)
        })
      const responseJson = await response.json();
      console.log("Login status:",responseJson);
      console.log("json", responseJson);
      if(!responseJson.success)
      {
        alert("Enter Valid credentials");
      }
      else
      {
        // alert("Logged in successfully!!!");
        login(responseJson.user);
        console.log("Logged in successfully!!!");
        navigate('/');
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Paper elevation={20} style={paperStyle}>
        <Grid container>
          <Grid item xs={6}>
            <div>here we wil set the logo later</div>
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
              <h2 style={headerStyle}>To continue,Please Login into Resbook</h2>
              {/* <Typography variant="caption">
                please fill the account details
              </Typography> */}

              <form width={500}>
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
                  value={loginDetails.email}
                  onChange={(event) => handleDetailChange(event)}
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
                  value={loginDetails.password}
                  onChange={(event) => handleDetailChange(event)}
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={marginStyle}
                  onClick={(event) => handleSubmit(event)}
                >
                  Login
                </Button>
                <hr></hr>
                <h4 className="lgfont">Don't Have an Account?</h4>

                <Link to="/signup">
                  <Button
                    sx={{
                      borderRadius: "4rem",
                      width: "20rem",
                      height: "3.5rem",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "rgb(67, 110, 24)",
                        color: "white",
                      },
                    }}
                    type="button"
                    variant="contained"
                  >
                    signup for Resbook
                  </Button>
                </Link>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Login;
