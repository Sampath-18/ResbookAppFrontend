import React from "react";
// import NavBar from '../components/NavBar/NavBar'
import ResList from "../components/ResList/ResList";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Home = () => {
  return (
    <>
      <ResList />
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
        style={{ marginTop: "2em" }}
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: " #FF645A" }}
                >
                  <MDBIcon color="secondary" icon="gem" className="me-3" />
                  RESBOOK
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: " #FF645A" }}
                >
                  About
                </h6>
                <p>
                  <a href="#!" className="text-reset ">
                    <Typography>About Us</Typography>
                  </a>
                </p>
                <p>
                  <a href="/RestaurantIntake" className="text-reset">
                    Add Restaurant
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Terms & Conditions
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Privacy Policy
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: " #FF645A" }}
                >
                  Top Cuisines
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    Chinese
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Italian
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    South Indian
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    North Indian
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: " #FF645A" }}
                >
                  Top Facilities
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    Fine Dining
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    5 Star
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Sea Food
                  </a>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            RESBOOK.com
          </a>
          <section>
            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              <FacebookIcon />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <TwitterIcon />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <GoogleIcon />
            </MDBBtn>
            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <InstagramIcon />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <LinkedInIcon />
            </MDBBtn>
          </section>
        </div>
            
      </MDBFooter>
    </>
  );
};

export default Home;
