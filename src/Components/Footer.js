import { Grid, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <div className="footer-outer">
      <Grid container spacing={4}>
        <Grid item md={3} textAlign="center">
          <Typography
            fontWeight="bold "
            style={{ borderBottom: "2px solid white" }}
          >
            Traveler Help Tools
          </Typography>
          <Typography>Contact Us</Typography>
          <Typography>Faq</Typography>
        </Grid>
        <Grid item md={3} textAlign="center">
          <Typography
            fontWeight="bold"
            style={{ borderBottom: "2px solid white" }}
          >
            About BookMykart
          </Typography>
          <Typography>About Us</Typography>
          <Typography>Testimonial</Typography>
        </Grid>
        <Grid item md={3} textAlign="center">
          <Typography
            fontWeight="bold"
            style={{ borderBottom: "2px solid white" }}
          >
            Legal
          </Typography>
          <Typography>Terms Of Use</Typography>
          <Typography>Taxes And Fees</Typography>
        </Grid>
        <Grid item md={3} textAlign="center">
          <Typography
            fontWeight="bold"
            style={{ borderBottom: "2px solid white" }}
          >
            Address
          </Typography>
          <Typography>
            7910 4th st N, Ste 300 St Petersburg Florida 33702
          </Typography>
          <Typography>+18 452444492, contact@mybookingcart.com</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
