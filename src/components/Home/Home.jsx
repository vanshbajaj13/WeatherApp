import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import Mobile from "./components/CurrentWeatherTab/CurentWeatherMobile";
import Desktop from "./components/CurrentWeatherTab/CurrentWeatherDesktop";
import DateTab from "./components/WeatherCard/DateTab";
import Spinner from "react-bootstrap/Spinner";
import { Alert } from "react-bootstrap";

const Home = () => {
  const [searchPop, setSearchPop] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ status: false, message: "" });

  useEffect(() => {
    if (window.localStorage.getItem("unit")) {
      setUnit(window.localStorage.getItem("unit"));
    }
    function handleResize() {
      if (window.innerWidth > 450) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const search = async (city) => {
    if (city === "") {
      setAlert({ status: true, message: "please enter city name" });
      setTimeout(() => {
        setAlert({ status: false, message: "" });
      }, 2000);
    } else {
      setLoading(true);
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=3758b049f8bf493ea4994825231602&q=${city}&days=10`
        )
        .then((response) => {
          setWeatherData(response.data.forecast.forecastday);
          setCurrentWeatherData(response.data);
          setShowWeather(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setAlert({ status: true, message: "Please try again" });
          setTimeout(() => {
            setAlert({ status: false, message: "" });
          }, 2000);
        });
    }
  };

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      setLoading(true);
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=3758b049f8bf493ea4994825231602&q=${lat},${long}&days=10`
        )
        .then((response) => {
          setWeatherData(response.data.forecast.forecastday);
          setCurrentWeatherData(response.data);
          setShowWeather(true);
          setLoading(false);
        }).catch(() => {
          setLoading(false);
          setAlert({ status: true, message: "Please try again" });
          setTimeout(() => {
            setAlert({ status: false, message: "" });
          }, 2000);
        });
    });
  }

  function dateModal(id) {
    setShowModal(true);
    setModalData(() => {
      return weatherData.filter((data, index) => {
        return id === index;
      });
    });
  }

  function chnageUnit(unit) {
    setUnit(unit);
  }

  var oldScrollY = window.scrollY;
  window.addEventListener("scroll", (event) => {
    var scrollDiff = oldScrollY - window.scrollY;
    if (scrollDiff > 7) {
      setSearchPop(true);
    } else if (scrollDiff < -7) {
      setSearchPop(false);
    }
    oldScrollY = window.scrollY;
  });

  return (
    <div>
      <div style={{ height: "10vh" }}></div>
      <CSSTransition in={searchPop} timeout={3000} classNames="searchBox">
        <SearchBar
          search={search}
          getCurrentLocation={getCurrentLocation}
          chnageUnit={chnageUnit}
        />
      </CSSTransition>
      <div style={{ height: "10vh"}}></div>
      {loading && (
        <div style={{ margin: "auto", width: "fit-content" }}>
          <Spinner />
        </div>
      )}
      {alert.status && (
        <Alert key="danger" variant="danger">
          {alert.message}
        </Alert>
      )}
      {showWeather &&
        (isMobile ? (
          <Mobile
            localtime={currentWeatherData.location.localtime}
            city={currentWeatherData.location.name}
            temp={currentWeatherData.current.temp_c}
            speed={currentWeatherData.current.wind_mph}
            humidity={currentWeatherData.current.humidity}
            icon={currentWeatherData.current.condition.icon}
            unit={unit}
          />
        ) : (
          <Desktop
            localtime={currentWeatherData.location.localtime}
            city={currentWeatherData.location.name}
            temp={currentWeatherData.current.temp_c}
            speed={currentWeatherData.current.wind_mph}
            humidity={currentWeatherData.current.humidity}
            icon={currentWeatherData.current.condition.icon}
            unit={unit}
          />
        ))}
      {isMobile && showModal && (
        <Mobile
          localtime={modalData[0].date}
          temp={modalData[0].day.avgtemp_c}
          speed={modalData[0].day.maxwind_mph}
          humidity={modalData[0].day.avghumidity}
          icon={modalData[0].day.condition.icon}
          unit={unit}
        />
      )}
      {showWeather &&
        weatherData.map((card, index) => {
          return (
            <DateTab
              key={index}
              index={index}
              date={card.date}
              icon={card.day.condition.icon}
              avgTemp={card.day.avgtemp_c}
              dateModal={dateModal}
              unit={unit}
            />
          );
        })}
      {showModal && !isMobile && (
        <Desktop
          localtime={modalData[0].date}
          temp={modalData[0].day.avgtemp_c}
          speed={modalData[0].day.maxwind_mph}
          humidity={modalData[0].day.avghumidity}
          icon={modalData[0].day.condition.icon}
          unit={unit}
        />
      )}
      <div style={{ margin: "30px" }}></div>
    </div>
  );
};

export default Home;
