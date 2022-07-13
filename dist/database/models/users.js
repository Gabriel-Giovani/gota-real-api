"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
    static getAllUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sql = yield this.findAll({
                attributes: { exclude: ['updatedAt'] },
                where: { deleted: 0 }
            });
            console.log(sql);
            return database_1.default.getResults(sql);
        });
    }
}
Users.sequelize = null;
exports.default = Users;
//# sourceMappingURL=users.js.map