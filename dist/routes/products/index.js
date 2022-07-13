"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Products_1 = require("../../controllers/Products");
const setProductsRoutes = () => {
    (0, __1.useRoute)('get', '/products/all', Products_1.default.index, false);
    (0, __1.useRoute)('get', '/product/:id', Products_1.default.get, true);
    (0, __1.useRoute)('get', '/products/category/:category_id', Products_1.default.getByCategory, false);
    (0, __1.useRoute)('post', '/product', Products_1.default.create, true);
    (0, __1.useRoute)('put', '/product/:id', Products_1.default.edit, true);
    (0, __1.useRoute)('delete', '/product/:id', Products_1.default.delete, true);
};
exports.default = setProductsRoutes;
//# sourceMappingURL=index.js.map