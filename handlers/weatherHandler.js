function getRandomTemperature(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomForecast() {
  let forecast = [
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching",
  ];
  let random_val = Math.floor(Math.random() * forecast.length);
  return forecast[random_val];
}
function getDatetime() {
  let currentdate = new Date();
  let datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
}

module.exports = {
  getRandomTemperature,
  getRandomForecast,
  getDatetime,
};
