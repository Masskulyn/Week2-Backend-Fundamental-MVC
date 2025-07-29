const fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) return cb(err);
      cb(null, JSON.parse(data));
    });
  }

  static saveAll(data, cb) {
    fs.writeFile("./employee.json", JSON.stringify(data, null, 2), cb);
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);
      let newEmp = new Employee(name, password, role);
      data.push(newEmp);
      this.saveAll(data, (err) => {
        if (err) return cb(err);
        cb(null, [newEmp, data.length]);
      });
    });
  }

  static login(name, password, cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);

      let alreadyLogin = data.find((e) => e.login);
      if (alreadyLogin) return cb("Sudah ada yang login!");

      let user = data.find(
        (e) => e.username === name && e.password === password
      );
      if (!user) return cb("User tidak ditemukan");

      user.login = true;
      this.saveAll(data, (err) => cb(err, user));
    });
  }

  static logout(cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);
      let user = data.find((e) => e.login);
      if (!user) return cb("Belum ada yang login");
      user.login = false;
      this.saveAll(data, (err) => cb(err, "Logout berhasil"));
    });
  }

  static getLoginUser(cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);
      cb(
        null,
        data.find((e) => e.login)
      );
    });
  }
}

module.exports = Employee;
