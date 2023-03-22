import React from "react";
import BookingCard from "../../Components/BookingCard";
import AirPorts from "../../Utils/Flight/Airports.json";

function index({ trans }) {
  return (
    <div>
      <BookingCard trans={trans} />
    </div>
  );
}

export default index;
