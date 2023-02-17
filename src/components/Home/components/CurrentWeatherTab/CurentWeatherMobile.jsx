import React from "react";
import { Card } from "react-bootstrap";

const CurentWeatherMobile = (props) => {
  var temp;
  if (props.unit === "F") {
    temp = (props.temp * 9) / 5 + 32;
    temp = temp + "°F";
  } else {
    temp = props.temp;
    temp = temp + "°C";
  }
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        display: "flex",
        flexDirection:"row",
      }}
    >
      <Card style={{ width: '100%',backgroundColor: "wheat", }}>
        <p style={{fontSize:"100px",textAlign:"center"}}>{props.city}
        {temp}</p>
      <Card.Img variant="top" src={props.icon} alt="icon" />
      <Card.Body>
      <h1>{props.localtime.substr(0, 10)}</h1>
        <Card.Text>
        Humidity = {props.humidity}
        </Card.Text>
        <Card.Text>
        wind = {props.speed}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
};

export default CurentWeatherMobile;
