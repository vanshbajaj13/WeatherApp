import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const SearchBar = (props) => {
  const [cityName, setCityName] = useState("");
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "C", value: "C" },
    { name: "F", value: "F" },
  ];
  function handleChange(event) {
    setCityName(event.target.value);
  }

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "10vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "space-around",
        zIndex: "2",
      }}
    >
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-danger"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
              window.localStorage.setItem("unit", e.currentTarget.value);
              props.chnageUnit(e.currentTarget.value);
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={handleChange}
        style={{ width: "70%", padding: "5px", margin: "3vh 0 3vh 0" }}
      ></input>
      <button
        onClick={props.getCurrentLocation}
        style={{ margin: "3vh 0 3vh 0", overflow: "hidden" }}
      >
        USE My current location
      </button>
      <button
        onClick={() => {
          props.search(cityName);
          setCityName("");
        }}
        style={{ margin: "3vh 0 3vh 0" }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
