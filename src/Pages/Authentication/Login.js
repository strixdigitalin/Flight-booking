import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdCards } from "../../Utils/Flight/Image";
import { Button } from "@mui/material";

const bgImage = AdCards.flight_ad;

export default function LoginPage() {
  return (
    <div
      className="login-cover bg-common"
      // style={{
      //   backgroundImage: `url(${bgImage})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
    >
      {/* <div className="login-left"></div> */}
      <div className="login-right">
        <div className="fs25 text-c w100 text-b">Login</div>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              // error
              id="outlined-error"
              label="Email Id"
              // defaultValue="Hello World"
            />
          </div>
          <div>
            <TextField
              // error
              id="outlined-error"
              label="Password"
              // defaultValue="Hello World"
            />
          </div>
        </Box>
        <Button
          variant="contained"
          // color="success"
          style={{
            width: "100%",
            height: "3rem",
            borderRadius: "10px",
            marginTop: "2rem",
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
