import React from "react";

import "./NavbarItems.css";

const links = [
  {
    to: "/",
    imgLink: window.location.origin + "/aeroplane.png",
    title: "Flights",
  },
  {
    to: "/hotels",
    imgLink: window.location.origin + "/hotels.png",
    title: "hotels",
  },
  {
    to: "/homestays",
    imgLink: window.location.origin + "/villas.png",
    title: "Villas&Apts",
  },
];

function NavbarItems() {
  return (
    <div className="Navbar-search-items-icon">
      {links.map(({ to, imgLink, title }) => {
        return (
          <div style={{ marginTop: "15px", justifyContent: "center" }}>
            <img src={imgLink} alt="noimage" width="40" height="40" />

            <div style={{ backgroundColor: "#FFFFFF", textDecoration: "none" }}>
              {title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NavbarItems;
