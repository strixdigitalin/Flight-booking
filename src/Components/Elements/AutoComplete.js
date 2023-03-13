import { MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getAirPorts } from "../../Utils/API/Airports";
import DefVariables from "../../Utils/DefVariables";
import Airports from "../../Utils/Flight/Airports.json";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { CallSplitSharp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AutoCompleteInputFrom({
  placeholder = "Search City",
  DropDownOption = DefVariables.cities,
  dropRefFrom,
  name,
  handleChange,
  value,
  id,
}) {
  const [AllValues, setAllValues] = useState([]);
  const [FilteredValues, setFilteredValues] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedName, setSelectedName] = useState("");
  useEffect(() => {
    // if (inputValue?.trim() != "") {
    //   setFilteredValues(DropDownOption);
    //   getAirPorts(inputValue, (res) => {
    //     console.log(res, "<<< this is input airports ");
    //     if (res.success) {
    //       setFilteredValues(res.data.data);
    //     }
    //   });
    // }
  }, []);

  const onTextChange = (e) => {
    const text = e.target.value;
    dropRefFrom.current.style.display = "block";
    setInputValue(text);
    getAirPorts(text, (res) => {
      console.log(res.data.data, "<<< this is input airports ");
      if (res.success) {
        setFilteredValues(res.data.data);
      }
    });
  };

  return (
    <div className="outer-auto">
      <div className="bold" style={{ fontSize: "20px" }}>
        From
      </div>
      {selectedName != "" && (
        <Typography textAlign="center">{selectedName}</Typography>
      )}
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
                  setInputValue(item?.iata_code);
                  setSelectedName(item.name);
                  handleChange(name, item?.iata_code);
                }}
              >
                {item?.name} ({item?.iata_code})
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
  const [AllValues, setAllValues] = useState([]);
  const [FilteredValues, setFilteredValues] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // useState
  const [inputValue2, setInputValue2] = useState("");
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    // if (inputValue?.trim() != "") {
    //   setFilteredValues(DropDownOption);
    //   getAirPorts(inputValue, (res) => {
    //     console.log(res, "<<< this is input airports ");
    //     if (res.success) {
    //       setFilteredValues(res.data.data);
    //     }
    //   });
    // }
  }, [inputValue]);

  const onTextChange = (e) => {
    const text = e.target.value;
    setInputValue(text);
    // setInputValue2(text)
    dropRefTo.current.style.display = "block";
    getAirPorts(text, (res) => {
      console.log(res, "<<< this is input airports ");
      if (res.success) {
        setFilteredValues(res.data.data);
      }
    });
  };
  console.log(FilteredValues, "<<< this is filtered values");

  return (
    <div className="outer-auto">
      <div className="bold" style={{ fontSize: "20px" }}>
        To
      </div>
      {selectedName != "" && (
        <Typography textAlign="center">{selectedName}</Typography>
      )}
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
                  setInputValue(item.iata_code);
                  setSelectedName(item.name);
                  setInputValue2(`${item.name}`);

                  handleChange(name, item.iata_code);
                }}
              >
                {item.name} ({item.iata_code})
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const CustomSearchBox = ({
  selectedValue,
  setSelectedValue,
  placeholder,
}) => {
  // const [selectedValue, setSelectedValue] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [dropDownValue, setDropDownValue] = useState([]);
  const dropRef = useRef(0);
  // const [showDrop, setshowDrop] = useState(second)
  const onTextChange = (e) => {
    dropRef.current.style.display = "block";

    const text = e.target.value;
    setInputValue(text);
    // setInputValue2(text)
    getAirPorts(text, (res) => {
      console.log(res, "<<< this is input airports ");
      if (res.success) {
        setDropDownValue(res.data.data);
      }
    });
  };
  window.addEventListener("click", function (event) {
    let { className } = event.target;
    if (className != "dropdownoption") {
      console.log("this i not ", className);
      dropRef.current.style.display = "none";
    }
  });
  console.log(inputValue, " this is input value  ");
  return (
    <div className="auto-inputbox">
      <input
        onChange={onTextChange}
        value={inputValue}
        placeholder={placeholder}
        className="input-boxform"
      />
      {/* <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={onTextChange}
        value={inputValue}
        className="input-boxform"
      /> */}
      <div className="dropdownoption" ref={dropRef}>
        {dropDownValue.map((item, key) => {
          return (
            <Typography
              className="singlecity"
              key={key}
              onClick={() => {
                setSelectedValue({
                  name: item.name,
                  iata_code: item.iata_code,
                });
                setInputValue(
                  "(" + item.iata_code + ") " + item.city_name
                    ? item.city_name
                    : item.name
                );
              }}
            >
              {item.iata_code} {item.name}
            </Typography>
          );
        })}
      </div>
    </div>
  );
};

export const DatePickerComponent = ({ date, setDate }) => {
  return (
    <div className="coverdate">
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => {
          console.log(e.target.value, " <<<< this is etarget value");
          setDate(e.target.value);
        }}
      />
    </div>
  );
};
export const SelectClass = ({ cabinClass, setCabinClass }) => {
  return (
    <Select
      style={{ width: "12rem" }}
      className="waybutt"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Class"
      value={cabinClass}
      onChange={(e) => {
        setCabinClass(e.target.value);
      }}
    >
      <MenuItem value={"economy"}>Economy</MenuItem>
      <MenuItem value={"business"}>Business</MenuItem>
      <MenuItem value={"premium_economy"}>Premium Economy</MenuItem>
      <MenuItem value={"first"}>First </MenuItem>
    </Select>
  );
};

export default AutoCompleteInputFrom;
