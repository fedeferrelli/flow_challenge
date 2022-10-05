import React, { useState, useEffect } from "react";
import apiCall from "./api";

function App() {
  const [data, setData] = useState(undefined);
  const [currentPosition, setCurrentPosition] = useState();
  const [citiToShow, setCitiToShow] = useState("Tu ubicación");

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
    };
    {
      typeof currentPosition !== "undefined" && getData();
    }
  }, [currentPosition]);

  const handleCityChange = async (citiId) => {
    const citi = CITIES.find((citi) => citi.id === citiId);

    const dataApi = await apiCall.fetch(citi);

    setData(dataApi);
    setCitiToShow(citi.name);
  };

  return (
    <div>
      {typeof data === "undefined" ? (
        <h1>flow challenge</h1>
      ) : (
        <div>
          <select onChange={(e) => handleCityChange(e.target.value)}>
            <option value="">{citiToShow}</option>
            {CITIES.filter((citi) => citi.name !== citiToShow)
              .sort((citiPrev, citiNext) =>
                citiPrev.name.localeCompare(citiNext.name)
              )
              .map((citi) => (
                <option key={citi.id} value={citi.id}>
                  {citi.name}{" "}
                </option>
              ))}
          </select>

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
