"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./../../components/error");
const sequelize_1 = require("sequelize");
const database_1 = require("../../services/database");
class Users extends sequelize_1.Model {
    static init(sequelize) {
        super.init({
            username: sequelize_1.default.STRING,
            email: sequelize_1.default.STRING,
            password: sequelize_1.default.STRING,
            name: sequelize_1.default.STRING,
            master: sequelize_1.default.BOOLEAN,
            deleted: sequelize_1.default.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'users'
        });
        this.sequelize = sequelize;
        return this;
    }
    static async getAllUsers() {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });
        return database_1.default.getResults(sql);
    }
    static async findByUsername(username) {
        const sql = await this.findOne({
            where: { username }
        });
        let data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.USER_NOT_FOUND);
    }
    static async createUser(name, username, email, master, password) {
        const fromBody = { name, username, email, master, password, deleted: 0 };
        const sql = await this.create(fromBody);
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.CREATE_USER_FAIL);
    }
}
exports.default = Users;
Users.sequelize = null;
//# sourceMappingURL=users.js.map