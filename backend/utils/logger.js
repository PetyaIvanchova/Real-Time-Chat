import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
})

const info = (message) => {
    logger.info(message);
}

const error = (message) => {
    logger.error(message);
}

export default {info, error};
