class HospitalView {
  static ErrorView(err) {
    console.log("ERROR:", err);
  }

  static registerView(objArr) {
    console.log(
      `Sukses registrasi. Username: ${objArr[0].username}, Role: ${objArr[0].position}. Total karyawan: ${objArr[1]}`
    );
  }

  static loginView(user) {
    console.log(
      `Login berhasil. Selamat datang ${user.username} (${user.position})`
    );
  }

  static logoutView(msg) {
    console.log(msg);
  }

  static addPatientView(patient) {
    console.log(`Pasien ${patient.name} berhasil ditambahkan`);
  }

  static updatePatientView(patient) {
    console.log(`Pasien ${patient.name} berhasil diupdate`);
  }

  static deletePatientView(msg) {
    console.log(msg);
  }

  static showEmployees(data) {
    console.table(data);
  }

  static showPatients(data) {
    console.table(data);
  }

  static findPatientView(patient) {
    console.log("Hasil pencarian:", patient);
  }

  static helpView() {
    console.log(`
==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ...
node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ...
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>
        `);
  }
}

module.exports = HospitalView;
