import React, { useEffect, useRef, useState } from "react";
import DefVariables from "../../Utils/DefVariables";
import Airports from "../../Utils/Flight/Airports.json";

function AutoCompleteInputFrom({
  placeholder = "Search City",
  DropDownOption = DefVariables.cities,
  dropRefFrom,
  name,
  handleChange,
  value,
  id,
}) {
  const [AllValues, setAllValues] = useState(Airports);
  const [FilteredValues, setFilteredValues] = useState(DropDownOption);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setFilteredValues(DropDownOption);
  }, []);

  const onTextChange = (e) => {
    const text = e.target.value;

    console.log(dropRefFrom.current.style);

    setInputValue(text);
    dropRefFrom.current.style.display = "block";
    if (!text) return setFilteredValues(AllValues);
    if (text.trim() == "") return setFilteredValues(AllValues);
    setFilteredValues(
      AllValues.filter((item) => {
        let val1 = item.name.toLocaleLowerCase();
        let val2 = text.toLocaleLowerCase();
        if (val1.match(val2)) {
          return true;
        }
      })
    );
  };

  return (
    <div className="outer-auto">
      <div className="bold" style={{ fontSize: "25px" }}>
        From
      </div>
      <div className="auto-cover">
        <input
          className="auto-input"
          placeholder={placeholder}
          onChange={onTextChange}
          value={inputValue}
        />
        <div className="auto-drop" ref={dropRefFrom}>
          {FilteredValues.map((item, key) => {
            return (
              <div
                key={key}
                className="drop-options"
                onClick={() => {
                  dropRefFrom.current.style.display = "none";
                  setInputValue(item?.iata);
                  handleChange(name, item?.iata);
                }}
              >
                {item?.name} ({item?.country})
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export function AutoCompleteInputTo({
  placeholder = "Search City",
  DropDownOption = DefVariables.cities,
  dropRefTo,
  name,
  handleChange,
  value,
  id,
}) {
  const [AllValues, setAllValues] = useState(Airports);
  const [FilteredValues, setFilteredValues] = useState(DropDownOption);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setFilteredValues(DropDownOption);
  }, []);

  const onTextChange = (e) => {
    const text = e.target.value;

    console.log(dropRefTo.current.style);

    setInputValue(text);
    dropRefTo.current.style.display = "block";
    if (!text) return setFilteredValues(AllValues);
    if (text.trim() == "") return setFilteredValues(AllValues);
    setFilteredValues(
      AllValues.filter((item) => {
        let val1 = item.name.toLocaleLowerCase();
        let val2 = text.toLocaleLowerCase();
        if (val1.match(val2)) {
          return true;
        }
      })
    );
  };

  return (
    <div className="outer-auto">
      <div className="bold" style={{ fontSize: "25px" }}>
        To
      </div>
      <div className="auto-cover">
        <input
          className="auto-input"
          placeholder={placeholder}
          onChange={onTextChange}
          value={inputValue}
        />
        <div className="auto-drop" ref={dropRefTo}>
          {FilteredValues.map((item, key) => {
            return (
              <div
                key={key}
                className="drop-options"
                onClick={() => {
                  dropRefTo.current.style.display = "none";
                  setInputValue(item.iata);
                  handleChange(name, item.iata);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AutoCompleteInputFrom;
