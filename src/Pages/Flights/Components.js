import { Button, Grid } from "@mui/material";
import React from "react";
import { getDateTimeFun } from "../../Utils/Flight/CommonFunctions";
import { LOCAL_STORE } from "../../Utils/API/index";
import { useNavigate } from "react-router-dom";

export const DestinationCard = ({ heading, value }) => {
  return (
    <div className="fligh-destination">
      <span className="fs17 text-400">{heading}</span>
      <br />
      <span className="fs15 text-b">{value}</span>
    </div>
  );
};

export const FlightShortDetails = ({ item  }) => {
  console.log(item, "<<<< thisisitem");
  const slice = item?.slices[0];
  const navigate = useNavigate();
  const segment = slice?.segments[0];
  console.log(segment, "<<<<thisisslice");
  const PlaceTime = ({ time, place }) => {
    return (
      <div className="text-c fligh-short-inner">
        {getDateTimeFun(time).time}
        <br />
        {place}
      </div>
    );
  };
  const clickBookNow = async () => {
    await LOCAL_STORE.saveFlightData(item);
    navigate("/booking/" + item.id);
  };

  return (
    <div className="card-cover">
      <Grid container>
        <Grid md={10}></Grid>
        <Grid md={2}>
          <Button
            variant="contained"
            style={{ margin: "0px 0px 5px 0px" }}
            onClick={clickBookNow}
          >
            Book Now
          </Button>
        </Grid>
      </Grid>
      <div className="flight-short-card ">
        {/* {segment?.passengers[0]?.cabin_class} */}

        <div className=" fligh-short-inner">
          <img
            src={segment?.operating_carrier?.logo_symbol_url}
            width="70px"
            height="50px"
          />
        </div>
        <div className="fligh-short-inner">
          <h4>{segment?.operating_carrier?.name}</h4>
        </div>
        <PlaceTime
          time={segment?.departing_at}
          place={slice?.origin?.city_name}
        />
        <div className="dflexcol fligh-short-inner">
          <div className="fs12 text-b colblue">
            {segment?.duration.replace(/^.{2}/g, "")}
          </div>
          <div
            style={{ width: "100%", border: "1px solid rgb(32, 173, 255)" }}
          ></div>
        </div>
        <PlaceTime
          time={segment.arriving_at}
          place={slice?.destination?.city_name}
        />
        <div
          className="fligh-short-inner"
          style={{ fontWeight: "bold", fontSize: "25px" }}
        >
          $ {item?.total_amount}{" "}
        </div>
      </div>
    </div>
  );
};

// export default DestinationCard;
