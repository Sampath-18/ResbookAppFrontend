import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const genderOptions = ["Male", "Female", "Prefer not to say"];
const martialStatusOptions = ["Single", "Married", "Prefer not to say"];

const ImageBoxWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "1em",
});

const RoundedAvatar = styled(Avatar)({
  borderRadius: "50%",
  height: "150px",
  width: "150px",
});

const UserDetails = (props) => {
  // console.log(props.user);
  const [user, setUser] = useState(null);

  const [editUserDetailsItem, setEditUserDetailsItem] = useState(null);

  const onUserDetailChange = (event) => {
    setEditUserDetailsItem({ ...editUserDetailsItem, [event.target.name]: event.target.value });
  };

  const [editUserLikingsItem, setEditUserLikingsItem] = useState(null);

  const onUserLikingsChange = (event) => {
    setEditUserLikingsItem({ ...editUserLikingsItem, [event.target.name]: event.target.value });
  };

  const onSaveUserClick = async () => {
    try {
      console.log(isNaN(parseInt(editUserDetailsItem["Phone Number1"])));
      if (
        isNaN(parseInt(editUserDetailsItem["Phone Number1"])) &&
        isNaN(parseInt(editUserDetailsItem["Phone Number2"])) &&
        isNaN(parseInt(editUserDetailsItem["Age"]))
      ) {
        alert("Phone numbers and Age must be numeric");
        return;
      }
      if (editUserDetailsItem["Age"] !== "") {
        let age = parseInt(editUserDetailsItem["Age"]);
        if (age < 10 || age > 70) {
          alert("Enter valid age(between 10 and 70");
          return;
        }
      }
      let userObj = {};
      userObj["fname"] = editUserDetailsItem["First Name"];
      userObj["lname"] = editUserDetailsItem["Last Name"];
      userObj["email"] = editUserDetailsItem["Email"];
      if (editUserDetailsItem["Phone Number1"] !== "")
        userObj["phone1"] = editUserDetailsItem["Phone number1"];
      if (editUserDetailsItem["Phone Number2"] !== "")
        userObj["phone2"] = editUserDetailsItem["Phone number2"];
      if (editUserDetailsItem["Age"] !== "") userObj["age"] = parseInt(editUserDetailsItem["Age"]);
      userObj["gender"] = editUserDetailsItem["Gender"];
      userObj["maritalStatus"] = editUserDetailsItem["Marital Status"];
      // console.log(userObj);
      let userResponse = await fetch(
        "http://localhost:8080/updateUser/" + props.user._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObj),
        }
      );
      userResponse = await userResponse.json();
      if (userResponse.success) {
        console.log("Updated User Successfully");
        props.login(userResponse.user); //reloading user in the usercontext object(i.e. everywhere in the app)
        setUser(editUserDetailsItem);
        setEditUserDetailsItem(null);
      } else {
        console.log(userResponse.message);
      }

      let userLikingsResponse = await fetch(
        "http://localhost:8080/addUserFavorites/" + props.user._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({preferences:editUserLikingsItem}),
        }
      );
      userLikingsResponse = await userLikingsResponse.json();
      if (userLikingsResponse.success) {
        console.log("Updated User Likings Successfully");
        // props.login(userResponse.user); //reloading user in the usercontext object(i.e. everywhere in the app)
        props.updateProps(userLikingsResponse.userlikings)
        console.log(userLikingsResponse.userlikings);
        setEditUserLikingsItem(null);
      } else {
        console.log(userResponse.message);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUser(
      props.user
        ? {
            "First Name": props.user.fname,
            "Last Name": props.user.lname,
            Email: props.user.email,
            "Phone number1": props.user.phone1
              ? props.user.phone1
              : "Not Provided",
            "Phone number2": props.user.phone2
              ? props.user.phone2
              : "Not Provided",
            Age: props.user.age ? props.user.age : "Not Provided",
            Gender: props.user.gender,
            "Marital Status": props.user.maritalStatus,
          }
        : null
    );
  }, [props]);

  return user ? (
    <Container>
      <Paper
        elavation={4}
        sx={{
          marginTop: "3em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          height: "160px",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        // onClick={() => handleMenuItemClick(item)}
      >
        <ImageBoxWrapper>
          <RoundedAvatar
            src="https://www.licious.in/blog/wp-content/uploads/2022/06/mutton-hyderabadi-biryani-01-750x750.jpg"
            alt="Your Image"
          />
          <Typography variant="h4" fontWeight="800" sx={{ marginLeft: "1em" }}>
            My Profile
          </Typography>
        </ImageBoxWrapper>
        {editUserDetailsItem ? (
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
              onClick={() => onSaveUserClick()}
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
              onClick={() => {setEditUserDetailsItem(null);setEditUserLikingsItem(null)}}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <IconButton
            onClick={() => {setEditUserDetailsItem(JSON.parse(JSON.stringify(user)));setEditUserLikingsItem(JSON.parse(JSON.stringify(props.userLikings)));}}
            sx={{ marginRight: "2em" }}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        )}
      </Paper>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap:'3em'
        }}
      >
        <TableContainer
          component={Paper}
          style={{ maxWidth: 600, marginTop: "1em" }}
        >
          {editUserDetailsItem ? (
            <Table>
              <TableBody>
                {/* {students.map((student, index) => ( */}
                {/* <React.Fragment key={index}> */}
                {Object.entries(editUserDetailsItem).map(([field, value], index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">{field}</Typography>
                    </TableCell>
                    <TableCell>
                      {field === "Gender" ? (
                        <Select
                          sx={{ width: "80%" }}
                          name={field}
                          value={value}
                          onChange={(event) => onUserDetailChange(event)}
                          displayEmpty
                        >
                          {/* <MenuItem value="" disabled>
                            Select Gender
                          </MenuItem> */}
                          {genderOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : field === "Marital Status" ? (
                        <Select
                          sx={{ width: "80%" }}
                          name={field}
                          value={value}
                          onChange={(event) => onUserDetailChange(event)}
                          displayEmpty
                        >
                          {/* <MenuItem value="" disabled>
                            Select Martial Status
                          </MenuItem> */}
                          {martialStatusOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <TextField
                          // type="number"
                          name={field}
                          value={value}
                          onChange={(event) => onUserDetailChange(event)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {/* </React.Fragment> */}
                {/* ))} */}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody>
                {/* {students.map((student, index) => ( */}
                {/* <React.Fragment key={index}> */}
                {Object.entries(user).map(([field, value], index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">{field}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{value}</Typography>
                      {/* {field === "Gender" ? (
                        <Select
                          sx={{ width: "80%" }}
                          value={value}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Select Gender
                          </MenuItem>
                          {genderOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : field === "Marital Status" ? (
                        <Select
                          sx={{ width: "80%" }}
                          value={value}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Select Martial Status
                          </MenuItem>
                          {martialStatusOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <Typography>{value}</Typography>
                      )} */}
                    </TableCell>
                  </TableRow>
                ))}
                {/* </React.Fragment> */}
                {/* ))} */}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <TableContainer
          component={Paper}
          style={{ maxWidth: 600, marginTop: "1em" }}
        >
          {editUserLikingsItem ? (
            <Table>
              <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Food Type</Typography>
                    </TableCell>
                    <TableCell>
                    <Select
                          sx={{ width: "80%" }}
                          name={'foodType'}
                          value={editUserLikingsItem.foodType}
                          onChange={onUserLikingsChange}
                          displayEmpty
                        >
                          {['Veg','Non-Veg','Both'].map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Drinking Habit</Typography>
                    </TableCell>
                    <TableCell>
                    <Select
                          sx={{ width: "80%" }}
                          name={'drinking'}
                          value={editUserLikingsItem.drinking}
                          onChange={onUserLikingsChange}
                          displayEmpty
                        >
                          {['Drinker','Non-Drinker'].map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Smoking Habit</Typography>
                    </TableCell>
                    <TableCell>
                    <Select
                          sx={{ width: "80%" }}
                          name={'smoking'}
                          value={editUserLikingsItem.smoking}
                          onChange={onUserLikingsChange}
                          displayEmpty
                        >
                          {['Smoker','Non-Smoker'].map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Preference</Typography>
                    </TableCell>
                    <TableCell>
                    <Select
                          sx={{ width: "80%" }}
                          name={'preference'}
                          value={editUserLikingsItem.preference}
                          onChange={onUserLikingsChange}
                          displayEmpty
                        >
                          {['Budget','Quality'].map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Food Type</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography>{props.userLikings.foodType}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Drinking Habit</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography>{props.userLikings.drinking}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Smoking Habit</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography>{props.userLikings.smoking}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Preference</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography>{props.userLikings.preference}</Typography>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </Container>
  ) : (
    <Typography>Loading User Details...</Typography>
  );
};

export default UserDetails;
