const chalk = require('chalk');
const fs = require('fs');

const { config } = require('./config');

const { patch, port } = config;

module.exports = files => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files specified');
    }
    files.forEach((file, fileIndex) => {
      const fileLog = chalk.bold(file);
      if (fs.existsSync(`./${file}`)) {
        console.log(
          chalk.white(`\n${fileIndex + 1} - Patching ${chalk.blue(fileLog)}...`)
        );
        fs.readFile(file, 'utf8', (error, data) => {
          if (error) {
            throw new Error(error);
          }
          const result = data.replace(
            patch.regex,
            patch.replacement(
              `http://192.168.${patch.local_ip}:${port}${patch.local_url}`
            )
          );
          fs.writeFile(file, result, 'utf8', e => {
            if (e) throw new Error(e);
          });
        });
        console.log(chalk.green(`\n${fileIndex + 1} - Patched ${fileLog}!`));
      } else {
        throw new Error(
          `\n${fileIndex + 1} - File: ${fileLog} doesn\'t exist!`
        );
      }
    });
    console.log(chalk.green(chalk.bold('\nDONE!\n')));
  } catch (error) {
    console.error(chalk.red(chalk.bold(`\n${error}\n`)));
    throw new Error(error);
  }
};