"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const files = new transports.File({ filename: 'api.log' });
const Sentry = require('@sentry/node');
const myFormat = printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});
const logger = createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        files
    ]
});
exports.logError = function (...msg) {
    let err = new Error(msg[0]);
    Sentry.captureException(err);
    logger.error(`${msg} - ${err.stack}`);
    if (process.env.NODE_ENV != 'test')
        console.error('>>', ...msg);
};
exports.logWarn = function (...msg) {
    logger.warn(`${msg}`);
    if (process.env.NODE_ENV != 'test')
        console.warn(...msg);
};
exports.logInfo = function (...msg) {
    logger.info(`${msg}`);
    if (process.env.NODE_ENV != 'test')
        console.log(...msg);
};
exports.logRequest = (req, res, next) => {
    try {
        const { httpVersion, url, method, next, baseUrl, originalUrl, query, body } = req;
        if (url === `/healthz`)
            return next();
        if (process.env.NODE_ENV != 'test')
            exports.logInfo(`[${req.uuid}][HTTP ${httpVersion} => ${url} (${method}) = ${originalUrl} (${baseUrl}) :: ${JSON.stringify(query)} :: ${JSON.stringify(body)}]`);
    }
    catch (err) {
        if (process.env.NODE_ENV != 'test')
            exports.logError(err);
    }
    next();
};
//# sourceMappingURL=logger.js.map