import React from "react";
import DatePicker from "./DatePicker";

function Departure({ text = "Departure", departureDate, setDepartureDate }) {
  return (
    <div className="departure">
      <div className="departure-text bold">{text} </div>
      <br />
      <div>
        <DatePicker value={departureDate} setValue={setDepartureDate} />
      </div>
    </div>
  );
}

export default Departure;
