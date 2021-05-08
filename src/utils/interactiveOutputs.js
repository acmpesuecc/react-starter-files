import chalk from 'chalk';
import figlet from 'figlet';

export const Intro = () => {
    console.log(
        chalk.redBright(
            figlet.textSync('RSF', { horizontalLayout: 'full' })
        )
    );
}