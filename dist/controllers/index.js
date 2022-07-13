"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helpers/utils");
class ControllerConstructor {
    static async RouteConstructor(req, res, next) {
        try {
            const payload = await next(req, res);
            utils_1.default.sendJSON(res, 200, payload);
        }
        catch (err) {
            if (typeof err === 'object' && err !== null) {
                utils_1.default.sendErrorJSON(req, res, 200, err.toString());
            }
            else {
                console.log('Unexpected error', err);
            }
        }
    }
}
exports.default = ControllerConstructor;
//# sourceMappingURL=index.js.map