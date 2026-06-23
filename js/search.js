(function () {
  var searchInput = document.getElementById("city-search-input");
  var searchBtn = document.getElementById("city-search-btn");
  var clearBtn = document.getElementById("city-clear-btn");
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
    if (clearBtn) {
      clearBtn.disabled = loading;
    }
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

  function renderWeatherResult(result) {
    renderWeatherCard(result);
    renderForecastStrip(result);
    renderInsightsPanel(result);
  }

  function loadWeather(cityName, options) {
    var opts = options || {};
    var query = cityName.trim();

    if (!query) {
      if (opts.isAutoLoad) {
        clearLastCity();
        resetApplicationState();
      }
      return Promise.resolve();
    }

    hideError();
    setLoading(true);

    return fetchWeatherByCity(query)
      .then(function (result) {
        console.log(
          "Weather data for " + result.location.name + ", " + result.location.country + ":",
          result
        );
        console.log("Forecast response:", result.weather);

        searchInput.value = query;
        renderWeatherResult(result);
        saveLastCity(query);
      })
      .catch(function (error) {
        console.error("Weather fetch failed:", error);

        if (opts.isAutoLoad) {
          clearLastCity();
          resetApplicationState();
        }

        showError(getErrorMessage(error));
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function handleSearch() {
    if (isLoading) {
      return;
    }
    loadWeather(searchInput.value, { isAutoLoad: false });
  }

  function handleClear() {
    if (isLoading) {
      return;
    }
    clearLastCity();
    resetApplicationState();
  }

  function initAutoLoad() {
    var savedCity = getLastCity();
    if (!savedCity) {
      return;
    }

    searchInput.value = savedCity;
    loadWeather(savedCity, { isAutoLoad: true });
  }

  searchBtn.addEventListener("click", handleSearch);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", handleClear);
  }

  initAutoLoad();
})();