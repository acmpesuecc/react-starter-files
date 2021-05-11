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
      commands.init();
      break;

    case "create-react-app":
      let path = args._.length > 1 && args._[1];
      if (path) {
        commands.createReactApp(path);
      } else {
        console.error("⭕ Path name not provided! Please checkout the docs!\n");
      }
      break;
    
    case "firebase-init":
      commands.firebaseInit();
      break;
      
    case "help":
      commands.help(args);
      break;

    default:
      console.info("\⭕ Looks like the command you're looking for doesn't exist!\n");
      commands.help(args);
  }
};
