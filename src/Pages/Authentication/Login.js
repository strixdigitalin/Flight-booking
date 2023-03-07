import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdCards } from "../../Utils/Flight/Image";
import { Alert, Button, Snackbar } from "@mui/material";
import { loginAPI } from "../../Utils/API/UserAPI";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../../Components/Elements/SnackBar";

const bgImage = AdCards.flight_ad;
const initialValues = { emailId: "", password: "" };

export default function LoginPage() {
  const [formData, setFormData] = React.useState(initialValues);
  const [showAlert, setshowAlert] = React.useState({
    show: false,
    message: "",
    severity: "success",
    toggle: false,
  });
  const navigate = useNavigate();
  const handleSubmit = () => {
    loginAPI(formData, (res) => {
      console.log(res);
      if (res.status) {
        navigate("/");
      } else {
        console.log("false");
        setshowAlert({
          show: true,
          message: res.message,
          severity: "error",
          toggle: !showAlert.toggle,
        });
      }
    });
  };
  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-cover bg-common">
      {/* <div className="login-left"></div> */}
      <div className="login-right">
        <div className="fs25 text-c w100 text-b">Login</div>
        <ShowAlert
          show={showAlert.show}
          message={showAlert.message}
          severity={showAlert.severity}
          toggle={showAlert.toggle}
        />
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
              name="emailId"
              value={formData.emailId}
              placeholder="Enter Your E-mail"
              onChange={(e) => handleChange(e)}
              // defaultValue="Hello World"
            />
          </div>
          <div>
            <TextField
              // error
              type="password"
              id="outlined-error"
              label="Password"
              value={formData.password}
              name="password"
              placeholder="Enter Your Password"
              onChange={(e) => handleChange(e)}
              // defaultValue="Hello World"
            />
          </div>
        </Box>
        <Button
          onClick={handleSubmit}
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
