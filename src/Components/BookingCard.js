import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import AutoCompleteInputFrom, {
  CustomSearchBox,
  DatePickerComponent,
  MaterialAutoComplete,
  SelectClass,
} from "./Elements/AutoComplete";
import { AutoCompleteInputTo } from "./Elements/AutoComplete";
import Departure, { ReturnDate } from "./Elements/Departure";
import HomeCard from "./Elements/HomeCard";
import "../Styles/Navbar.css";

import NavbarItems from "./NavbarItems";
import { PostOffer } from "../Utils/API/Offler";
import { useNavigate } from "react-router-dom";
import { AdCards } from "../Utils/Flight/Image";
import leftRight from "../assets/Frontcard/left-right.png";
import flightBanner from "../assets/Frontcard/flightbanner.jpg";

const initialData = {
  origin: "",
  destination: "",
  departure_date: "",
  returnDate: "",
  cabin_class: "economy",
};
function BookingCard() {
  const Navigate = useNavigate();
  const dropRefFrom = useRef();
  const dropRefTo = useRef();
  const [originField, setOriginField] = useState({});
  const [destinationField, setDestinationField] = useState({});
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [oneWay, setOneWay] = useState(true);
  const [cabinClass, setCabinClass] = useState("economy");
  const [formData, setFormData] = useState(initialData);

  window.onclick = (e) => {
    console.log(e.target.className);
    // console.log(window.getElementById(id));
    if (e.target.className != "auto-input") {
      // dropRefFrom.current.style.display = "none";
    }
    if (e.target.className != "auto-input2") {
      // dropRefTo.current.style.display = "none";
    }
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(
      originField,
      destinationField,
      date1,
      date2,
      "<<<< destinationfield"
    );
    // return null;
    if (originField?.iata_code?.trim() == "") {
      return null;
    }
    if (destinationField?.iata_code?.trim() == "") return null;
    if (date1?.trim() == "") return null;
    // if(destinationField.trim()=="")
    Navigate(
      `/flights/${originField.iata_code}/${destinationField.iata_code}/${date1}/${cabinClass}`
    );

    // PostOffer
  };
  console.log(formData, "<<< this is formData");

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={flightBanner} width="100%" />
        <div className="banner-tex">
          Enjoy The Experience Of <br />
          <span style={{ color: "aqua" }}> Flights</span> <br /> "In Your
          Budget"
        </div>
      </div>
      <div></div>
      {false && (
        <>
          {" "}
          <div className="wrapper" style={{}}>
            <div className="first-box">
              <Button
                variant={oneWay ? "contained" : "outlined"}
                onClick={() => setOneWay(!oneWay)}
              >
                One Way
              </Button>
              <Button
                variant={!oneWay ? "contained" : "outlined"}
                onClick={() => setOneWay(!oneWay)}
              >
                Round Trip
              </Button>
            </div>

            <div className="second-box">
              <AutoCompleteInputFrom
                dropRefFrom={dropRefFrom}
                placeholder="From (Search City)"
                id="from-input"
                name="origin"
                handleChange={handleChange}
                value={formData.origin}
              />
              <img src={leftRight} width="50px" />

              <AutoCompleteInputTo
                placeholder="To (Search City)"
                id="to-input"
                dropRefTo={dropRefTo}
                name="destination"
                handleChange={handleChange}
                value={formData.destination}
              />
              <Departure
                name="departure_date"
                handleChange={handleChange}
                value={formData.departure_date}
              />
              {!oneWay && (
                <ReturnDate
                  name="returnDate"
                  handleChange={handleChange}
                  value={formData.returnDate}
                />
              )}
              <div className="second-box-end-search">
                <Button
                  variant="contained"
                  style={{
                    width: "10rem",
                    height: "3rem",
                    borderRadius: "40px",
                  }}
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </div>
            </div>
            {/* <div className="second-box-end-search">
          <Button
            variant="contained"
            style={{ width: "20rem", height: "3rem", borderRadius: "40px" }}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </div> */}
          </div>
        </>
      )}

      <div className="booking-card">
        <div className="top-buttons">
          <Button
            className="waybutt"
            variant={!oneWay ? "outlined" : "contained"}
            onClick={() => setOneWay(true)}
          >
            One Way
          </Button>
          <Button
            className="waybutt"
            variant={oneWay ? "outlined" : "contained"}
            onClick={() => setOneWay(false)}
          >
            Round Trip
          </Button>
          <SelectClass setCabinClass={setCabinClass} cabinClass={cabinClass} />
        </div>
        <div className="booking-form">
          {" "}
          <CustomSearchBox
            selectedValue={originField}
            placeholder="Origin"
            setSelectedValue={setOriginField}
          />
          <img src={leftRight} width="40px" />
          <CustomSearchBox
            placeholder="Destination"
            selectedValue={destinationField}
            setSelectedValue={setDestinationField}
          />
          <DatePickerComponent date={date1} setDate={setDate1} />
          {!oneWay && <DatePickerComponent date={date2} setDate={setDate2} />}
        </div>
        <Button
          variant="contained"
          className="searchButt"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </div>
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

      {/* <div className="offer-container">
        <div className="home-offers offer-outer">
          <div className="bold" style={{ fontSize: "30px" }}>
            More Offers
          </div>
          <div className="home-cards">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => {
              return <HomeCard />;
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default BookingCard;
