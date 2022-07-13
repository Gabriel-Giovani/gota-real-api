"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutesUp = exports.routeFn = void 0;
const _1 = require(".");
const controllers_1 = require("../controllers");
const Users_1 = require("../controllers/Users");
const FileUploadController2_1 = require("../controllers/FileUploadController2");
const users_1 = require("./users");
const products_1 = require("./products");
const categories_1 = require("./categories");
const banners_1 = require("./banners");
/**
 * englobes the controller function with default route behavior.
 * @param fn is the controller function callback
 * @returns route middleware englobed in default behavior function.
 */
const routeFn = (fn) => {
    return (req, res) => {
        controllers_1.default.RouteConstructor(req, res, fn);
    };
};
exports.routeFn = routeFn;
/**
 * enable routes for api consumption
 */
function setRoutesUp() {
    /**
     * login / auth routes
     */
    (0, _1.useRoute)('post', '/login', Users_1.default.postLogin, false);
    /**
     * create user route
     */
    (0, _1.useRoute)('post', '/user/create', Users_1.default.postUser, false);
    /**
     * file upload routes
     */
    (0, _1.useRoute)('post', '/upload/file', FileUploadController2_1.default.uploadFile, false);
    /**
     * user routes
     */
    (0, users_1.default)();
    /**
     * product routes
     */
    (0, products_1.default)();
    /**
     * category routes
     */
    (0, categories_1.default)();
    /**
     * Banner routes
     */
    (0, banners_1.default)();
}
exports.setRoutesUp = setRoutesUp;
//# sourceMappingURL=routes.js.map