import React from "react";
import DatePicker from "./DatePicker";

function Departure({ text = "Departure", name, handleChange, value }) {
  return (
    <div className="departure">
      <div className="departure-text bold">{text} </div>
      <br />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <input
          type="date"
          className="date-picker"
          style={
            {
              // borderRa
            }
          }
          value={value}
          onChange={(e) => {
            handleChange(name, e.target.value);
          }}
        />
        {/* <DatePicker value={departureDate} setValue={setDepartureDate} /> */}
      </div>
    </div>
  );
}

function ReturnDate({ text = "Return", name, handleChange, value }) {
  return (
    <div className="departure">
      <div className="departure-text bold">{text} </div>
      <br />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <input
          type="date"
          className="date-picker"
          value={value}
          onChange={(e) => {
            handleChange(name, e.target.value);
          }}
        />
        {/* <DatePicker value={departureDate} setValue={setDepartureDate} /> */}
      </div>
    </div>
  );
}
export { ReturnDate };

export default Departure;
