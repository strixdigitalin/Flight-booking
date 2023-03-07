import React from "react";
import DatePicker from "./DatePicker";

function Departure({ text = "Departure", name, handleChange, value }) {
  return (
    <div className="departure">
      <div className="departure-text bold">{text} </div>
      <br />
      <div>
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

export default Departure;
