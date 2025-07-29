// CLI Chess Game v1.0
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
let currentPlayer = "white";

function printBoard() {
  console.clear();
  console.log(chalk.bold("    a   b   c   d   e   f   g   h"));
  console.log(chalk.bold("  +---+---+---+---+---+---+---+---+"));
  for (let i = 0; i < 8; i++) {
    let row = `${8 - i} |`;
    for (let j = 0; j < 8; j++) {
      row += ` ${board[i][j]} |`;
    }
    console.log(chalk.bold(row + ` ${8 - i}`));
    console.log(chalk.bold("  +---+---+---+---+---+---+---+---+"));
  }
  console.log(chalk.bold("    a   b   c   d   e   f   g   h\n"));
}

function parseMove(move) {
  const [from, to] = move.trim().toLowerCase().split(" ");
  if (!from || !to) return null;
  const fx = 8 - parseInt(from[1]);
  const fy = letters.indexOf(from[0]);
  const tx = 8 - parseInt(to[1]);
  const ty = letters.indexOf(to[0]);
  if ([fx, fy, tx, ty].some((v) => v < 0 || v > 7)) return null;
  return { fx, fy, tx, ty };
}

function makeMove({ fx, fy, tx, ty }) {
  const piece = board[fx][fy];
  if (piece === " ") return false;
  board[fx][fy] = " ";
  board[tx][ty] = piece;
  return true;
}

function promptMove() {
  printBoard();
  rl.question(
    chalk.green(`${currentPlayer}'s move (e.g. e2 e4): `),
    (input) => {
      const move = parseMove(input);
      if (!move) {
        console.log(chalk.red("Format salah. Gunakan format seperti 'e2 e4'."));
        return promptMove();
      }
      const success = makeMove(move);
      if (!success) {
        console.log(chalk.red("Tidak ada bidak di posisi awal."));
        return promptMove();
      }
      currentPlayer = currentPlayer === "white" ? "black" : "white";
      promptMove();
    }
  );
}

function startGame() {
  printBoard();
  promptMove();
}

startGame();
