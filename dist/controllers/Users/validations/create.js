"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreate = void 0;
const error_1 = require("../../../components/error");
const Yup = require("yup");
const validators_1 = require("../../../helpers/validators");
const userCreate = (name, username, email, password, repeatedPassword) => {
    const body = {
        name,
        username,
        email,
        password,
        repeatedPassword
    };
    const schema = Yup.object().shape({
        name: Yup.string()
            .typeError(error_1.EErrors.INVALID_NAME)
            .required(error_1.EErrors.INVALID_NAME),
        username: Yup.string()
            .typeError(error_1.EErrors.INVALID_USERNAME)
            .required(error_1.EErrors.INVALID_USERNAME),
        email: Yup.string()
            .typeError(error_1.EErrors.INVALID_EMAIL)
            .required(error_1.EErrors.INVALID_EMAIL),
        password: Yup.string()
            .typeError(error_1.EErrors.INVALID_PASSWORD)
            .required(error_1.EErrors.INVALID_PASSWORD),
        repeatedPassword: Yup.string()
            .typeError(error_1.EErrors.INVALID_REPEATED_PASSWORD)
            .required(error_1.EErrors.INVALID_REPEATED_PASSWORD)
    });
    return (0, validators_1.getValidatedObjectFromSchema)(schema, body);
};
exports.userCreate = userCreate;
//# sourceMappingURL=create.js.map