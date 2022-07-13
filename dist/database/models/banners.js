"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./../../components/error");
const sequelize_1 = require("sequelize");
const database_1 = require("../../services/database");
class Banner extends sequelize_1.Model {
    static init(sequelize) {
        super.init({
            title: sequelize_1.default.STRING,
            link: sequelize_1.default.STRING,
            photo: sequelize_1.default.STRING,
            deleted: sequelize_1.default.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'banners'
        });
        this.sequelize = sequelize;
        return this;
    }
    static async getAllBanners() {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });
        return database_1.default.getResults(sql);
    }
    static async getBanner(id) {
        const sql = await this.findOne({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0, id }
        });
        return database_1.default.getFirstResult(sql);
    }
    static async createBanner(title, link, photo) {
        const fromBody = { title, link, photo, deleted: false };
        const sql = await this.create(fromBody);
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.CREATE_BANNER_FAIL);
    }
    static async editBanner(id, title, link, photo) {
        const fromBody = { title, link, photo };
        const sql = await this.update(fromBody, { where: { id } });
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.EDIT_BANNER_FAIL);
    }
    static async deleteBanner(id) {
        const fromBody = { deleted: true };
        const sql = await this.update(fromBody, { where: { id } });
        const data = database_1.default.getFirstResult(sql);
        if (data)
            return data;
        throw new Error(error_1.EErrors.REMOVE_BANNER_FAIL);
    }
}
exports.default = Banner;
Banner.sequelize = null;
//# sourceMappingURL=banners.js.map