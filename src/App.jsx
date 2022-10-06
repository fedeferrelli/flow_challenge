import React, { useState, useEffect } from "react";
import apiCall from "./api";
import Loading from "./Components/Loading";
import Selector from "./Components/Selector";
import CurrentWeather from "./Components/CurrentWeather";

function App() {
  const [data, setData] = useState(undefined);
  const [currentPosition, setCurrentPosition] = useState();
  const [citiToShow, setCitiToShow] = useState("Tu ubicación");
  const [showLoading, setShowLoading] = useState(true);

  const CITIES = [
    {
      name: "Tu ubicación",
      id: "ubicacion",
      lat: currentPosition?.lat,
      lon: currentPosition?.lon,
    },
    { name: "Barcelona", id: "bcn", lat: 41.38879, lon: 2.15899 },
    { name: "Necochea", id: "neco", lat: -38.560386, lon: -58.8263165 },
    { name: "Mar del Plata", id: "mdq", lat: -38.0172131, lon: -57.74062 },
    { name: "Buenos Aires", id: "caba", lat: -34.6154611, lon: -58.5733849 },
    { name: "Córdoba", id: "cba", lat: -31.399084, lon: -64.334431 },
  ];

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

          <CurrentWeather currentWeather={data[0]}/>

          {data.map((day) => (
            <div key={day.dt}>
              {day.dt} {day.temp}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
