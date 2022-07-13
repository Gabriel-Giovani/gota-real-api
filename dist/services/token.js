"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Settings = require("../settings");
const jwt = require("jsonwebtoken");
const utils_1 = require("../helpers/utils");
class TokenService {
    static generateUserToken(data) {
        let tokenData = Object.assign(Object.assign({}, data), { exp: this.expirationDate(3600) });
        let token = jwt.sign(tokenData, Settings.API_SECRET);
        return token;
    }
    static expirationDate(minutes) {
        let now = Date.now();
        let till = now + (minutes * 60) * 1000 * 24 * 7;
        return till;
    }
    static async authorizeToken(req, res, next) {
        let token = req.headers['token'];
        if (!token || Array.isArray(token)) {
            utils_1.default.sendErrorJSON(req, res, 403, 'NO_TOKEN');
            return;
        }
        jwt.verify(token, Settings.API_SECRET, (err, decoded) => {
            if (err) {
                utils_1.default.sendErrorJSON(req, res, 403, 'INVALID_TOKEN');
                return;
            }
            req.userId = decoded.id;
            req.token = token;
            next();
        });
    }
    static async getDecodedToken(token) {
        const decoded = await new Promise((res, rej) => {
            jwt.verify(token, Settings.API_SECRET, async function (err, decoded) {
                if (err)
                    rej({ err });
                res(decoded);
            });
        });
        return decoded;
    }
}
exports.default = TokenService;
//# sourceMappingURL=token.js.map