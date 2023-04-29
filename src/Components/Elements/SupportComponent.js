import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { AdCards } from "../../Utils/Flight/Image";

function SupportComponent() {
  return (
    <Card>
      <div className=" support-card">
        <Grid container alignItems="center">
          <Grid item md={4} textAlign="center" alignItems="center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight="bold" fontSize={25}>
                Live 24/7 <br />
                Support
              </Typography>
              <img src={AdCards.support} width="100px" height="100px" />
            </div>
          </Grid>
          <Grid item md={4} textAlign="center" alignItems="center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight="bold" fontSize={25}>
                Save Money
              </Typography>
              <img src={AdCards.pound} width="100px" height="100px" />
            </div>
          </Grid>
          <Grid item md={4} textAlign="center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight="bold" fontSize={25}>
                Free Cancelation <br /> within 24 hours
              </Typography>
              <img src={AdCards.savemoney} width="100px" height="100px" />
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default SupportComponent;
