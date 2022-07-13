import { logInfo, logRequest } from './services/logger';
import * as moment from 'moment';
import * as express from "express";

const pkg = require('../package.json');

import route from './routes/';
import Database from './services/database';
import Utils from './helpers/utils';

// middlewares
import requestUuid from './middlewares/requestUuid';

// libs
const Sentry = require('@sentry/node');
const cors = require('cors');
const bodyParser = require('body-parser');

export default class App {
    static fullyLoaded = false;
    static instance = express();

    static defaultApp: any = null;

    configureApp() {
        const app = App.instance;
        app.use(Sentry.Handlers.requestHandler());
        app.use(bodyParser.json({
            limit: 4194304
        }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());

        app.use(requestUuid);
        app.use(logRequest);

        route();

        // app.use(Sentry.Handlers.errorHandler());
        app.use(function onError(err: any, req: any, res: any, next: any) {
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
        logInfo(startMsg);
        Sentry.captureMessage(startMsg);
    }

    async start() {
        /**
         * log start message
         */
        logInfo(`Currently Server Version: v${pkg.version}`);

        /**
         * override default/prototype functions
         */
        Utils.overrideDefaults();

        /**
         * creates database service / connect
         */
        await Database.create();

        /**
         * start web server
         */
        this.startServer();
    }
}