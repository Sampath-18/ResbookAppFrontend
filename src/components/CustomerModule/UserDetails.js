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

  const [eitem, setEitem] = useState(null);

  const onUserDetailChange = (event) => {
    setEitem({ ...eitem, [event.target.name]: event.target.value });
  };

  const onSaveUserClick = async () => {
    try {
      console.log(isNaN(parseInt(eitem['Phone Number1'])));
      if(isNaN(parseInt(eitem['Phone Number1'])) && isNaN(parseInt(eitem['Phone Number2'])) && isNaN(parseInt(eitem['Age'])))  
      {
        alert('Phone numbers and Age must be numeric');
        return
      }
      if(eitem['Age']!=='')
      {
        let age = parseInt(eitem['Age'])
        if(age<10 || age>70)
        {
          alert('Enter valid age(between 10 and 70');
          return
        }
      }
      let userObj = {}
      userObj['fname']=eitem['First Name']
      userObj['lname']=eitem['Last Name']
      userObj['email']=eitem['Email']
      if(eitem['Phone Number1']!=='')
        userObj['phone1']=eitem['Phone number1']
      if(eitem['Phone Number2']!=='')
        userObj['phone2']=eitem['Phone number2']
      if(eitem['Age']!=='')
        userObj['age']=parseInt(eitem['Age'])
      userObj['gender']=eitem['Gender']
      userObj['maritalStatus']=eitem['Marital Status']
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
        props.login(userResponse.user)//reloading user in the usercontext object(i.e. everywhere in the app)
        setUser(eitem);
        setEitem(null);
      } else {
        console.log(userResponse.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setUser(
      props.user
        ? {
            "First Name": props.user.fname,
            "Last Name": props.user.lname,
            Email: props.user.email,
            "Phone number1": props.user.phone1 ? props.user.phone1 : "Not Provided",
            "Phone number2": props.user.phone2 ? props.user.phone2 : "Not Provided",
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
        {eitem ? (
          <div sx={{display:'flex'}}><Button
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
            onClick={() => setEitem(null)}
          >
            Cancel
          </Button></div>
        ) : (
          <IconButton
            onClick={() => setEitem(JSON.parse(JSON.stringify(user)))}
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
        }}
      >
        <TableContainer
          component={Paper}
          style={{ maxWidth: 600, marginTop: "1em" }}
        >
          {eitem ? (
            <Table>
              <TableBody>
                {/* {students.map((student, index) => ( */}
                {/* <React.Fragment key={index}> */}
                {Object.entries(eitem).map(([field, value], index) => (
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
        <Box
          sx={{
            width: "30%",
            // height: "75vh",
            backgroundColor: "gray",
            marginTop: "1em",
          }}
        >
          <Typography variant="h5">Preferences</Typography>
          <Box
            sx={{
              minHeight: "10vh",

              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              borderRadius: "1em",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button variant="contained">Veg</Button>
              <Button variant="contained">Non-Veg</Button>
              <Button variant="contained">Both</Button>
            </div>
          </Box>
          <Box
            sx={{
              minHeight: "10vh",
              marginTop: "2em",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              borderRadius: "1em",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button variant="contained">Drinker</Button>
              <Button variant="contained">Non-Drinker</Button>
            </div>
          </Box>
          <Box
            sx={{
              minHeight: "10vh",
              marginTop: "2em",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              borderRadius: "1em",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button variant="contained">Smoker</Button>
              <Button variant="contained">Non-Smoker</Button>
            </div>
          </Box>
          <Box
            sx={{
              minHeight: "10vh",
              marginTop: "2em",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              borderRadius: "1em",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button variant="contained">Budget</Button>
              <Button variant="contained">Quality</Button>
            </div>
          </Box>
        </Box>
      </Container>
    </Container>
  ) : (
    <Typography>Loading User Details...</Typography>
  );
};

export default UserDetails;
