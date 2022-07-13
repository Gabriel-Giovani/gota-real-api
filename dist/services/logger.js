"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = exports.logInfo = exports.logWarn = exports.logError = void 0;
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
const logError = function (...msg) {
    let err = new Error(msg[0]);
    Sentry.captureException(err);
    logger.error(`${msg} - ${err.stack}`);
    if (process.env.NODE_ENV != 'test')
        console.error('>>', ...msg);
};
exports.logError = logError;
const logWarn = function (...msg) {
    logger.warn(`${msg}`);
    if (process.env.NODE_ENV != 'test')
        console.warn(...msg);
};
exports.logWarn = logWarn;
const logInfo = function (...msg) {
    logger.info(`${msg}`);
    if (process.env.NODE_ENV != 'test')
        console.log(...msg);
};
exports.logInfo = logInfo;
const logRequest = (req, res, next) => {
    try {
        const { httpVersion, url, method, next, baseUrl, originalUrl, query, body } = req;
        if (url === `/healthz`)
            return next();
        if (process.env.NODE_ENV != 'test')
            (0, exports.logInfo)(`[${req.uuid}][HTTP ${httpVersion} => ${url} (${method}) = ${originalUrl} (${baseUrl}) :: ${JSON.stringify(query)} :: ${JSON.stringify(body)}]`);
    }
    catch (err) {
        if (process.env.NODE_ENV != 'test')
            (0, exports.logError)(err);
    }
    next();
};
exports.logRequest = logRequest;
//# sourceMappingURL=logger.js.map