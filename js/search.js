(function () {
  var searchInput = document.getElementById("city-search-input");
  var searchBtn = document.getElementById("city-search-btn");
  var loadingEl = document.getElementById("search-loading");
  var errorEl = document.getElementById("search-error");

  if (!searchInput || !searchBtn || !loadingEl || !errorEl) {
    return;
  }

  var isLoading = false;

  function setLoading(loading) {
    isLoading = loading;
    loadingEl.hidden = !loading;
    searchInput.disabled = loading;
    searchBtn.disabled = loading;
  }

  function hideError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function getErrorMessage(error) {
    if (error.message === "CITY_NOT_FOUND" || error.message === "EMPTY_CITY") {
      return 'City not found. Try another name, e.g. "London".';
    }
    return "Unable to fetch weather data. Check your connection and try again.";
  }

  function handleSearch() {
    if (isLoading) {
      return;
    }

    var cityName = searchInput.value.trim();
    hideError();
    setLoading(true);

    fetchWeatherByCity(cityName)
      .then(function (result) {
        console.log("Weather data for " + result.location.name + ", " + result.location.country + ":", result);
        console.log("Forecast response:", result.weather);
      })
      .catch(function (error) {
        console.error("Weather fetch failed:", error);
        showError(getErrorMessage(error));
      })
      .finally(function () {
        setLoading(false);
      });
  }

  searchBtn.addEventListener("click", handleSearch);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  });
})();