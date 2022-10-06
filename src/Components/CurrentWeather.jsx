import React from "react";

function CurrentWeather({ currentWeather }) {
  console.log(currentWeather);

  const {
    dt: date,
    temp: currentTemp,
    max: maxTemp,
    mix: minTemp,
    weather,
  } = currentWeather;

  return (
    <div>
      <div>
        current: {date} {weather}
      </div>
    </div>
  );
}

export default CurrentWeather;
