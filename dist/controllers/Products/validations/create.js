"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreate = void 0;
const error_1 = require("../../../components/error");
const Yup = require("yup");
const validators_1 = require("../../../helpers/validators");
const productCreate = (name, category, photo) => {
    const body = {
        name,
        category,
        photo
    };
    const schema = Yup.object().shape({
        name: Yup.string()
            .typeError(error_1.EErrors.INVALID_NAME)
            .required(error_1.EErrors.INVALID_NAME),
        category: Yup.number()
            .typeError(error_1.EErrors.INVALID_CATEGORY)
            .required(error_1.EErrors.INVALID_CATEGORY),
        photo: Yup.string()
            .typeError(error_1.EErrors.INVALID_PHOTO)
            .required(error_1.EErrors.INVALID_PHOTO)
    });
    return (0, validators_1.getValidatedObjectFromSchema)(schema, body);
};
exports.productCreate = productCreate;
//# sourceMappingURL=create.js.map