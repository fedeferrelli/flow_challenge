import React, { useState, useEffect } from "react";
import apiCall from "./api";

function App() {
  const [data, setData] = useState(undefined);
  const [currentPosition, setCurrentPosition] = useState();

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

  return (
    <div>
      {typeof data === "undefined" ? (
        <h1>flow challenge</h1>
      ) : (
        <div>
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
