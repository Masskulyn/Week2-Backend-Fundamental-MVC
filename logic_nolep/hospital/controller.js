let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  static register(name, password, role) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.registerView(objArr);
    });
  }

  static login(name, password) {
    Employee.login(name, password, (err, user) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.loginView(user);
    });
  }

  static logout() {
    Employee.logout((err, msg) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.logoutView(msg);
    });
  }

  static addPatient(data) {
    Patient.add(data, (err, patient) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.addPatientView(patient);
    });
  }

  static updatePatient(data) {
    Patient.update(data, (err, patient) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.updatePatientView(patient);
    });
  }

  static deletePatient(id) {
    Patient.delete(id, (err, msg) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.deletePatientView(msg);
    });
  }

  static show(type) {
    if (type === "employee") {
      Employee.findAll((err, data) => {
        if (err) return HospitalView.ErrorView(err);
        HospitalView.showEmployees(data);
      });
    } else if (type === "patient") {
      Patient.findAll((err, data) => {
        if (err) return HospitalView.ErrorView(err);
        HospitalView.showPatients(data);
      });
    } else {
      HospitalView.ErrorView("Invalid show command.");
    }
  }

  static findPatientBy(by, value) {
    Patient.findBy(by, value, (err, patient) => {
      if (err) return HospitalView.ErrorView(err);
      HospitalView.findPatientView(patient);
    });
  }

  static help() {
    HospitalView.helpView();
  }
}

module.exports = HospitalController;
