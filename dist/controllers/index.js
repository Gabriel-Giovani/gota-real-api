"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../helpers/utils");
class ControllerConstructor {
    static RouteConstructor(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const payload = yield next(req, res);
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
        });
    }
}
exports.default = ControllerConstructor;
//# sourceMappingURL=index.js.map