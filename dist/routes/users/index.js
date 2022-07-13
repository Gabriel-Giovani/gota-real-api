"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Users_1 = require("../../controllers/Users");
const setUsersRoutes = () => {
    (0, __1.useRoute)('get', '/users/all', Users_1.default.index, false);
};
exports.default = setUsersRoutes;
//# sourceMappingURL=index.js.map