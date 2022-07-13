"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./services/logger");
const moment = require("moment");
const express = require("express");
const pkg = require('../package.json');
const routes_1 = require("./routes/");
const database_1 = require("./services/database");
const utils_1 = require("./helpers/utils");
// middlewares
const requestUuid_1 = require("./middlewares/requestUuid");
// libs
const Sentry = require('@sentry/node');
const cors = require('cors');
const bodyParser = require('body-parser');
class App {
    configureApp() {
        const app = App.instance;
        app.use(Sentry.Handlers.requestHandler());
        app.use(bodyParser.json({
            limit: 4194304
        }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(requestUuid_1.default);
        app.use(logger_1.logRequest);
        (0, routes_1.default)();
        // app.use(Sentry.Handlers.errorHandler());
        app.use(function onError(err, req, res, next) {
            console.error('>>', err);
            res.statusCode = 500;
            res.end(res.sentry + '\n');
        });
    }
    prepareStaticFiles() {
        let staticFilesPath = `${process.cwd()}/tmp/uploads/`;
        // logInfo(`Static files path located at '${staticFilesPath}'.`);
        App.instance.use('/api/files', express.static(staticFilesPath));
    }
    startServer() {
        /**
         * configure app
         */
        this.configureApp();
        this.prepareStaticFiles();
        /**
         * start listening
         */
        App.instance.listen(process.env.PORT || 4489);
        App.defaultApp = App.instance;
        /**
         * indicates app is fully loaded
         */
        App.fullyLoaded = true;
        /**
         * log start message
         */
        let startMsg = `API Started on port ${process.env.HTTP_PORT} at ${moment().format()}`;
        (0, logger_1.logInfo)(startMsg);
        Sentry.captureMessage(startMsg);
    }
    async start() {
        /**
         * log start message
         */
        (0, logger_1.logInfo)(`Currently Server Version: v${pkg.version}`);
        /**
         * override default/prototype functions
         */
        utils_1.default.overrideDefaults();
        /**
         * creates database service / connect
         */
        await database_1.default.create();
        /**
         * start web server
         */
        this.startServer();
    }
}
exports.default = App;
App.fullyLoaded = false;
App.instance = express();
App.defaultApp = null;
//# sourceMappingURL=app.js.map