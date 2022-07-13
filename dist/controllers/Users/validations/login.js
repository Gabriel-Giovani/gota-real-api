"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const Yup = require("yup");
const validators_1 = require("../../../helpers/validators");
const error_1 = require("../../../components/error");
const userLogin = (username, password) => {
    const body = {
        username,
        password
    };
    const schema = Yup.object().shape({
        username: Yup.string()
            .typeError(error_1.EErrors.INVALID_LOGIN)
            .required(error_1.EErrors.INVALID_LOGIN),
        password: Yup.string()
            .typeError(error_1.EErrors.INVALID_LOGIN)
            .required(error_1.EErrors.INVALID_LOGIN)
    });
    return (0, validators_1.getValidatedObjectFromSchema)(schema, body);
};
exports.userLogin = userLogin;
//# sourceMappingURL=login.js.map