import { bannerCreate } from './validations/create';
import { Request, Response } from 'express';
import Utils from '../../helpers/utils';
import Banners from '../../database/models/banners';

export default class BannersController {
    static async index(req: Request, res: Response) {
        try {
            const banners = await Banners.getAllBanners();

            return banners;
        } catch(err) {
            if (typeof err === 'object' && err !== null) {
				Utils.sendErrorJSON(req, res, 200, err.toString());
			} else {
				console.log('Unexpected error', err);
			}

            return [];
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const { params } = req;
            const { id } = params;
            const banner = await Banners.getBanner(Number(id));

            return banner;
        } catch(err) {
            if (typeof err === 'object' && err !== null) {
				Utils.sendErrorJSON(req, res, 200, err.toString());
			} else {
				console.log('Unexpected error', err);
			}

            return {};
        }
    }

    static async create(req: Request, res: Response) {
        const { body } = req;
        const { title, link, photo } = body;
        const obj = bannerCreate(title, link, photo);

        await Banners.createBanner(obj.title, obj.link, obj.photo);
        return true;
    }

    static async edit(req: Request, res: Response) {
        const { body, params } = req;
        const { id } = params;
        const { title, link, photo } = body;
        const obj = bannerCreate(title, link, photo);

        await Banners.editBanner(Number(id), obj.title, obj.link, obj.photo);
        return true;
    }

    static async delete(req: Request, res: Response) {
        const { params } = req;
        const { id } = params;

        await Banners.deleteBanner(Number(id));
        return true;
    }
}