import React from "react";
import DatePicker from "./DatePicker";

function Departure() {
  return (
    <div className="departure">
      <div className="departure-text bold">Departure </div>
      <br />
      <div>
        <DatePicker />
      </div>
    </div>
  );
}

export default Departure;
