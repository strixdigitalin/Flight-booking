import React from "react";
import "../Styles/Header.css";
// import logo from "../assets/logo-banner/logo.jpeg";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ThemeColor } from "../Utils/Flight/Colors";
import { AdCards, FlightImages } from "../Utils/Flight/Image";
import NavbarItems from "./NavbarItems";

import customerSupport from "../assets/Frontcard/customer-support.jpeg";
import logo from "../assets/Frontcard/logo.png";
function Header() {
  const Navigate = useNavigate();
  // const logo = window.location.origin + "/mmtLogo.png";
  const mybiz = window.location.origin + "/mybiz.png";
  const travellug = window.location.origin + "/travellug.png";
  const loginorcreate = window.location.origin + "/loginorcreate.png";

  return (
    <div className="bgTheme stickyHead">
      <div className="header-main">
        <Grid container alignItems="center">
          <Grid item md={2} alignItems="center">
            <img
              className="header-img-1"
              src={logo}
              alt="mmt logo"
              width="200"
              height="70px"
              style={{
                objectFit: "contain",
              }}
              // height="38"
            />
          </Grid>
          <Grid item md={4}>
            {/* <NavbarItems /> */}
          </Grid>
          <Grid item md={1} style={{}}>
            {/* <InputLabel id="demo-simple-select-label">Language</InputLabel> */}

            <Typography textAlign="left">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Typography>
          </Grid>
          <Grid item md={1} style={{}}>
            {/* <InputLabel id="demo-simple-select-label">Language</InputLabel> */}

            <Typography textAlign="left">
              <Link
                to="/orders"
                style={{ textDecoration: "none", color: "white" }}
              >
                Your Orders
              </Link>
            </Typography>
          </Grid>
          {/* <Grid item md={1} style={{}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              fullWidth
              label="Gender"
              // onChange={handleChange}
            >
              <MenuItem value={10}>English</MenuItem>
              <MenuItem value={20}>Spanish</MenuItem>
            </Select>
          </Grid> */}

          <Grid
            item
            md={3}
            textAlign="end"
            style={{
              backgroundColor: ThemeColor.thirdColor,
              padding: "0px 10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div className="fs20 text-b">
                Phone Only flight deals
                <div className="callnow">Call Now : +18884070942 </div>
              </div>
              <div>
                <img
                  // src={AdCards.support}
                  src={customerSupport}
                  width="50px"
                  style={{
                    background: "white",
                    border: "3px solid green",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export const Header2 = () => {
  const Navigate = useNavigate();
  // const logo = window.location.origin + "/mmtLogo.png";
  const mybiz = window.location.origin + "/mybiz.png";

  return (
    <div className="bgTheme stickyHead">
      <div className="header-main">
        <div>
          <img
            className="header-img-1"
            src={logo}
            alt="mmt logo"
            width="110"
            style={{
              objectFit: "contain",
            }}
            // height="38"
          />
        </div>
        <div className="middle-header">
          <div className="header-mybiz">
            <div className="dflex">Flights</div>
          </div>
          <div className="header-mybiz">
            <div className="dflex">Hotels</div>
          </div>
          <div className="header-mybiz">
            <div className="dflex">Bus</div>
          </div>
        </div>

        <div className="header-login dflex">
          <div className="fs15 text-b">
            Phone Only flight deals
            <div className="callnow">Call Now : +18 452444492 </div>
          </div>

          <img
            src={AdCards.support}
            width="50px"
            style={{
              background: "white",
              border: "3px solid green",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        </div>
        {/* <div className="header-login">
          <Button
            variant="outlined"
            onClick={() => {
              Navigate("/login");
            }}
            style={{
              textTransform: "initial",
              border: "1px solid white",
              color: "white",
            }}
          >
            <span>Login / Signup</span>
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
