import React, { useState, useEffect } from "react";
import apiCall from "./api";

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const dataApi = await apiCall.fetch({ lat: 41.38879, lon: 2.15899 });

      setData(dataApi);
    };
    getData();
  }, []);

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
