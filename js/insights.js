function getUpcomingHourlyEntries(hourly, currentTime, maxCount) {
  var entries = [];
  var now = new Date(currentTime).getTime();

  for (var i = 0; i < hourly.time.length; i++) {
    if (new Date(hourly.time[i]).getTime() >= now) {
      entries.push({
        time: hourly.time[i],
        temperature: hourly.temperature_2m[i],
        weatherCode: hourly.weather_code[i],
      });

      if (entries.length >= maxCount) {
        break;
      }
    }
  }

  return entries;
}

function renderInsightsPanel(result) {
  var weather = result.weather;
  var hourly = weather.hourly;
  var current = weather.current;
  var listEl = document.getElementById("insights-list");
  var sectionEl = document.getElementById("insights-section");

  if (!listEl || !sectionEl || !hourly || !current) {
    return;
  }

  listEl.innerHTML = "";

  var entries = getUpcomingHourlyEntries(hourly, current.time, 6);

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var weatherInfo = getWeatherInfo(entry.weatherCode);
    var timeLabel = formatHourlyTime(entry.time, weather.timezone);
    var tempLabel = entry.temperature.toFixed(1) + "°C";

    var row = document.createElement("li");
    row.className = "insight-row";
    row.innerHTML =
      '<span class="insight-time">' + timeLabel + "</span>" +
      '<span class="insight-condition">' +
      '<span aria-hidden="true">' + weatherInfo.icon + "</span> " +
      weatherInfo.label +
      "</span>" +
      '<span class="insight-temp">' + tempLabel + "</span>";

    listEl.appendChild(row);
  }

  sectionEl.hidden = false;
}