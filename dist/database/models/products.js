"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./../../components/error");
const sequelize_1 = require("sequelize");
const database_1 = require("../../services/database");
class Users extends sequelize_1.Model {
    static init(sequelize) {
        super.init({
            name: sequelize_1.default.STRING,
            category: sequelize_1.default.INTEGER,
            photo: sequelize_1.default.STRING,
            deleted: sequelize_1.default.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'products'
        });
        this.sequelize = sequelize;
        return this;
    }
    static async getAllProducts() {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });
        return database_1.default.getResults(sql);
    }
    static async getProductsByCategory(category) {
        const sql = await this.findAll({
            attribues: { exclude: ['updatedAt'] },
            where: { deleted: 0, category }
        });
        return database_1.default.getResults(sql);
    }
    static async getProduct(id) {
        const sql = await this.findOne({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0, id }
        });
        return database_1.default.getFirstResult(sql);
    }
    static async createProduct(name, category, photo) {
        const fromBody = { name, category, photo, deleted: false };
        const sql = await this.create(fromBody);
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.CREATE_PRODUCT_FAIL);
    }
    static async editProduct(id, name, category, photo) {
        const fromBody = { name, category, photo };
        const sql = await this.update(fromBody, { where: { id } });
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.EDIT_PRODUCT_FAIL);
    }
    static async deleteProduct(id) {
        const fromBody = { deleted: 1 };
        const sql = await this.update(fromBody, { where: { id } });
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.REMOVE_PRODUCT_FAIL);
    }
}
exports.default = Users;
Users.sequelize = null;
//# sourceMappingURL=products.js.map