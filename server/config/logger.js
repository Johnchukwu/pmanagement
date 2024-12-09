const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'logs/combined.log' }), // Log all messages
    ],
});

module.exports = logger;
