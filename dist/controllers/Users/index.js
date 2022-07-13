"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./validations/create");
const login_1 = require("./validations/login");
const utils_1 = require("../../helpers/utils");
const users_1 = require("../../database/models/users");
const crypto_1 = require("../../services/crypto");
const auth_1 = require("../../services/auth");
const error_1 = require("../../components/error");
class UsersController {
    static async index(req, res) {
        try {
            const users = await users_1.default.getAllUsers();
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
    }
    static async postUser(req) {
        const { body } = req;
        const { name, username, email, password, repeatedPassword } = body;
        const obj = (0, create_1.userCreate)(name, username, email, password, repeatedPassword);
        const passwordHash = crypto_1.default.sha512Of(obj.password);
        const master = 0;
        await users_1.default.createUser(obj.name, obj.username, obj.email, master, passwordHash);
        return true;
    }
    static async postLogin(req, res) {
        const { body } = req;
        const { username, password } = body;
        const obj = (0, login_1.userLogin)(username, password);
        let user = await users_1.default.findByUsername(obj.username);
        if (user) {
            const passwordHash = crypto_1.default.sha512Of(obj.password);
            if (user.password === passwordHash)
                return await auth_1.default.authenticate(user);
        }
        throw new Error(error_1.EErrors.INVALID_LOGIN);
    }
}
exports.default = UsersController;
//# sourceMappingURL=index.js.map