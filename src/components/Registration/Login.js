import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import {
  Button,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Typography,
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

  const [isRestaurantLogin, setIsRestaurantLogin] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [forgotDetails, setForgotDetails] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const setNewPassword = async () => {
    try {
      // console.log("new password called");
      // console.log(forgotDetails)
      if (isRestaurantLogin) {
        const response = await fetch(
          "http://localhost:8080/setRestaurantPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(forgotDetails),
          }
        );
        const responseJson = await response.json();
        // console.log("Login status:", responseJson);
        // console.log("json", responseJson);
        if (!responseJson.success) {
          alert("Failed to set New password for restaurant");
        } else {
          alert("New password fpr restaurant set successfully");
          // login(responseJson.user);
          // console.log("Logged in successfully!!!");
          // navigate("/");
        }
        setIsForgotPassword(false);
      } else {
        const response = await fetch("http://localhost:8080/setUserPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forgotDetails),
        });
        const responseJson = await response.json();
        // console.log("Login status:", responseJson);
        // console.log("json", responseJson);
        if (!responseJson.success) {
          alert("Failed to set New password for user");
        } else {
          alert("New password for user set successfully");
          // login(responseJson.user);
          // console.log("Logged in successfully!!!");
          // navigate("/");
        }
        setIsForgotPassword(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { user, login, logout } = useContext(UserContext);

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const handleDetailChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleForgotDetailChange = (event) => {
    setForgotDetails({
      ...forgotDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const responseJson = await response.json();
      console.log("Login status:", responseJson);
      console.log("json", responseJson);
      if (!responseJson.success) {
        alert("Enter Valid credentials");
      } else {
        // alert("Logged in successfully!!!");
        login(responseJson.user);
        console.log("Logged in successfully!!!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestaurantLogin = async (event) => {
    try {
      console.log("Restaurant login tried!");
      event.preventDefault()
      const response = await fetch("http://localhost:8080/restaurantLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const responseJson = await response.json();
      // console.log("Login status:", responseJson);
      // console.log("json", responseJson);
      if (!responseJson.success) {
        alert("Enter Valid Restaurant credentials");
      } else {
        alert("Logged in successfully!!!");
        // login(responseJson.user);
        // console.log("Logged in successfully!!!");
        // navigate("/");
        navigate("/RestaurantAdminView/"+responseJson.restaurantId)
      }
    } catch (error) {
      console.error(error);
    }
  };

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

          {isForgotPassword ? (
            <Grid item xs={6}>
              <Grid align="center">
                <h2 style={headerStyle}>
                  Forgot {isRestaurantLogin ? "Restaurant" : "User"} Credentials
                </h2>

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
                    value={forgotDetails.email}
                    onChange={(event) => handleForgotDetailChange(event)}
                  ></TextField>

                  <TextField
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter New Password"
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
                    value={forgotDetails.password}
                    onChange={(event) => handleForgotDetailChange(event)}
                  ></TextField>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Confirm New Password"
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
                    value={forgotDetails.cpassword}
                    onChange={(event) => handleForgotDetailChange(event)}
                  ></TextField>
                </form>
              </Grid>

              <Button
                sx={{ backgroundColor: "pink", color: "green" }}
                onClick={() => setNewPassword()}
              >
                Submit
              </Button>
              <Button
                sx={{ backgroundColor: "pink", color: "green" }}
                onClick={() => setIsForgotPassword(!isForgotPassword)}
              >
                Back
              </Button>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <Grid align="center">
                <h2 style={headerStyle}>
                  To continue,Please Login into Resbook
                </h2>
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
                    onClick={() => setIsForgotPassword(!isForgotPassword)}
                  >
                    forgot Password?
                  </Button>
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
                    onClick={(event) => {
                      isRestaurantLogin
                        ? handleRestaurantLogin(event)
                        : handleUserLogin(event);
                    }}
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

                  <FormControlLabel
                    control={
                      <Switch
                        checked={isRestaurantLogin}
                        onChange={() => {
                          setIsRestaurantLogin(!isRestaurantLogin);
                        }}
                      />
                    }
                    label="Restaurant Login?"
                  />
                </form>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default Login;
