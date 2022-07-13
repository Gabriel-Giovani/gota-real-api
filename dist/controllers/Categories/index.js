"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./validations/create");
const utils_1 = require("../../helpers/utils");
const categories_1 = require("../../database/models/categories");
class CategoriesController {
    static async index(req, res) {
        try {
            const categories = await categories_1.default.getAllCategories();
            return categories;
        }
        catch (err) {
            if (typeof err === 'object' && err !== null) {
                utils_1.default.sendErrorJSON(req, res, 200, err.toString());
            }
            else {
                console.log('Unexpected error', err);
            }
            return [];
        }
    }
    static async get(req, res) {
        try {
            const { params } = req;
            const { id } = params;
            const category = await categories_1.default.getCategory(Number(id));
            return category;
        }
        catch (err) {
            if (typeof err === 'object' && err !== null) {
                utils_1.default.sendErrorJSON(req, res, 200, err.toString());
            }
            else {
                console.log('Unexpected error', err);
            }
            return {};
        }
    }
    static async create(req, res) {
        const { body } = req;
        const { name } = body;
        const obj = (0, create_1.categoryCreate)(name);
        await categories_1.default.createCategory(obj.name);
        return true;
    }
    static async edit(req, res) {
        const { body, params } = req;
        const { id } = params;
        const { name } = body;
        const obj = (0, create_1.categoryCreate)(name);
        await categories_1.default.editCategory(Number(id), obj.name);
        return true;
    }
    static async delete(req, res) {
        const { params } = req;
        const { id } = params;
        await categories_1.default.deleteCategory(Number(id));
        return true;
    }
}
exports.default = CategoriesController;
//# sourceMappingURL=index.js.map