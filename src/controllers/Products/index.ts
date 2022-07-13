import { productCreate } from './validations/create';
import { Request, Response } from 'express';
import Utils from '../../helpers/utils';
import Products from '../../database/models/products';

export default class ProductsController {
    static async index(req: Request, res: Response) {
        try {
            const products = await Products.getAllProducts();

            return products;
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
            const product = await Products.getProduct(Number(id));

            return product;
        } catch(err) {
            if (typeof err === 'object' && err !== null) {
				Utils.sendErrorJSON(req, res, 200, err.toString());
			} else {
				console.log('Unexpected error', err);
			}

            return {};
        }
    }

    static async getByCategory(req: Request, res: Response) {
        try {
            const { params } = req;
            const { category_id } = params;
            const products = await Products.getProductsByCategory(Number(category_id));

            return products;
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
        const { name, category, photo } = body;
        const obj = productCreate(name, category, photo);

        await Products.createProduct(obj.name, obj.category, obj.photo);
        return true;
    }

    static async edit(req: Request, res: Response) {
        const { body, params } = req;
        const { id } = params;
        const { name, category, photo } = body;
        const obj = productCreate(name, category, photo);

        await Products.editProduct(Number(id), obj.name, obj.category, obj.photo);
        return true;
    }

    static async delete(req: Request, res: Response) {
        const { params } = req;
        const { id } = params;

        await Products.deleteProduct(Number(id));
        return true;
    }
}