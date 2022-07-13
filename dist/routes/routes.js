"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const controllers_1 = require("../controllers");
const Users_1 = require("../controllers/Users");
// import FileUploadController from '../controllers/FileUploadController2';
/**
 * englobes the controller function with default route behavior.
 * @param fn is the controller function callback
 * @returns route middleware englobed in default behavior function.
 */
exports.routeFn = (fn) => {
    return (req, res) => {
        controllers_1.default.RouteConstructor(req, res, fn);
    };
};
/**
 * enable routes for api consumption
 */
function setRoutesUp() {
    /**
     * login / auth routes
     */
    // useRoute('post', '/login', UsersController.postLogin, false);
    /**
     * set user preferences
     */
    // useRoute('post', '/user/preferences', UsersController.postUserPreferences, false);
    /**
     * create user route
     */
    // useRoute('post', '/user/create', UsersController.postUser, false);
    /**
     * file upload routes
     */
    // useRoute('post', '/upload/file', FileUploadController.uploadFile, false);
    _1.useRoute('get', '/users/all', Users_1.default.index, false);
}
exports.setRoutesUp = setRoutesUp;
//# sourceMappingURL=routes.js.map