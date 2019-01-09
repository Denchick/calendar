const chalk = require('chalk');
const calendarBuilder = require('./calendarBuilder');

if (process.argv[2] === '--help' || process.argv[2] === '-h') {
    console.log(getHelp());
    process.exit();
}

let [inputYear, inputMonth] = process.argv.slice(2);

const calendar = calendarBuilder.build(validateYear(inputYear), validateMonth(inputMonth));

const prettyDays = calendar.map(obj => chalk.hex(obj.color)(obj.day));
for (let i = 0; i < prettyDays.length; i += 7) {
    const line = prettyDays.slice(i, i + 7).join(' ')
    console.log(line);
}

function validateYear(inputYear) {
    const year = parseInt(inputYear);
    if (isNaN(year) || year < 0 || year > 9999) {
        console.log("Год - это число от 0 до 9999. Смотри --help.");
        process.exit();
    }
    return year;
}

function validateMonth(inputMonth) {
    const month = parseInt(inputMonth);
    if (isNaN(month) || month < 1 || month > 12) {
        console.log("Месяц - это число от 1 до 12. Смотри --help.");
        process.exit();
    }
    return month;
}

function getHelp() {
    return [
        'Утилита для консольного вывода страницы календаря.',
        'На вход принимается год и месяц. Пример:',
        '',
        '   node calendar.js 2017 12'
    ].join('\r\n')
}