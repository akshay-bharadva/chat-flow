const { spawn } = require("child_process");
const os = require("os");
const path = require("path");

const isWin = os.platform() === "win32";
const venvPath = path.join(__dirname, "backend", ".venv");

const backendCmd = isWin
  ? `cmd /c "cd backend && .venv\\Scripts\\activate && uvicorn app.main:app --reload"`
  : `bash -c "cd backend && source .venv/bin/activate && uvicorn app.main:app --reload"`;



const frontendCmd = `npm run dev`;

const run = (command, cwd, name) => {
  const shell = isWin ? "cmd.exe" : "bash";
  const args = isWin ? ["/c", command] : ["-c", command];

  const proc = spawn(shell, args, {
    cwd,
    stdio: "inherit",
    shell: true,
  });

  proc.on("exit", (code) => {
    console.log(`[${name}] exited with code ${code}`);
  });
};

run(backendCmd, path.join(__dirname), "Backend");
run(frontendCmd, path.join(__dirname, "frontend"), "Frontend");
