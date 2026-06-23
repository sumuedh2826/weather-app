function resetApplicationState() {
  var searchInput = document.getElementById("city-search-input");
  var errorEl = document.getElementById("search-error");
  var weatherCardEl = document.getElementById("weather-card");
  var forecastSectionEl = document.getElementById("forecast-section");
  var forecastStripEl = document.getElementById("forecast-strip");
  var insightsSectionEl = document.getElementById("insights-section");
  var insightsListEl = document.getElementById("insights-list");

  var cityNameEl = document.getElementById("city-name");
  var dateTextEl = document.getElementById("current-date-text");
  var temperatureDisplayEl = document.getElementById("temperature-display");
  var temperatureValueEl = document.getElementById("temperature-value");
  var conditionIconEl = document.getElementById("condition-icon");
  var conditionLabelEl = document.getElementById("condition-label");
  var humidityValueEl = document.getElementById("humidity-value");
  var windValueEl = document.getElementById("wind-value");
  var pressureValueEl = document.getElementById("pressure-value");

  if (searchInput) {
    searchInput.value = "";
  }

  if (errorEl) {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  if (cityNameEl) {
    cityNameEl.textContent = "—";
  }
  if (dateTextEl) {
    dateTextEl.textContent = "—";
  }
  if (temperatureValueEl) {
    temperatureValueEl.textContent = "—";
  }
  if (temperatureDisplayEl) {
    temperatureDisplayEl.classList.remove(
      "temperature--cold",
      "temperature--mild",
      "temperature--hot"
    );
    temperatureDisplayEl.classList.add("temperature--mild");
  }
  if (conditionIconEl) {
    conditionIconEl.textContent = "—";
  }
  if (conditionLabelEl) {
    conditionLabelEl.textContent = "Search for a city";
  }
  if (humidityValueEl) {
    humidityValueEl.textContent = "—";
  }
  if (windValueEl) {
    windValueEl.textContent = "—";
  }
  if (pressureValueEl) {
    pressureValueEl.textContent = "—";
  }

  if (weatherCardEl) {
    weatherCardEl.classList.add("weather-card--empty");
    weatherCardEl.hidden = true;
  }

  if (forecastStripEl) {
    forecastStripEl.innerHTML = "";
  }
  if (forecastSectionEl) {
    forecastSectionEl.hidden = true;
  }

  if (insightsListEl) {
    insightsListEl.innerHTML = "";
  }
  if (insightsSectionEl) {
    insightsSectionEl.hidden = true;
  }
}