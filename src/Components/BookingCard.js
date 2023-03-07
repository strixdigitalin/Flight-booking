import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import AutoCompleteInputFrom from "./Elements/AutoComplete";
import { AutoCompleteInputTo } from "./Elements/AutoComplete";
import Departure from "./Elements/Departure";
import HomeCard from "./Elements/HomeCard";
import "../Styles/Navbar.css";

import NavbarItems from "./NavbarItems";
import { PostOffer } from "../Utils/API/Offler";
import { useNavigate } from "react-router-dom";
import { AdCards } from "../Utils/Flight/Image";

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
    if (
      formData.origin == "" ||
      formData.destination == "" ||
      formData.departure_date == ""
    ) {
      return null;
    }

    Navigate(
      `/flights/${formData.origin}/${formData.destination}/${formData.departure_date}/${formData.cabin_class}`
    );

    // PostOffer
  };
  console.log(formData, "<<< this is formData");

  return (
    <div>
      <div className="wrapper">
        {/* <div className="first-box">
          <NavbarItems />
        </div> */}
        <div className="second-box">
          <AutoCompleteInputFrom
            dropRefFrom={dropRefFrom}
            placeholder="From (Search City)"
            id="from-input"
            name="origin"
            handleChange={handleChange}
            value={formData.origin}
          />
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
          {/* <Departure
            name="returnDate"
            handleChange={handleChange}
            value={formData.returnDate}
          /> */}
        </div>
        <div className="second-box-end-search">
          <Button
            variant="contained"
            style={{ width: "20rem", height: "3rem", borderRadius: "40px" }}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </div>
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
                <Typography fontWeight="bold">
                  Live 24/7 <br />
                  Support
                </Typography>
                <img src={AdCards.support} width="60px" height="60px" />
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
                <Typography fontWeight="bold">Save Money</Typography>
                <img src={AdCards.pound} width="60px" height="60px" />
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
                <Typography fontWeight="bold">
                  Free Cancelation within 24 hours
                </Typography>
                <img src={AdCards.savemoney} width="60px" height="60px" />
              </div>
            </Grid>
          </Grid>
        </div>
      </Card>
      <div className="offer-container">
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
      </div>
    </div>
  );
}

export default BookingCard;
