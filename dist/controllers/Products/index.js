"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./validations/create");
const utils_1 = require("../../helpers/utils");
const products_1 = require("../../database/models/products");
class ProductsController {
    static async index(req, res) {
        try {
            const products = await products_1.default.getAllProducts();
            return products;
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
            const product = await products_1.default.getProduct(Number(id));
            return product;
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
    static async getByCategory(req, res) {
        try {
            const { params } = req;
            const { category_id } = params;
            const products = await products_1.default.getProductsByCategory(Number(category_id));
            return products;
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
        const { name, category, photo } = body;
        const obj = (0, create_1.productCreate)(name, category, photo);
        await products_1.default.createProduct(obj.name, obj.category, obj.photo);
        return true;
    }
    static async edit(req, res) {
        const { body, params } = req;
        const { id } = params;
        const { name, category, photo } = body;
        const obj = (0, create_1.productCreate)(name, category, photo);
        await products_1.default.editProduct(Number(id), obj.name, obj.category, obj.photo);
        return true;
    }
    static async delete(req, res) {
        const { params } = req;
        const { id } = params;
        await products_1.default.deleteProduct(Number(id));
        return true;
    }
}
exports.default = ProductsController;
//# sourceMappingURL=index.js.map