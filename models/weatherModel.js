const db = require("../config/db");

class Weather {
  constructor(forecast, temperature, date) {
    this.forecast = forecast;
    this.temperature = temperature;
    this.date = date;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
            INSERT INTO weather(
                forecast,
                temperature,
                date,
                created_at
            )
            VALUES(
                "${this.forecast}",
                "${this.temperature}",
                "${this.date}",
                "${createdAtDate}"
            );`;

    db.execute(sql);
    return {
      weather: {
        forecast: this.forecast,
        temperature: this.temperature,
        date: this.date,
        created_at: createdAtDate,
      },
    };
  }
  static findAll() {
    let sql = "SELECT * FROM weather;";

    return db.execute(sql);
  }
}

module.exports = Weather;