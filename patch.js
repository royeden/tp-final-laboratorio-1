require('dotenv').config();

const chalk = require('chalk');
const fs = require('fs');

const [, , ...files] = process.argv;
const {
  IP_ADDRESS_CONFIG,
  REPLACE_PATTERN,
  REPLACE_REGEX,
  REPLACE_REGEX_RAW,
  REPLACE_STRING
} = process.env;

files.forEach((file, fileIndex) => {
  const fileLog = chalk.bold(file);
  try {
    if (fs.existsSync(`./${file}`)) {
      console.log(
        chalk.white(`\n${fileIndex + 1} - Patching ${chalk.blue(fileLog)}...`)
      );
      fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
          return console.error(error);
        }
        const regex = new RegExp(`${REPLACE_REGEX}\\n[^\\n]*`, 'g');
        const result = data.replace(
          regex,
          `${REPLACE_REGEX_RAW}\n${REPLACE_STRING.replace(
            REPLACE_PATTERN,
            IP_ADDRESS_CONFIG
          )}`
        );

        fs.writeFile(file, result, 'utf8', e => {
          if (e) return console.error(e);
        });
      });
      console.log(chalk.green(`\n${fileIndex + 1} - Patched ${fileLog}!`));
    } else {
      console.log(
        chalk.red(`\n${fileIndex + 1} - File: ${fileLog} doesn\'t exist!`)
      );
    }
  } catch (error) {
    console.error(fileIndex);
    console.error(error);
  }
});

console.log(chalk.green(chalk.bold('\nDONE!\n')));
