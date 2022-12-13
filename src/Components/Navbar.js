import React from "react";
import "./Navbar.css";

import NavbarItems from "./NavbarItems";
function Navbar() {
  return (
    <div>
      <div className="wrapper">
        <div className="first-box">
          <NavbarItems />
        </div>
        <div className="second-box">
          <div style={{ height: "20px" }}></div>
        </div>

        <div className="second-box-end-search">SEARCH</div>
      </div>
    </div>
  );
}

export default Navbar;
