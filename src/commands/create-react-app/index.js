import clear from "clear";
import inquirer from "inquirer";
import chalk from "chalk";
import init from "../init";
import { spawn } from "child_process";
import { Intro } from "../../utils/interactiveOutputs";

// run terminal commands
const runTC = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const command = spawn(cmd, args, { stdio: "inherit" });
    command.on("close", (_) => resolve());
    command.on("error", (err) => reject(err));
  });
};

const createReactApp = async (path) => {
  clear();
  Intro();

  console.log("\n");

  let answer;
  answer = await inquirer.prompt([
    {
      name: "check",
      message: "Click any key when you're ready.",
    },
  ]);

  console.info(
    "\n Setting up the project using facebook/create-react-app.🚀\n"
  );

  runTC(process.platform === "win32" ? "npx.cmd" : "npx", [
    "create-react-app",
    path,
  ])
    .then(async (result) => {
      console.info(`\n\n✔️ Create-react-app successfully executed!\n`);

      await init(false, path === "." ? "" : `/${path}`);
    })
    .catch((err) => {
      console.log(chalk.redBright(`❌ create-react-app failed!:${err}`));
      process.exit(1);
    });
};

export default createReactApp;
