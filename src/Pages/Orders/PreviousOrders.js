import {
  Button,
  Card,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PreviousORders, getORderById } from "../../Utils/API/UserAPI";
import { ImageText } from "../Flights";
import { AdCards } from "../../Utils/Flight/Image";

function PreviousOrders() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});
  const [showError, setShowError] = useState(null);
  const handleSubmit = () => {
    if (email == "") return setShowError("Enter Email Address");
    PreviousORders(email, (res) => {
      console.log(res, "<<<fetchallorders");

      if (res.data.length) {
        setUser(res.data[0]);
        let bookings = res.data[0].bookings;
        if (bookings.length == 0) setShowError("No order Found");
        else {
          var bookingDetail = [];
          bookings.map((item) => {
            getORderById(item, (res) => {
              console.log(res.data.data, "<<<bookingres");
              bookingDetail = [...bookingDetail, res.data.data];
            });
          });
          setTimeout(() => {
            console.log(bookingDetail, user, "<<<thisisbookingdetail");
            setOrders(bookingDetail);
          }, 3000);
        }
      } else {
        setShowError("No User Found");
      }
    });
  };
  console.log(orders, "<<<this is booking detail");
  return (
    <div className="bg-common">
      <div className="orderpage-cover">
        <div style={{ width: "80%", marginTop: "2rem" }}>
          {showError && (
            <Snackbar
              severity="error"
              open={showError != null ? true : false}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              autoHideDuration={20000}
              onClose={() => setShowError(null)}
              // TransitionComponent={state.Transition}
              message={showError}
              // key={state.Transition.name}
            />
          )}
          <div
            className="fligh-detail-cover dflex"
            style={{ justifyContent: "center" }}
          >
            <Card
              className="booking-email-cover cardbg"
              style={{ flexDirection: "column" }}
            >
              <div>
                <Typography fontSize={25}>Enter Your Email Id</Typography>
              </div>

              <TextField
                id="standard-basic"
                // label="Email"
                name="email"
                placeholder="youremail@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                style={{
                  width: "400px",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Search Orders
              </Button>
            </Card>
          </div>
          <div
            className="showorders-cover"
            style={{ justifyContent: "center" }}
          >
            <Typography fontSize={25} textAlign="center" mb={2}>
              Your Orders
            </Typography>

            {orders.length > 0 &&
              orders.map((item, index) => {
                return (
                  <Card>
                    <Grid container>
                      <Grid item md={12} textAlign="center">
                        <img src={item?.owner?.logo_symbol_url} width="50px" />
                        <br />
                        <Typography fontSize={22} fontWeight="bold">
                          {" "}
                          {item.owner.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    {item?.slices?.map((slice, key) => {
                      return (
                        <Grid container key={key} mt={2}>
                          <Grid item md={5} textAlign="right">
                            {slice?.origin?.iata_code} ( {slice?.origin?.name})
                          </Grid>
                          <Grid item md={1} textAlign="center">
                            to
                          </Grid>
                          <Grid item md={5}>
                            {slice?.destination?.iata_code} ({" "}
                            {slice?.destination?.name})
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Grid container mt={2}>
                      <Grid item md={5} textAlign="right">
                        Order ID
                      </Grid>
                      <Grid item md={1} textAlign="center">
                        :
                      </Grid>
                      <Grid item md={5}>
                        {item.id}
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={5} textAlign="right">
                        Total Amount
                      </Grid>
                      <Grid item md={1} textAlign="center">
                        :
                      </Grid>
                      <Grid item md={5}>
                        {item?.total_currency} {item?.total_amount} (
                        {item?.type})
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={5} textAlign="right">
                        Created At
                      </Grid>
                      <Grid item md={1} textAlign="center">
                        :
                      </Grid>
                      <Grid item md={5}>
                        {new Date(item?.created_at).toDateString()} {"  "}{" "}
                        {"  "}
                        {new Date(item?.created_at).getHours()}:
                        {new Date(item?.created_at).getMinutes()}
                      </Grid>
                    </Grid>

                    <Grid container mt={2}>
                      <Grid item md={6} textAlign="right">
                        <Typography fontWeight="bold" fontSize="18">
                          Passengers
                        </Typography>
                      </Grid>
                    </Grid>
                    {item?.passengers?.map((pas, key) => {
                      return (
                        <Grid container mt={2} key={key}>
                          <Grid item md={6} textAlign="right">
                            {pas?.title} {pas?.given_name}
                          </Grid>
                          <Grid item md={6} textAlign="left">
                            ({pas?.gender}) ({pas?.type})
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Card>
                );
              })}
          </div>
        </div>

        <div className="support-cover">
          <ImageText src={AdCards.support} text="24/7 Live support" />
          <ImageText
            src={AdCards.savemoney}
            text="Free Cancelation within 24 hours"
          />
          <ImageText src={AdCards.pound} text="Big savings" />
        </div>
      </div>
    </div>
  );
}

export default PreviousOrders;
