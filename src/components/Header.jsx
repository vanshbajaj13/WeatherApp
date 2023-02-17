import React from "react";
import { Container } from "react-bootstrap";
import Typewriter from "typewriter-effect";
const Header = () => {


  return (
      <div
      style={{
        backgroundColor: "black",
        height: "10vh",
        top: "0px",
        color: "white",
        textAlign:"center",
        position:"fixed",
        width:"100%",
        zIndex:"5",
        display:"flex",
      }}
    >   
    
    <Container >
    <h1 style={{paddingTop:"1rem"}}>

      <Typewriter 
        options={{loop:true}}
        onInit={(typewriter) => {
          typewriter

            .deleteAll()
            .typeString("WEATHER FORECAST")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Type city name")
            .deleteAll()
            .typeString("London")
            .deleteChars(6)
            .typeString("...")
            .deleteChars(3)
            .typeString("Paris")
            .start();
        }}
      />
    </h1>
    </Container>
    </div>
  );
};

export default Header;
