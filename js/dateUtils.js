function formatForecastDayLabel(dateString, index, timezone) {
  if (index === 0) {
    return "TODAY";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: timezone,
  })
    .format(new Date(dateString + "T12:00:00"))
    .toUpperCase();
}

function formatHourlyTime(isoTime, timezone) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).format(new Date(isoTime));
}