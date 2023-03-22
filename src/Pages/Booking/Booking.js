import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import {
  cancelOrder,
  createOrder,
  getOnlyOfferbyOfferId,
} from "../../Utils/API/Offler";
import {
  Button,
  Card,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  getBookingDate,
  getDates,
  getDateTimeFun,
  getMonths,
  getYears,
} from "../../Utils/Flight/CommonFunctions";
import { StripePayment } from "../../Utils/API/PaymentAPI";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Booking() {
  const { id } = useParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [getorderConfirmData, setGetorderConfirmData] = useState(null);

  useEffect(() => {
    getOnlyOfferbyOfferId(id, (res) => {
      console.log(res.data.data, "<<<flight data");
      setOrderData(res.data.data);
    });
  }, []);
  const cancelORder = () => {
    cancelOrder(getorderConfirmData.id, (res) => {
      console.log(res, "<<< resorder");
      if (res.success) {
        alert("Order Cancelled");
        setShowSuccessMessage("Order successfully Created ");
        setGetorderConfirmData(res.data.data);
      }
      setTimeout(() => {
        setShowSuccessMessage(null);
      }, 5000);
    });
  };
  const confirmOrder = () => {
    console.log(orderData?.passengers[0]);
    // StripePayment();
    StripePayment("64185544f427088880e73e02", (res) => {
      console.log(res, "<<<<response");
      if (res.success) {
        window.location.href = res.url;
      }
    });
    // return null;
    createOrder(
      {
        OFFER_ID: id,
        TOTAL_AMOUNT: orderData.total_amount,
        TOTAL_CURRENCY: orderData.total_currency,
        ADULT_PASSENGER_ID_1: orderData?.passengers[0]?.id,
      },
      (res) => {
        console.log(res, "<< this is res");
        alert("Order Successfully Created");
        setGetorderConfirmData(res.data.data);
      }
    );
  };

  return (
    <div className="page-cover">
      <div className="cancle-tag">
        REVIEW & BOOK WITH CONFIDENCE – YOU CAN CANCEL FOR A FEE WITHIN THE NEXT
        24 HOURS!
      </div>

      <Grid container spacing={4}>
        <Grid item md={8}>
          <Typography variant="h5" mb={1} mt={4} fontSize={18} fontWeight={600}>
            Flight Details
          </Typography>
          <Card className="booking-way-detail cardbg">
            <Typography>
              Order Created At : {getDateTimeFun(orderData?.created_at).date}{" "}
              {getDateTimeFun(orderData?.created_at).time}
            </Typography>

            {orderData?.slices?.map((slice) => {
              return slice?.segments?.map((segment) => {
                console.log(segment, "<<< this is one segments");

                return (
                  <div className="booking-single-way">
                    <Grid container>
                      <Grid item md={9}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={600} fontSize={13}>
                            {getBookingDate(segment?.departing_at).date} {"  "}
                            {getBookingDate(segment?.departing_at).time}{" "}
                          </Typography>
                          <Typography fontSize={13}>
                            Depart: {segment?.origin?.name} (
                            {segment?.origin?.iata_code})
                          </Typography>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Typography fontWeight={600} fontSize={13}>
                            {getBookingDate(segment?.arriving_at).date} {"  "}
                            {getBookingDate(segment?.arriving_at).time}{" "}
                          </Typography>
                          <Typography fontSize={13}>
                            Depart: {segment?.destination?.name} (
                            {segment?.destination?.iata_code})
                          </Typography>
                        </div>
                        {/* {segment?.departing_at} */}
                      </Grid>
                      <Grid item md={3}>
                        <img
                          src={segment?.operating_carrier?.logo_symbol_url}
                          height="50px"
                          width="50px"
                        />
                      </Grid>
                    </Grid>
                  </div>
                );
              });
            })}
          </Card>
          <div
            style={{
              width: "50%",
              margin: "auto",
              marginTop: "2rem",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {getorderConfirmData == null && (
              <Button
                variant="contained"
                color="success"
                onClick={confirmOrder}
                style={{ width: "100%", padding: "12px", marginTop: "2rem" }}
              >
                Confirm Booking
              </Button>
            )}
            {getorderConfirmData != null && (
              <div className="booking-way-detail cardbg">
                <Grid
                  container
                  spacing={1}
                  // columnSpacing={3  }
                  mt={1}
                  style={{ alignItems: "center" }}
                >
                  <Grid
                    mt={1}
                    container
                    spacing={2}
                    columnSpacing={3}
                    style={{ alignItems: "center" }}
                  >
                    <Grid item md={4} textAlign="right">
                      <Typography fontWeight={"bold"}>*Order Id</Typography>
                    </Grid>
                    <Grid item md={4}>
                      {getorderConfirmData?.id}
                    </Grid>
                    <Grid item md={4}></Grid>
                  </Grid>
                  <Grid
                    mt={1}
                    container
                    spacing={2}
                    columnSpacing={3}
                    style={{ alignItems: "center" }}
                  >
                    <Grid item md={4} textAlign="right">
                      <Typography fontWeight={"bold"}>Amount</Typography>
                    </Grid>
                    <Grid item md={4}>
                      {getorderConfirmData?.base_amount}
                    </Grid>
                    <Grid item md={4}></Grid>
                  </Grid>
                  <Grid
                    mt={1}
                    container
                    spacing={2}
                    columnSpacing={3}
                    style={{ alignItems: "center" }}
                  >
                    <Grid item md={4} textAlign="right">
                      <Typography fontWeight={"bold"}>Currency</Typography>
                    </Grid>
                    <Grid item md={4}>
                      {getorderConfirmData?.base_currency}
                    </Grid>
                    <Grid item md={4}></Grid>
                  </Grid>
                  <Grid
                    mt={1}
                    container
                    spacing={2}
                    columnSpacing={3}
                    style={{ alignItems: "center" }}
                  >
                    <Grid item md={4} textAlign="right">
                      <Typography fontWeight={"bold"}>Created At</Typography>
                    </Grid>
                    <Grid item md={4}>
                      {getDateTimeFun(getorderConfirmData?.created_at).date}{" "}
                      {getDateTimeFun(getorderConfirmData?.created_at).time}{" "}
                    </Grid>
                    <Grid item md={4}></Grid>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
          <Typography variant="h5" fontSize={18} fontWeight={600} mb={1} mt={4}>
            WHERE TO SEND YOUR CONFIRMATION
          </Typography>
          <Card className="booking-email-cover cardbg">
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              style={{ width: "400px", backgroundColor: "white" }}
            />
          </Card>
          <Typography mb={1} mt={4} fontSize={18} fontWeight={600}>
            TRAVELER DETAILS
          </Typography>
          <Typography>
            All passenger information must match exactly what is on the
            government-issued ID you use while traveling. <br />
            <span style={{ fontWeight: "bold" }}>
              Government required information for travel:
            </span>
          </Typography>
          <Card className="booking-passenger-detail-card cardbg">
            <Grid container spacing={2}>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Middle Name"
                  variant="standard"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                />
              </Grid>

              <Grid item md={3}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  fullWidth
                  label="Gender"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                  <MenuItem value={30}>Other</MenuItem>
                </Select>
              </Grid>
              <Grid item md={3}>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  fullWidth
                  label="Age"
                  // onChange={handleChange}
                >
                  {getMonths?.map((item, key) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </Select>
              </Grid>
              <Grid item md={3}>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  fullWidth
                  label="Age"
                  // onChange={handleChange}
                >
                  {getDates()?.map((item, key) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </Select>
              </Grid>
              <Grid item md={3}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  fullWidth
                  label="Age"
                  // onChange={handleChange}
                >
                  {getYears()?.map((item, key) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </Select>
              </Grid>
            </Grid>
          </Card>
          <Card className="booking-baggage cardbg">
            <div className="baggage-upper">
              <Typography variant="h4" align="center" color="white">
                Baggage
              </Typography>
              <Typography color="white">
                Adding baggage at the airport can cost up to 50% more. Purchase
                now.
                <br />
              </Typography>
            </div>

            <div className="booking-email-cover">
              <InputLabel id="demo-simple-select-label">
                Passenger 1 Adult
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Passenger 1 Adult"
                style={{ width: "300px", color: "black" }}
                value={0}

                // onChange={handleChange}
              >
                <MenuItem value={0}>Select Bag</MenuItem>
                <MenuItem value={1}>1 X carry-on-bag +($239) </MenuItem>
                <MenuItem value={2}>1 X Checked +($215) </MenuItem>
              </Select>
            </div>
          </Card>
          {/* <Card className="booking-baggage cardbg">
            <div
              style={{
                backgroundColor: "blue",
                padding: "12px",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h3" align="center" color="white">
                ss
              </Typography>
              <Typography color="white">
                Relax knowing the airline has your seat preference right away.{" "}
                <br />
                You can select a preference for a window seat, aisle seat, or a
                seat closest to the front. <br /> We are transmitting your seat
                request to the airline directly for $19.95. The confirmation of
                the seat you’ve requested is contingent upon the airline’s
                guidelines for the chosen fare type.
              </Typography>
            </div>

            <Grid container>
              <Grid item md={5}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  fullWidth
                  label="Age"

                  // onChange={handleChange}
                >
                  <MenuItem value={10}>1 Checked Bag </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Card> */}
          <Typography variant="h5" mb={1} mt={4} fontSize={18} fontWeight={600}>
            BILLING INFORMATION
          </Typography>
          <Card style={{}} className="cardbg">
            <div className="billing-info-card cardbg">
              <Grid
                container
                spacing={2}
                // columnSpacing={3  }
                mt={1}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>
                    *Cardholder's Full Name
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                mt={1}
                container
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>
                    *Credit Card Number
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                mt={1}
                container
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>*Expiration</Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                container
                mt={1}
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>
                    *Card Verification Number
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                container
                mt={1}
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>*Address 1</Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                mt={1}
                container
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>*City</Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                mt={1}
                container
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>*Country</Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
              <Grid
                mt={1}
                container
                spacing={2}
                columnSpacing={3}
                style={{ alignItems: "center" }}
              >
                <Grid item md={4} textAlign="right">
                  <Typography fontWeight={"bold"}>*Pincode</Typography>
                </Grid>
                <Grid item md={4}>
                  <input style={inputStyle} placeholder="Name" />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
            </div>
          </Card>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button variant="contained">Book Now</Button>
          </div>
        </Grid>

        <Grid item md={4}>
          <Typography mb={1} mt={4} fontSize={18} fontWeight={600}>
            Price Details
          </Typography>
          <Card className="price-card">
            <Grid container>
              <Grid item md={6} textAlign="center">
                Total
              </Grid>
              <Grid item md={6}>
                <Typography fontWeight={600}>
                  {orderData?.base_currency} {orderData?.base_amount}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          {getorderConfirmData != null && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="warning"
                style={{ marginTop: "20px" }}
                onClick={cancelORder}
              >
                Cancel Order
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "white",
  padding: "10px 5px 10px 5px",
  borderRadius: "5px",
  width: "100%",
  border: "1px solid gray",
  // padding
};

export default Booking;
