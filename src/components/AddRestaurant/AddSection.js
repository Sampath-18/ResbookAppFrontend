import { Paper, Button, Grid, Typography } from "@mui/material";
import React from "react";

import TextField from "@mui/material/TextField";
import MenuIntake from "./MenuIntake";
import TimingsIntake from "./TimingsIntake";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhotoUploader from "./PhotoUploader";

const AddSection = (props) => {
  const handleRemoveSection = () => {
    console.log("From add section component handleRemoveSection is called..");
    props.onRemove();
  };

  return (
    <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "65%",
          }}
        >
          <Paper elevation={3} sx={{ marginTop: "1em", padding: "1em" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Section name"
                  variant="outlined"
                  value={props.sectionName}
                  name="sectionName"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Cost for 2"
                  variant="outlined"
                  value={props.avgCost}
                  name="avgCost"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Capacity"
                  variant="outlined"
                  value={props.capacity}
                  name="capacity"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              {/* <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="photos"
                  variant="outlined"
                  value={props.secImg}
                  name="secImg"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid> */}
              <Grid item xs={2} sm={4} md={4}>
                <Box sx={{}}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Catering available?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.cateringAvailable}
                      name="cateringAvailable"
                      label="Catering available?"
                      onChange={(event) => props.onChange(event)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="reservationCharge"
                  variant="outlined"
                  value={props.reservationCharge}
                  name="reservationCharge"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Search tags"
                  variant="outlined"
                  value={props.searchTags}
                  name="searchTags"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Box sx={{}}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Dine-in available
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.dineinAvailable}
                      label="Dine-in available"
                      name="dineinAvailable"
                      onChange={(event) => props.onChange(event)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Cuisines"
                  variant="outlined"
                  value={props.cuisines}
                  name="cuisines"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Box sx={{}}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      AutoAccept Bookings
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.autoAcceptBookings}
                      name="autoAcceptBookings"
                      label="AutoAccept Bookings"
                      onChange={(event) => props.onChange(event)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={4} sm={8} md={8}>
                <TextField
                  label="Description"
                  variant="outlined"
                  id="filled-textarea"
                  multiline
                  fullWidth
                  minRows={4}
                  value={props.sectionDescription}
                  name="sectionDescription"
                  onChange={(event) => props.onChange(event)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Typography sx={{ marginTop: "1em" }}>
                  Open Time:
                  <input
                    style={{ marginLeft: "1em" }}
                    type="time"
                    name="OpenTime"
                    onChange={(event) => props.onChange(event)}
                  />
                </Typography>
                <Typography sx={{ marginTop: "1em" }}>
                  Close Time:
                  <input
                    style={{ marginLeft: "1em" }}
                    type="time"
                    name="CloseTime"
                    onChange={(event) => props.onChange(event)}
                  />
                </Typography>
              </Grid>
            </Grid>
            {/* <Button variant="contained" onClick={() => navigate("/MenuIntake")}>
              Add Menu
            </Button> */}

          </Paper>
          <MenuIntake setMenu={(menu) => props.setMenu(menu)} />
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "35%",
          }}
        >
          {/* <TimingsIntake timing={props.timing} setTimings={(timing) => props.setTimings(timing)} /> */}
          <Button
            sx={{ marginTop: "1em" }}
            variant="contained"
            onClick={() => handleRemoveSection()}
          >
            Remove Section
          </Button>
        </Container>
      </Container>
      <Container sx={{marginTop:"1em"}}>
        <PhotoUploader setSecImg={(secImg) => props.setSecImg(secImg)} />
      </Container>
    </Container>
  );
};

export default AddSection;
