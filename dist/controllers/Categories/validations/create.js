"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryCreate = void 0;
const error_1 = require("../../../components/error");
const Yup = require("yup");
const validators_1 = require("../../../helpers/validators");
const categoryCreate = (name) => {
    const body = { name };
    const schema = Yup.object().shape({
        name: Yup.string()
            .typeError(error_1.EErrors.INVALID_NAME)
            .required(error_1.EErrors.INVALID_NAME),
    });
    return (0, validators_1.getValidatedObjectFromSchema)(schema, body);
};
exports.categoryCreate = categoryCreate;
//# sourceMappingURL=create.js.map