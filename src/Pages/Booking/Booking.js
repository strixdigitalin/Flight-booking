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
  Snackbar,
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
import {
  StripePayment,
  confirmPayment,
  createOrderAPI,
  createPaymentIntent,
} from "../../Utils/API/PaymentAPI";
import DuffelPayment from "../Payments/CreatePayment";
import { SendConfirmEmail } from "../../Utils/API/UserAPI";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
let initialState = {
  email: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  phone_number: "",
  born_on: "",
  id: "",
};
let initialPayment = {
  cardHolderFullName: "",
  cardNumber: "",
  expiration: "",
  cardVerificationNumber: "",
  address: "",
  city: "",
  country: "",
  pincode: "",
};

function Booking() {
  const { id } = useParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [getorderConfirmData, setGetorderConfirmData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [paymentDetail, setPaymentDetail] = useState(initialPayment);
  const [paymentIntemnt, setPaymentIntemnt] = useState({});
  const [showError, setShowError] = useState(null);
  useEffect(() => {
    setShowError("hekjk");
    getOnlyOfferbyOfferId(id, (res) => {
      console.log(res.data.data, "<<<flightdata");
      setOrderData(res.data.data);
      let tempuserD = [];
      res.data.data.passengers.map((item) => {
        tempuserD.push({ ...initialState, id: item?.id });
      });
      setUserData(tempuserD);
      createPaymentIntent(
        {
          currency: res.data.data.base_currency,
          amount: res.data.data?.base_amount,
        },
        (res) => {
          console.log(res, "paymentintent");
          if (res.success) {
            setPaymentIntemnt(res.data.data);
          }
        }
      );
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

  const handleUser = (e, index) => {
    let { name, value } = e.target;
    let temp = userData;
    temp[index][name] = value;

    setUserData(temp);
  };

  const handlePaymentDetail = (e) => {
    let { name, value } = e.target;
    setPaymentDetail({ ...paymentDetail, [name]: value });
  };
  const handleSubmit = () => {
    console.log(userData, "<<<<thisisuserdata");
  };
  console.log(userData, orderData, "<<< this is orderdata");
  const successfulPaymentHandlerFn = () => {
    console.log("payment success");
    alert("Success payment");
    confirmPayment(paymentIntemnt?.id, (res) => {
      // phone_number: phone_number,
      // email: email,
      // born_on: born_on,
      // title: gender == "m" ? "mr" : "mrs",
      // gender: gender,
      // family_name: lastName,
      // given_name: firstName + middleName,
      // id: ADULT_PASSENGER_ID_1,
      let userPayload = userData.map((item) => ({
        given_name: item.firstName + item.middleName,
        family_name: item?.lastName,
        id: item.id,
        title: item?.gender == "m" ? "mr" : "mrs",
        gender: item?.gender,
        email,
        phone_number: item?.phone_number,
        born_on: item?.born_on,
      }));

      if (res.success) {
        createOrderAPI({ userData: userPayload, orderData, email }, (res) => {
          if (res.success) {
            SendConfirmEmail(email, (res) => {
              console.log("emeila sent");
            });
            alert("Booking successful");
          } else {
            setShowError(res.error.errors[0].message);
          }
        });
      }
    });

    // Show 'successful payment' page and confirm Duffel PaymentIntent
  };
  const errorPaymentHandlerFn = (error) => {
    console.log(error, "<<<this is error");
    // Show error page
  };

  return (
    <div className="page-cover">
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
                            Arrived: {segment?.destination?.name} (
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
          ></div>
          <Typography variant="h5" fontSize={18} fontWeight={600} mb={1} mt={4}>
            WHERE TO SEND YOUR CONFIRMATION
          </Typography>
          <Card className="booking-email-cover cardbg">
            <TextField
              id="standard-basic"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {userData?.map((item, index) => {
              return (
                <div>
                  <Typography mb={2}>
                    <span style={{ fontWeight: "bold" }}>
                      Passenger {index + 1}
                    </span>
                  </Typography>

                  <Grid container spacing={2} key={index}>
                    <Grid item md={4}>
                      <TextField
                        fullWidth
                        id="standard-basic"
                        name="firstName"
                        value={userData?.firstName}
                        onChange={(e) => handleUser(e, index)}
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
                        name="middleName"
                        value={userData?.middleName}
                        onChange={(e) => handleUser(e, index)}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Last Name"
                        variant="standard"
                        name="lastName"
                        value={userData?.lastName}
                        onChange={(e) => handleUser(e, index)}
                      />
                    </Grid>

                    <Grid item md={4}>
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Phone Number"
                        variant="standard"
                        name="phone_number"
                        value={userData?.phone_number}
                        onChange={(e) => handleUser(e, index)}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth
                        label="Gender"
                        name="gender"
                        value={userData?.gender}
                        onChange={(e) => handleUser(e, index)}
                        // onChange={handleChange}
                      >
                        <MenuItem value={"m"}>Male</MenuItem>
                        <MenuItem value={"f"}>Female</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item md={4}>
                      <InputLabel id="demo-simple-select-label">
                        Date Of Birth
                      </InputLabel>
                      <input
                        type="date"
                        name="born_on"
                        value={userData.born_on}
                        onChange={(e) => handleUser(e, index)}
                        style={{ height: "3.1rem" }}
                      />
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Card>
          {/* <Card className="booking-baggage cardbg">
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
          </Card> */}
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
          {/* <Typography variant="h5" mb={1} mt={4} fontSize={18} fontWeight={600}>
            BILLING INFORMATION
          </Typography> */}
          {/* <Card style={{}} className="cardbg">
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
          </Card> */}
          {paymentIntemnt?.client_token && (
            <DuffelPayment
              token={paymentIntemnt?.client_token}
              successfulPaymentHandlerFn={successfulPaymentHandlerFn}
              errorPaymentHandlerFn={errorPaymentHandlerFn}
            />
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Book Now
            </Button>
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
