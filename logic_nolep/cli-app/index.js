import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let users = [];
let currentUser = null;

async function loadUsers() {
  try {
    const data = await fs.readFile("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    users = [];
    console.log(
      chalk.yellow("File users.json tidak ditemukan. Akan dibuat baru.")
    );
  }
}

async function saveUsers() {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

function ask(question) {
  return new Promise((resolve) => rl.question(chalk.cyan(question), resolve));
}

async function login() {
  const username = await ask("Masukkan username: ");
  const password = await ask("Masukkan password: ");

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    currentUser = user;
    console.log(chalk.green(`\nSelamat datang kembali, ${username}!\n`));
    mainMenu();
  } else {
    console.log(chalk.red("\nUsername atau password salah.\n"));
    startMenu();
  }
}

async function register() {
  const username = await ask("Buat username: ");
  const password = await ask("Buat password: ");

  if (users.find((u) => u.username === username)) {
    console.log(chalk.red("Username sudah digunakan.\n"));
    return startMenu();
  }

  const newUser = { username, password, highestScore: Infinity };
  users.push(newUser);
  await saveUsers();
  console.log(chalk.green("\nRegistrasi berhasil! Silakan login.\n"));
  startMenu();
}

function startMenu() {
  console.log(chalk.blue("\n===== LOGIN MENU ====="));
  console.log("1. Login");
  console.log("2. Register");
  console.log("3. Keluar");

  ask("Pilih menu (1-3): ").then(async (choice) => {
    switch (choice) {
      case "1":
        await login();
        break;
      case "2":
        await register();
        break;
      case "3":
        console.log(chalk.yellow("Keluar dari program..."));
        rl.close();
        break;
      default:
        console.log(chalk.red("Pilihan tidak valid!"));
        startMenu();
    }
  });
}

function mainMenu() {
  console.log(chalk.magenta("\n===== MAIN MENU ====="));
  console.log("1. Mulai Game");
  console.log("2. Lihat Papan Skor");
  console.log("3. Logout");

  ask("Pilih menu (1-3): ").then(async (choice) => {
    switch (choice) {
      case "1":
        await playGame();
        break;
      case "2":
        showLeaderboard();
        break;
      case "3":
        currentUser = null;
        console.log(chalk.yellow("Logout berhasil."));
        startMenu();
        break;
      default:
        console.log(chalk.red("Pilihan tidak valid!"));
        mainMenu();
    }
  });
}

function showLeaderboard() {
  console.log(chalk.yellow("\n===== TOP 10 SKOR ====="));
  const topUsers = users
    .filter((u) => u.highestScore !== Infinity)
    .sort((a, b) => a.highestScore - b.highestScore)
    .slice(0, 10);

  if (topUsers.length === 0) {
    console.log("Belum ada skor.");
  } else {
    topUsers.forEach((u, i) => {
      console.log(`${i + 1}. ${u.username} - ${u.highestScore} tebakan`);
    });
  }

  mainMenu();
}

async function playGame() {
  const numberToGuess = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  console.log(chalk.green("\nTebak angka dari 1 sampai 100!"));

  async function makeGuess() {
    const input = await ask("Tebakanmu: ");
    const guess = parseInt(input);
    attempts++;

    if (isNaN(guess)) {
      console.log(chalk.red("Masukkan angka yang valid!"));
      return makeGuess();
    }

    if (guess < numberToGuess) {
      console.log(chalk.blue("Terlalu rendah!"));
      makeGuess();
    } else if (guess > numberToGuess) {
      console.log(chalk.blue("Terlalu tinggi!"));
      makeGuess();
    } else {
      console.log(
        chalk.green(`\nSelamat! Kamu menebak dalam ${attempts} kali.`)
      );
      if (attempts < currentUser.highestScore) {
        currentUser.highestScore = attempts;
        await saveUsers();
        console.log(chalk.green("Skor terbaikmu telah diperbarui!"));
      }
      mainMenu();
    }
  }

  makeGuess();
}

async function main() {
  await loadUsers();
  startMenu();
}

main();
