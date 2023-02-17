import React from "react";

const WeatherTab = (props) => {
  var temp ;
  if (props.unit === "F") {
    temp = (props.temp * 9/5) + 32
    temp = temp + "°F";
  } else {
    temp = props.temp;
    temp = temp + "°C";
  }
  return (
    <div
      style={{
        backgroundColor: "wheat",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        padding:"30px 60px 30px 60px",
        marginBottom:"5vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
          <h3 style={{ display: "inline" }}>{props.city}</h3>
        <div>
          <img src={props.icon} alt="icon"></img>
        </div>
        <div style={{margin:"10px"}}>
          <h4>
            Temperature - {temp}
          </h4>
          <h4>
            Humidity - {props.humidity}
          </h4>
          <h4>
            Speed - {props.speed}
          </h4>
        </div>
      </div>


      <div>
        
        <h3 style={{ display: "inline" }}>Weather </h3> on
        <h4>{props.localtime.substr(0, 10)}</h4>
      </div>
    </div>
  );
};

export default WeatherTab;
