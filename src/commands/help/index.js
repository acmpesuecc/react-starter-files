import chalk from 'chalk';

const menus = {
  main: `
 🔥 ${chalk.greenBright('rsf [command] <options>')}
    ${chalk.blueBright('init')} ................ create components for your react app with rsf
    ${chalk.blueBright('create-react-app')}.............. run cra along with with rsf with a single command
    ${chalk.blueBright('version')} ............ show package version
    ${chalk.blueBright('help')} ............... show help menu for a command
  `,

  version:`\n${chalk.blueBright('version')} : show package version
    ${chalk.redBright('\nSyntax')}
    ${chalk.greenBright('rsf --version')}
  `,
}

const help = (args) => {
    const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
    console.log(menus[subCmd] || menus.main)
}
export default help;