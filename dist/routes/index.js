"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyAccess = exports.useRoute = void 0;
const token_1 = require("../services/token");
const routes_1 = require("./routes");
const app_1 = require("../app");
const logger_1 = require("../services/logger");
function setRouter() {
    (0, routes_1.setRoutesUp)();
    useRoute('get', '/healthz', healthCheck, false);
    app_1.default.instance.get('/', (req, res) => {
        res.status(200).send('powered by Greencave.co.');
    });
}
exports.default = setRouter;
function useRoute(method, route, func, locked = true) {
    const app = app_1.default.instance;
    let registerRoute = app.get.bind(app);
    switch (method) {
        case "post": {
            registerRoute = app.post.bind(app);
            break;
        }
        case "put": {
            registerRoute = app.put.bind(app);
            break;
        }
        case "delete": {
            registerRoute = app.delete.bind(app);
            break;
        }
    }
    if (locked) {
        registerRoute(route, token_1.default.authorizeToken, (0, routes_1.routeFn)(func));
        registerRoute(`${route}`, token_1.default.authorizeToken, (0, routes_1.routeFn)(func));
    }
    else {
        registerRoute(route, (0, routes_1.routeFn)(func));
        registerRoute(`${route}`, (0, routes_1.routeFn)(func));
    }
}
exports.useRoute = useRoute;
function healthCheck(req, res) {
    if (app_1.default.fullyLoaded) {
        res.json({
            healthy: true,
        });
    }
    else {
        res.status(404).send();
    }
}
async function denyAccess(res) {
    (0, logger_1.logError)('Access Denied.');
    res.status(401).send();
}
exports.denyAccess = denyAccess;
//# sourceMappingURL=index.js.map