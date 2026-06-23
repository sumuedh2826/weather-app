var GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
var FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

function geocodeCity(cityName) {
  var query = cityName.trim();
  if (!query) {
    return Promise.reject(new Error("EMPTY_CITY"));
  }

  var params = new URLSearchParams({
    name: query,
    count: "1",
    language: "en",
    format: "json",
  });

  return fetch(GEOCODING_URL + "?" + params.toString())
    .then(function (response) {
      if (!response.ok) {
        throw new Error("NETWORK_ERROR");
      }
      return response.json();
    })
    .then(function (data) {
      if (!data.results || data.results.length === 0) {
        throw new Error("CITY_NOT_FOUND");
      }

      var place = data.results[0];
      return {
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude,
      };
    });
}

function fetchWeather(latitude, longitude) {
  var params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "surface_pressure",
    ].join(","),
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "5",
  });

  return fetch(FORECAST_URL + "?" + params.toString()).then(function (response) {
    if (!response.ok) {
      throw new Error("NETWORK_ERROR");
    }
    return response.json();
  });
}

function fetchWeatherByCity(cityName) {
  return geocodeCity(cityName).then(function (location) {
    return fetchWeather(location.latitude, location.longitude).then(function (weather) {
      return {
        location: location,
        weather: weather,
      };
    });
  });
}