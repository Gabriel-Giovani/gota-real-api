"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
class AuthService {
    static async authenticate(userdata) {
        const token = await token_1.default.generateUserToken(userdata);
        const user = {
            id: userdata.id,
            email: userdata.email,
            name: userdata.name,
            master: userdata.master,
            token,
        };
        return user;
    }
    static async destroySession(resolve, reject) {
        return resolve(true);
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.js.map