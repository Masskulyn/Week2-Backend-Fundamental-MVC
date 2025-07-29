const fs = require("fs");
const Employee = require("./employee");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases;
  }

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) return cb(err);
      cb(null, JSON.parse(data));
    });
  }

  static saveAll(data, cb) {
    fs.writeFile("./patient.json", JSON.stringify(data, null, 2), cb);
  }

  static add(args, cb) {
    Employee.getLoginUser((err, user) => {
      if (err || !user || user.position !== "dokter")
        return cb("Akses ditolak");

      this.findAll((err, data) => {
        if (err) return cb(err);
        let [id, name, ...diseases] = args;
        let newPatient = new Patient(id, name, diseases);
        data.push(newPatient);
        this.saveAll(data, (err) => cb(err, newPatient));
      });
    });
  }

  static update(args, cb) {
    Employee.getLoginUser((err, user) => {
      if (err || !user || user.position !== "dokter")
        return cb("Akses ditolak");

      this.findAll((err, data) => {
        if (err) return cb(err);
        let [id, name, ...diseases] = args;
        let patient = data.find((p) => p.id === id);
        if (!patient) return cb("Pasien tidak ditemukan");
        patient.name = name;
        patient.diseases = diseases;
        this.saveAll(data, (err) => cb(err, patient));
      });
    });
  }

  static delete(id, cb) {
    Employee.getLoginUser((err, user) => {
      if (err || !user || user.position !== "dokter")
        return cb("Akses ditolak");

      this.findAll((err, data) => {
        if (err) return cb(err);
        let newData = data.filter((p) => p.id !== id);
        this.saveAll(newData, (err) => cb(err, "Pasien berhasil dihapus"));
      });
    });
  }

  static findBy(by, value, cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);
      let found =
        by === "id"
          ? data.find((p) => p.id === value)
          : data.find((p) => p.name.toLowerCase() === value.toLowerCase());
      cb(null, found);
    });
  }
}

module.exports = Patient;
