import React from "react";
import { DestinationCard } from "./Components";

function EnquiryData({ from, to, departure_date }) {
  return (
    <div className="bg-shade-blue wrapper">
      <div className="enquiry-cards">
        <DestinationCard heading="From" value={from} />
        <DestinationCard heading="To" value={to} />
        <DestinationCard heading="Depart" value={departure_date} />
        <DestinationCard heading="Class" value="1, Adult, Economy " />
      </div>
    </div>
  );
}

export default EnquiryData;
