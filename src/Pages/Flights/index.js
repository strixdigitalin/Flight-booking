import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowAlert from "../../Components/Elements/SnackBar";
import { GetOffersById, PostOffer } from "../../Utils/API/Offler";
import { AdCards } from "../../Utils/Flight/Image";
import { FlightShortDetails } from "./Components";
import cities, { cities2 } from "../../Utils/DefVariables";
import EnquiryData from "./EnquiryData";
import ShowLoader from "../../Components/Elements/ShowLoader";
import Airport from "../../Utils/Flight/Airports.json";

function FlightOffer() {
  const { origin, destination, departure_date, cabin_class } = useParams();
  const [showLoader, setshowLoader] = useState(false);
  const [errorData, setErrorData] = useState({
    origin: false,
    destination: false,
    departure_date: false,
    cabin_class: false,
  });
  const [OffersData, setOffersData] = useState([]);
  const [showAlert, setshowAlert] = React.useState({
    show: false,
    message: "",
    severity: "success",
    toggle: false,
  });
  const [formData, setFormData] = useState({
    origin,
    destination,
    departure_date,
    cabin_class,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "<<<fields");
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = () => {
    setshowLoader(true);
    console.log(formData, "<<<submit");
    if (formData.origin?.trim() == "")
      return setErrorData({ ...errorData, origin: true });
    if (formData.destination?.trim() == "")
      return setErrorData({ ...errorData, destination: true });
    if (formData.departure_date?.trim() == "")
      return setErrorData({ ...errorData, departure_date: true });
    if (formData.cabin_class?.trim() == "")
      return setErrorData({ ...errorData, cabin_class: true });
    PostOffer(formData, (res) => {
      console.log(res.data.data, "<<<this is response");
      if (res.success) {
        setshowLoader(false);
        GetOffersById(res.data.data.id, (offerRes) => {
          console.log(offerRes, "<<< this is offers");
          setOffersData(offerRes?.data?.data);
        });
      }
    });
  };
  console.log(OffersData, "<<<this is response");

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
  ];
  return (
    <div className="bg-common">
      <ShowAlert
        show={showAlert.show}
        message={showAlert.message}
        severity={showAlert.severity}
        toggle={showAlert.toggle}
      />
      {/* <EnquiryData
        from={origin}
        to={destination}
        departure_date={departure_date}
      /> */}
      <div className="fligh-detail-cover">
        <div className="flight-detail-filter">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Airport}
            value={formData.origin}
            onChange={(e, value) => {
              console.log(value, "<<<this is e");
              handleChange({ target: { name: "origin", value: value.iata } });
            }}
            style={{
              width: "80%",
              boxSizing: "border-box",
            }}
            renderInput={(params) => {
              // console.log(params);
              return <TextField {...params} label="Movie" />;
            }}
          />
          <Autocomplete
            disablePortal
            // error={formData.destination}
            id="combo-box-demo"
            options={Airport}
            value={formData.destination}
            onChange={(e, value) => {
              console.log(value, "<<<this is e");
              handleChange({
                target: { name: "destination", value: value.iata },
              });
            }}
            style={{
              width: "80%",
              boxSizing: "border-box",
            }}
            renderInput={(params) => {
              // console.log(params);
              return <TextField {...params} label="Movie" />;
            }}
          />
          {/* {errorData.destination && <div>Origin is required</div>} */}

          <TextField
            error={errorData.departure_date}
            style={{ width: "80%", boxSizing: "border-box" }}
            id="outlined-error"
            label="Departure date"
            name="departure_date"
            type="date"
            value={formData.departure_date}
            // placeholder="Departure date"
            onChange={(e) => handleChange(e)}
            // defaultValue="Hello World"
          />

          <FormControl variant="standard" sx={{ minWidth: "80%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Cabin class
            </InputLabel>
            <Select
              // error={true}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formData.cabin_class}
              name="cabin_class"
              onChange={handleChange}
              label="Cabin Class"
              defaultValue={formData.cabin_class}
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium_economy">Primary Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={handleSubmit}
            variant="contained"
            // color="success"
            style={{
              width: "90%",
              height: "2.5rem",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          >
            Submit
          </Button>
          {/* <img
            src={AdCards.flight_ad}
            // width="100%"
            // height="100%"
            className="filter-ad"
            // style={{ objectFit: "contain" }}
          /> */}
        </div>
        <div className="flight-detail-right-cover">
          <div className="fs23 text-500">All Available Flights</div>
          {!showLoader &&
            OffersData?.map((item) => {
              return <FlightShortDetails item={item} />;
            })}
          {showLoader && <ShowLoader />}
        </div>
        <div className=" support-cover">
          <ImageText src={AdCards.support} text="24/7 Live support" />
          <ImageText
            src={AdCards.savemoney}
            text="Free Cancelation within 24 hours"
          />
          <ImageText src={AdCards.pound} text="Big savings" />
        </div>
      </div>
    </div>
  );
}
export const ImageText = ({ src, text }) => {
  console.log(src, "<<< this is res");
  return (
    <div className="support-row">
      <img src={src} width="40px" height="40px" />
      <div style={{ marginLeft: "1rem", fontSize: "14px " }}> {text}</div>
    </div>
  );
};

export default FlightOffer;
