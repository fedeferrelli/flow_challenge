import React, { useState, useEffect } from "react";
import apiCall from "./api";
import Loading from "./Components/Loading";
import Selector from "./Components/Selector";
import CurrentWeather from "./Components/CurrentWeather";
import Forecast from "./Components/Forecast";

function App() {
  const [data, setData] = useState(undefined);
  const [currentPosition, setCurrentPosition] = useState();
  const [citiToShow, setCitiToShow] = useState("Tu ubicación");
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const current = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      setCurrentPosition(current);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const dataApi = await apiCall.fetch(currentPosition);

      setData(dataApi);
      setShowLoading(false);
    };
    {
      typeof currentPosition !== "undefined" && getData();
    }
  }, [currentPosition]);

  return (
    <div>
      {showLoading ? (
        <Loading citiToShow={citiToShow} />
      ) : (
        <div>
          <Selector
            citiToShow={citiToShow}
            setCitiToShow={setCitiToShow}
            setData={setData}
            currentPosition={currentPosition}
            setShowLoading={setShowLoading}
          />

          <CurrentWeather currentWeather={data[0]} />

          <Forecast forecast={data.slice(1)} />
        </div>
      )}
    </div>
  );
}

export default App;
