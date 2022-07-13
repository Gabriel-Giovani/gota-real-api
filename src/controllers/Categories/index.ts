import { categoryCreate } from './validations/create';
import { Request, Response } from 'express';
import Utils from '../../helpers/utils';
import Categories from '../../database/models/categories';

export default class CategoriesController {
    static async index(req: Request, res: Response) {
        try {
            const categories = await Categories.getAllCategories();

            return categories;
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
            const category = await Categories.getCategory(Number(id));

            return category;
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
        const { name } = body;
        const obj = categoryCreate(name);

        await Categories.createCategory(obj.name);
        return true;
    }

    static async edit(req: Request, res: Response) {
        const { body, params } = req;
        const { id } = params;
        const { name } = body;
        const obj = categoryCreate(name);

        await Categories.editCategory(Number(id), obj.name);
        return true;
    }

    static async delete(req: Request, res: Response) {
        const { params } = req;
        const { id } = params;

        await Categories.deleteCategory(Number(id));
        return true;
    }
}