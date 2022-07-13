import { EErrors } from './../../components/error';
import Sequelize, { Model } from 'sequelize';
import Database from "../../services/database";
import { IProduct } from "../../helpers/interfaces";

export default class Users extends Model {
    static sequelize: any = null;

    static init(sequelize: any) {
        super.init({
            name: Sequelize.STRING,
            category: Sequelize.INTEGER,
            photo: Sequelize.STRING,
            deleted: Sequelize.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'products'
        });

        this.sequelize = sequelize;
        return this;
    }

    static async getAllProducts(): Promise<IProduct[]> {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });

        return Database.getResults<IProduct>(sql);
    }

    static async getProductsByCategory(category: number): Promise<IProduct[]> {
        const sql = await this.findAll({
            attribues: { exclude: ['updatedAt'] },
            where: { deleted: 0, category }
        });

        return Database.getResults<IProduct>(sql);
    }

    static async getProduct(id: Number): Promise<IProduct | undefined> {
        const sql = await this.findOne({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0, id }
        });

        return Database.getFirstResult<IProduct>(sql);
    }

    static async createProduct(
        name: string,
        category: number,
        photo: string
    ): Promise<IProduct> {
        const fromBody = { name, category, photo, deleted: false };

        const sql = await this.create(fromBody);
        const data = Database.getFirstResult<IProduct>(sql);

        if(data)
            return data;

        throw new Error(EErrors.CREATE_PRODUCT_FAIL);
    }

    static async editProduct(
        id: number,
        name: string,
        category: number,
        photo: string
    ): Promise<IProduct> {
        const fromBody = { name, category, photo };
        const sql = await this.update(fromBody, { where: { id } });
        const data = Database.getFirstResult<IProduct>(sql);

        if(data)
            return data;

        throw new Error(EErrors.EDIT_PRODUCT_FAIL);
    }

    static async deleteProduct(id: number): Promise<IProduct> {
        const fromBody = { deleted: 1 };
        const sql = await this.update(fromBody, { where: { id } });
        const data = Database.getFirstResult<IProduct>(sql);

        if(data)
            return data;

        throw new Error(EErrors.REMOVE_PRODUCT_FAIL);
    }
}