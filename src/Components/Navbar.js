import { Button } from "@mui/material";
import React, { useRef } from "react";
import AutoCompleteInputFrom from "./Elements/AutoComplete";
import { AutoCompleteInputTo } from "./Elements/AutoComplete";
import Departure from "./Elements/Departure";
import HomeCard from "./Elements/HomeCard";
import "./Navbar.css";

import NavbarItems from "./NavbarItems";
function Navbar() {
  const dropRefFrom = useRef();
  const dropRefTo = useRef();
  window.onclick = (e) => {
    console.log(e.target.className);
    // console.log(window.getElementById(id));
    if (e.target.className != "auto-input") {
      dropRefFrom.current.style.display = "none";
    }
    if (e.target.className != "auto-input2") {
      dropRefTo.current.style.display = "none";
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="first-box">
          <NavbarItems />
        </div>
        <div className="second-box">
          <AutoCompleteInputFrom
            dropRefFrom={dropRefFrom}
            placeholder="From (Search City)"
            id="from-input"
          />
          <AutoCompleteInputTo
            placeholder="To (Search City)"
            id="to-input"
            dropRefTo={dropRefTo}
          />
          <Departure />
          <Departure />
        </div>
        <div className="second-box-end-search">
          <Button variant="contained" style={{ width: "20rem" }}>
            Search
          </Button>
        </div>
      </div>
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

export default Navbar;
