import React from "react";
import { DestinationCard } from "./Components";

function EnquiryData() {
  return (
    <div className="bg-shade-blue wrapper">
      <div className="enquiry-cards">
        <DestinationCard heading="From" value="Delhi" />
        <DestinationCard heading="To" value="Banglore" />
        <DestinationCard heading="Depart" value="2023-1-26" />
        <DestinationCard heading="Class" value="1, Adult, Economy " />
      </div>
    </div>
  );
}

export default EnquiryData;
