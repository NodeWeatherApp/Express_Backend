const db = require("../config/db");

class User {
  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
        INSERT INTO users(
            email,
            username,
            password,
            created_at
        )
        VALUES(
            "${this.email}",
            "${this.username}",
            "${this.password}",
            "${createdAtDate}"
        );`;

    return db.execute(sql);
  }

  static login(email, password) {
    let sql = 'SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password];
    console.log(sql);
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM users;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM users WHERE id = ${id};`;

    return db.execute(sql);
  }
}

module.exports = User;
