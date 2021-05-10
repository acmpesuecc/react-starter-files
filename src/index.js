import minimist from "minimist";

import commands from "./commands";

export const main = async (args) => {
  // removing the path args from the args
  args = minimist(args.slice(2));

  // getting the command from the args
  let cmd = args._[0];

  switch (cmd) {
    case "version":
      commands.version(args);
      break;

    case "init":
      commands.init(args);
      break;

    case "create-react-app":
      let path = args._.length > 1 && args._[1];
      console.log(path, args);
      if (path) {
        commands.createReactApp(path);
      } else {
        console.error("⭕ Path name not provided! Please checkout the docs!\n");
      }
  }
};
