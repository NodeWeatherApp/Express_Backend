function makeWeatherDTO(weather) {
  const allowed = ["id", "forecast", "temperature", "date", "locationId"];
  const weatherDTO = weather.map(
    ({ createdAt, updatedAt, ...keepAttrs }) => keepAttrs
  );

  return weatherDTO;
}

module.exports = makeWeatherDTO;

