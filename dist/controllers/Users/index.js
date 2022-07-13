"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../../helpers/utils");
const users_1 = require("../../database/models/users");
class UsersController {
    static index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield users_1.default.getAllUsers();
                return { users };
            }
            catch (err) {
                if (typeof err === 'object' && err !== null) {
                    utils_1.default.sendErrorJSON(req, res, 200, err.toString());
                }
                else {
                    console.log('Unexpected error', err);
                }
                return [];
            }
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=index.js.map