"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Categories_1 = require("../../controllers/Categories");
const setCategoriesRoutes = () => {
    (0, __1.useRoute)('get', '/categories/all', Categories_1.default.index, false);
    (0, __1.useRoute)('get', '/category/:id', Categories_1.default.get, true);
    (0, __1.useRoute)('post', '/category', Categories_1.default.create, true);
    (0, __1.useRoute)('put', '/category/:id', Categories_1.default.edit, true);
    (0, __1.useRoute)('delete', '/category/:id', Categories_1.default.delete, true);
};
exports.default = setCategoriesRoutes;
//# sourceMappingURL=index.js.map