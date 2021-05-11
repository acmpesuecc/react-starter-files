import chalk from 'chalk';

const menus = {
  main: `
 🔥 ${chalk.greenBright('rsf [command] <options>')}
    ${chalk.blueBright('init')} ................ create components for your react app with rsf
    ${chalk.blueBright('create-react-app')}.............. run cra along with with rsf with a single command
    ${chalk.blueBright('version')} ............ show package version
    ${chalk.blueBright('help')} ............... show help menu for a command
  `,

  init:`\n${chalk.redBright('init')} : create pages with routing + components for your already created react app
  ${chalk.redBright('\nSyntax')}
  ${chalk.greenBright('rsf init')}
  ${chalk.redBright('\nDescription')}\n${chalk.whiteBright('The command adds a /components, /routes and /pages folder and updates creates the files accordingly. Rsf-cli looks for the /src directory and then creates the folders inside it. So ideally, you would cd into your react app directory and then run this command to initialize the components. ')}
  `,

  'create-react-app':`\n${chalk.redBright('create-react-app')} : creates a react app using the facebook/create-react-app template and 
  ${chalk.redBright('\nSyntax')}
  ${chalk.greenBright('rsf create-react-app <your-app-name>')}
  ${chalk.redBright('\nDescription')}\n${chalk.whiteBright('Creates a react app using the cra template and runs rsf init in one command.')}
  `,

  help:`\n${chalk.redBright('help')} : Provides you help in times of need
  ${chalk.redBright('\nSyntax')}
  ${chalk.greenBright('rsf help [command]')}
  ${chalk.redBright('\nDescription')}\n${chalk.whiteBright('You already reached here bro, you should know. ')}
  `,

  version:`\n${chalk.redBright('version')} : show package version
    ${chalk.redBright('\nSyntax')}
    ${chalk.greenBright('rsf version')}
  `,
}

const help = (args) => {
    const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
    console.log(menus[subCmd] || menus.main)
}
export default help;