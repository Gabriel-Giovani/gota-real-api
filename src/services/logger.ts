const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const files = new transports.File({ filename: 'api.log' });

const Sentry = require('@sentry/node');

const myFormat = printf((info: any) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        files
    ]
});

export const logError = function (...msg: any[]) {
    let err = new Error(msg[0]);
    Sentry.captureException(err);
    logger.error(`${msg} - ${err.stack}`);

    if (process.env.NODE_ENV != 'test')
        console.error('>>', ...msg);
};

export const logWarn = function (...msg: any[]) {
    logger.warn(`${msg}`);

    if (process.env.NODE_ENV != 'test')
        console.warn(...msg);
};

export const logInfo = function (...msg: any[]) {
    logger.info(`${msg}`);
    if (process.env.NODE_ENV != 'test')
        console.log(...msg);
};

export const logRequest = (req: any, res: any, next: any) => {
    try {
        const { httpVersion, url, method, next, baseUrl, originalUrl, query, body } = req;

        if (url === `/healthz`)
            return next();

        if (process.env.NODE_ENV != 'test')
            logInfo(`[${req.uuid}][HTTP ${httpVersion} => ${url} (${method}) = ${originalUrl} (${baseUrl}) :: ${JSON.stringify(query)} :: ${JSON.stringify(body)}]`);
    }
    catch (err) {
        if (process.env.NODE_ENV != 'test')
            logError(err);
    }

    next();
};