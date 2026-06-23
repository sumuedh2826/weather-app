var LAST_CITY_STORAGE_KEY = "weather-app-last-city";

function saveLastCity(cityName) {
  var trimmed = cityName.trim();
  if (!trimmed) {
    return;
  }
  localStorage.setItem(LAST_CITY_STORAGE_KEY, trimmed);
}

function getLastCity() {
  var saved = localStorage.getItem(LAST_CITY_STORAGE_KEY);
  return saved ? saved.trim() : "";
}

function clearLastCity() {
  localStorage.removeItem(LAST_CITY_STORAGE_KEY);
}