import React from "react";
import { AdCards } from "../../Utils/Flight/Image";
import { FlightShortDetails } from "./Components";
import EnquiryData from "./EnquiryData";

function index() {
  return (
    <div className="bg-common">
      <EnquiryData />
      <div className="fligh-detail-cover">
        <div className="flight-detail-filter">
          <img
            src={AdCards.flight_ad}
            // width="100%"
            // height="100%"
            className="filter-ad"
            // style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flight-detail-right-cover">
          <div className="fs23 text-500">All Available Flights</div>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return <FlightShortDetails />;
          })}
        </div>
      </div>
    </div>
  );
}

export default index;
