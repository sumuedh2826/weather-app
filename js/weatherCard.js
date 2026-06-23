function getTemperatureAccentClass(temperature) {
  if (temperature < 15) {
    return "temperature--cold";
  }
  if (temperature > 30) {
    return "temperature--hot";
  }
  return "temperature--mild";
}

function formatCurrentDate(isoTime, timezone) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(isoTime));
}

function renderWeatherCard(result) {
  var location = result.location;
  var weather = result.weather;
  var current = weather.current;

  if (!current) {
    return;
  }

  var cityNameEl = document.getElementById("city-name");
  var dateTextEl = document.getElementById("current-date-text");
  var temperatureDisplayEl = document.getElementById("temperature-display");
  var temperatureValueEl = document.getElementById("temperature-value");
  var conditionIconEl = document.getElementById("condition-icon");
  var conditionLabelEl = document.getElementById("condition-label");
  var humidityValueEl = document.getElementById("humidity-value");
  var windValueEl = document.getElementById("wind-value");
  var pressureValueEl = document.getElementById("pressure-value");
  var weatherCardEl = document.getElementById("weather-card");

  if (
    !cityNameEl ||
    !dateTextEl ||
    !temperatureDisplayEl ||
    !temperatureValueEl ||
    !conditionIconEl ||
    !conditionLabelEl ||
    !humidityValueEl ||
    !windValueEl ||
    !pressureValueEl ||
    !weatherCardEl
  ) {
    return;
  }

  var weatherInfo = getWeatherInfo(current.weather_code);
  var temperature = Math.round(current.temperature_2m);
  var accentClass = getTemperatureAccentClass(temperature);

  cityNameEl.textContent = location.name + ", " + location.country;
  dateTextEl.textContent = formatCurrentDate(current.time, weather.timezone);

  temperatureValueEl.textContent = String(temperature);
  temperatureDisplayEl.classList.remove(
    "temperature--cold",
    "temperature--mild",
    "temperature--hot"
  );
  temperatureDisplayEl.classList.add(accentClass);

  conditionIconEl.textContent = weatherInfo.icon;
  conditionLabelEl.textContent = weatherInfo.label;

  humidityValueEl.textContent = Math.round(current.relative_humidity_2m) + "%";
  windValueEl.textContent = Math.round(current.wind_speed_10m) + " km/h";
  pressureValueEl.textContent = Math.round(current.surface_pressure) + " hPa";

  weatherCardEl.classList.remove("weather-card--empty");
  weatherCardEl.hidden = false;
}