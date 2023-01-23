import React from "react";

export const DestinationCard = ({ heading, value }) => {
  return (
    <div className="fligh-destination">
      <span className="fs17 text-400">{heading}</span>
      <br />
      <span className="fs15 text-b">{value}</span>
    </div>
  );
};

export const FlightShortDetails = () => {
  const PlaceTime = ({ time, place }) => {
    return (
      <div className="text-c">
        {time}
        <br />
        {place}
      </div>
    );
  };
  return (
    <div className="flight-short-card">
      <div>Logo</div>
      <PlaceTime time="7:10" place="Delhi" />
      <div>Stops</div>
      <PlaceTime time="7:10" place="Banglore" />
      <div>4999</div>
    </div>
  );
};

// export default DestinationCard;
