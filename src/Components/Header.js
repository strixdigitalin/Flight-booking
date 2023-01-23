import React from "react";
import "../Styles/Header.css";
import logo from "../assets/logo-banner/logo.jpeg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Header() {
  const Navigate = useNavigate();
  // const logo = window.location.origin + "/mmtLogo.png";
  const mybiz = window.location.origin + "/mybiz.png";
  const travellug = window.location.origin + "/travellug.png";
  const loginorcreate = window.location.origin + "/loginorcreate.png";
  return (
    <div>
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
            <img
              className="header-img-2"
              src={mybiz}
              alt="mybiz"
              width="40"
              height="40"
              style={{ paddingRight: "10px" }}
            />
            <div>
              <div className="header-mybiz-1">Introducing </div>
              <div className="header-mybiz-2">Mybookingcart for Business</div>
            </div>
          </div>
        </div>

        <div className="header-login">
          <Button
            variant="outlined"
            // color="white"
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
          {/* <img
            src={loginorcreate}
            alt="login"
            width="250"
            height="60"
            style={{ paddingRight: "5px" }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
