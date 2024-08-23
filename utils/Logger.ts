import winston from 'winston';

const timestampFormat = {
    format: 'DD-MM-YYYY hh:mm:ss A',
};

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const today = new Date();
const dateInFileName = [
    today.getDate(),
    months[today.getMonth()],
    today.getFullYear(),
].join('-');

const loggerOptions = {
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.colorize()
            ),
        }),
        new winston.transports.File({
            filename: `logs/debug_${dateInFileName}.log`,
            level: 'debug',
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(timestampFormat),
                winston.format.printf(
                    (info) =>
                        `[${info.timestamp}] ${info.level.toUpperCase()} : ${info.message}`
                ),
                winston.format.uncolorize()
            ),
        }),
    ],
};

export const LOGGER = winston.createLogger(loggerOptions);
