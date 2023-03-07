import React from "react";

import "../Styles/NavbarItems.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { FlightImages } from "../Utils/Flight/Image";

const links = [
  {
    to: "/",
    imgLink: window.location.origin + "/aeroplane.png",
    title: "Flights",
    component: <img src={FlightImages.flight_image} height="30px" />,
  },
  {
    to: "/hotels",
    imgLink: window.location.origin + "/hotels.png",
    title: "Hotels",
    component: <img src={FlightImages.hotel_image} height="30px" />,
  },
  {
    to: "/homestays",
    imgLink: window.location.origin + "/villas.png",
    title: "Bus",
    component: <img src={FlightImages.bus_image} height="30px" style={{}} />,
  },
];
// <a target="_blank" href="https://icons8.com/icon/60607/hotel-star">Hotel Star</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
function NavbarItems() {
  return (
    <div className="Navbar-search-items-icon">
      {links.map(({ to, imgLink, title, component }) => {
        return (
          <div
            style={{
              // marginTop: "15px",
              // display: "flex",
              justifyContent: "center",
            }}
          >
            {component}
            <div
              style={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "#000",
              }}
            >
              {title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NavbarItems;
