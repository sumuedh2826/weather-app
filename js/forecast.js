function renderForecastStrip(result) {
  var weather = result.weather;
  var daily = weather.daily;
  var stripEl = document.getElementById("forecast-strip");
  var sectionEl = document.getElementById("forecast-section");

  if (!stripEl || !sectionEl || !daily || !daily.time) {
    return;
  }

  stripEl.innerHTML = "";

  var dayCount = Math.min(5, daily.time.length);

  for (var i = 0; i < dayCount; i++) {
    var weatherInfo = getWeatherInfo(daily.weather_code[i]);
    var dayLabel = formatForecastDayLabel(daily.time[i], i, weather.timezone);
    var highTemp = Math.round(daily.temperature_2m_max[i]);
    var lowTemp = Math.round(daily.temperature_2m_min[i]);

    var card = document.createElement("article");
    card.className = "forecast-card";
    if (i === 0) {
      card.classList.add("forecast-card--today");
    }

    card.innerHTML =
      '<span class="forecast-day">' + dayLabel + "</span>" +
      '<span class="forecast-icon" aria-hidden="true">' + weatherInfo.icon + "</span>" +
      '<span class="forecast-temps">' +
      '<span class="temp-high">' + highTemp + "°</span>" +
      '<span class="temp-low">' + lowTemp + "°</span>" +
      "</span>";

    stripEl.appendChild(card);
  }

  sectionEl.hidden = false;
}