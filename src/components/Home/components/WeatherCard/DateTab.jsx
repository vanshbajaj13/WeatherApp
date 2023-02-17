import React from "react";
import Card from "react-bootstrap/Card";

const DateTab = (props) => {
  var date = new Date(props.date);
  date = date.toLocaleDateString();
  var temp ;
  if (props.unit === "F") {
    temp = (props.avgTemp * 9/5) + 32
    temp = temp + "°F";
  } else {
    temp = props.avgTemp;
    temp = temp + "°C";
  }
  return (
    <div
      style={{
        display: "inline-block",
        margin: "10px",
        marginLeft:"5%",
      }}
      onClick={()=>{props.dateModal(props.index)}}
    >
      <Card style={{ width: "10rem",backgroundColor:"wheat",height:"272px" }}>
          <Card.Title >{date}</Card.Title>
        <Card.Img variant="top" src={props.icon} />
        <Card.Body>
          <Card.Text>Avg temp = {temp}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DateTab;
