import React, { useState } from "react";
import {
  CustomSearchBox,
  DatePickerComponent,
  MultiCityCustomSearchBox,
  MultiCityDatePickerComponent,
} from "../../Components/Elements/AutoComplete";
import MemberCount, {
  MemberCountMulti,
} from "../../Components/Elements/MemberCount";
import { Button } from "@mui/material";
import leftright from "../../assets/Frontcard/left-right.png";
import { useNavigate } from "react-router";
function MultiCity({ cabinClass }) {
  const Navigate = useNavigate();

  const [membersCount, setMembersCount] = useState({
    adult: 1,
    child: 0,
  });
  const [multiCities, setMultiCities] = useState([
    {
      origin: "",
      destination: "",
      departure_date: "",
    },
  ]);
  const handleMultiCityOrigin = (city, index) => {
    console.log(city, "<<this is city");
    let currMul = multiCities;
    currMul[index] = { ...currMul[index], origin: city.iata_code };
    setMultiCities(currMul);
  };
  const handleMultiCityDestination = (city, index) => {
    let currMul = multiCities;
    currMul[index] = { ...currMul[index], destination: city.iata_code };
    setMultiCities(currMul);
  };
  const handleMulticityDate = (date, index) => {
    console.log(date, "<<<this is date");
    let currMul = multiCities;
    currMul[index].departure_date = date;
    setMultiCities(currMul);
  };
  console.log(multiCities, "<<<thisismulticity");
  const handleMemberCount = (type, sign) => {
    if (sign == "+") {
      if (type == "adult") {
        setMembersCount({ ...membersCount, adult: membersCount.adult + 1 });
      }
      if (type == "child") {
        setMembersCount({ ...membersCount, child: membersCount.child + 1 });
      }
    }
    if (sign == "-") {
      if (type == "adult" && membersCount.adult > 1) {
        setMembersCount({ ...membersCount, adult: membersCount.adult - 1 });
      }
      if (type == "child" && membersCount.child > 0) {
        setMembersCount({ ...membersCount, child: membersCount.child - 1 });
      }
    }
  };

  const handleSubmit = () => {
    console.log(multiCities, "<<this is cabinclass");
    // return null;
    Navigate(
      `/flights2/${JSON.stringify({
        slices: multiCities,
        oneWay: null,
        cabinClass,
        membersCount,
      })}`
    );
    // PostOffer
  };
  const handleAddNewMember = () => {
    let checkEmpty = multiCities.filter((item) => {
      if (
        item.origin == "" ||
        item?.departure_date == "" ||
        item?.destination == ""
      )
        return true;
    });
    if (checkEmpty.length) return null;
    else {
      setMultiCities([
        ...multiCities,
        { origin: "", destination: "", departure_date: "" },
      ]);
    }
  };
  console.log(multiCities, "<<<thisismultic");
  return (
    <>
      {" "}
      {multiCities?.map((item, index) => {
        return (
          <div className="booking-form">
            {" "}
            <MultiCityCustomSearchBox
              selectedValue={""}
              placeholder="Origin"
              setSelectedValue={(city) => handleMultiCityOrigin(city, index)}
            />
            <img src={leftright} width="40px" />
            <MultiCityCustomSearchBox
              placeholder="Destination"
              selectedValue={""}
              setSelectedValue={(city) =>
                handleMultiCityDestination(city, index)
              }
            />
            <MultiCityDatePickerComponent
              date={item?.departure_date}
              setDate={(date) => handleMulticityDate(date, index)}
            />
            {index == multiCities.length - 1 ? (
              <MemberCount
                membersCount={membersCount}
                handleMemberCount={handleMemberCount}
              />
            ) : (
              <div style={{ opacity: "0" }}>
                <MemberCountMulti
                  membersCount={membersCount}
                  handleMemberCount={handleMemberCount}
                />
              </div>
            )}
          </div>
        );
      })}{" "}
      <Button variant="outlined" onClick={handleAddNewMember}>
        Add New +
      </Button>
      <Button variant="contained" className="searchButt" onClick={handleSubmit}>
        Search
      </Button>{" "}
    </>
  );
}

export default MultiCity;
