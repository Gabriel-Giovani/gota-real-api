"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Banners_1 = require("../../controllers/Banners");
const setBannersRoutes = () => {
    (0, __1.useRoute)('get', '/banners/all', Banners_1.default.index, true);
    (0, __1.useRoute)('get', '/banner/:id', Banners_1.default.get, true);
    (0, __1.useRoute)('post', '/banner', Banners_1.default.create, true);
    (0, __1.useRoute)('put', '/banner/:id', Banners_1.default.edit, true);
    (0, __1.useRoute)('delete', '/banner/:id', Banners_1.default.delete, true);
};
exports.default = setBannersRoutes;
//# sourceMappingURL=index.js.map