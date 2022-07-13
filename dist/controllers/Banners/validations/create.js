"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerCreate = void 0;
const error_1 = require("../../../components/error");
const Yup = require("yup");
const validators_1 = require("../../../helpers/validators");
const bannerCreate = (title, link, photo) => {
    const body = {
        title,
        link,
        photo
    };
    const schema = Yup.object().shape({
        title: Yup.string()
            .typeError(error_1.EErrors.INVALID_NAME)
            .required(error_1.EErrors.INVALID_NAME),
        link: Yup.string()
            .typeError(error_1.EErrors.INVALID_LINK)
            .required(error_1.EErrors.INVALID_LINK),
        photo: Yup.string()
            .typeError(error_1.EErrors.INVALID_PHOTO)
            .required(error_1.EErrors.INVALID_PHOTO)
    });
    return (0, validators_1.getValidatedObjectFromSchema)(schema, body);
};
exports.bannerCreate = bannerCreate;
//# sourceMappingURL=create.js.map