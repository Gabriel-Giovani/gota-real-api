"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./../../components/error");
const sequelize_1 = require("sequelize");
const database_1 = require("../../services/database");
class Category extends sequelize_1.Model {
    static init(sequelize) {
        super.init({
            name: sequelize_1.default.STRING,
            deleted: sequelize_1.default.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'categories'
        });
        this.sequelize = sequelize;
        return this;
    }
    static async getAllCategories() {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });
        return database_1.default.getResults(sql);
    }
    static async getCategory(id) {
        const sql = await this.findOne({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0, id }
        });
        return database_1.default.getFirstResult(sql);
    }
    static async createCategory(name) {
        const fromBody = { name, deleted: false };
        const sql = await this.create(fromBody);
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.CREATE_CATEGORY_FAIL);
    }
    static async editCategory(id, name) {
        const fromBody = { name };
        const sql = await this.update(fromBody, { where: { id } });
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.EDIT_CATEGORY_FAIL);
    }
    static async deleteCategory(id) {
        const fromBody = { deleted: true };
        const sql = await this.update(fromBody, { where: { id } });
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.REMOVE_CATEGORY_FAIL);
    }
}
exports.default = Category;
Category.sequelize = null;
//# sourceMappingURL=categories.js.map