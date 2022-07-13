"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./validations/create");
const utils_1 = require("../../helpers/utils");
const banners_1 = require("../../database/models/banners");
class BannersController {
    static async index(req, res) {
        try {
            const banners = await banners_1.default.getAllBanners();
            return banners;
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
            const banner = await banners_1.default.getBanner(Number(id));
            return banner;
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
        const { title, link, photo } = body;
        const obj = (0, create_1.bannerCreate)(title, link, photo);
        await banners_1.default.createBanner(obj.title, obj.link, obj.photo);
        return true;
    }
    static async edit(req, res) {
        const { body, params } = req;
        const { id } = params;
        const { title, link, photo } = body;
        const obj = (0, create_1.bannerCreate)(title, link, photo);
        await banners_1.default.editBanner(Number(id), obj.title, obj.link, obj.photo);
        return true;
    }
    static async delete(req, res) {
        const { params } = req;
        const { id } = params;
        await banners_1.default.deleteBanner(Number(id));
        return true;
    }
}
exports.default = BannersController;
//# sourceMappingURL=index.js.map