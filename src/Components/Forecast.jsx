import React from "react";

function Forecast({ forecast }) {
  const dayStringToShow = (index, day) => {
    if (index === 0) return "mañana";
    else if (index === 1) return "pasado mañana";
    else return day;
  };

  return (
    <div>
      {forecast.map((day, i) => (
        <ul key={day.dt}>
          {dayStringToShow(i, day.dt)}, {day.weather}
        </ul>
      ))}
    </div>
  );
}

export default Forecast;
