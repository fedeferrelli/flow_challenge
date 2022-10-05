const apiCall = {
  fetch: async (city) => {
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&lang=es&appid=${API_KEY}`
    );

    const response = await request.json();

    const dataWeather = [];

    dataWeather.push({
      dt: new Date(response.current.dt * 1000).toLocaleDateString("ES-ar", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      temp: Math.round(response.current.temp * 10) / 10,
      tempMax: Math.round(response.daily[0].temp.max * 10) / 10,
      tempMin: Math.round(response.daily[0].temp.min * 10) / 10,
      weather: response.current.weather[0].description,
    });

    response.daily.slice(1, 6).map((e) => {
      dataWeather.push({
        dt: new Date(e.dt * 1000).toLocaleDateString("ES-ar", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        temp: Math.round(e.temp.day * 10) / 10,
        tempMax: e.temp.max,
        tempMin: e.temp.min,
        weather: e.weather[0].description,
      });
    });

    return dataWeather;
  },
};

export default apiCall;
