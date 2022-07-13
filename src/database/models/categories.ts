import { EErrors } from './../../components/error';
import Sequelize, { Model } from 'sequelize';
import Database from "../../services/database";
import { ICategory } from "../../helpers/interfaces";

export default class Category extends Model {
    static sequelize: any = null;

    static init(sequelize: any) {
        super.init({
            name: Sequelize.STRING,
            deleted: Sequelize.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'categories'
        });

        this.sequelize = sequelize;
        return this;
    }

    static async getAllCategories(): Promise<ICategory[]> {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });

        return Database.getResults<ICategory>(sql);
    }

    static async getCategory(id: Number): Promise<ICategory | undefined> {
        const sql = await this.findOne({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0, id }
        });

        return Database.getFirstResult<ICategory>(sql);
    }

    static async createCategory(name: string): Promise<ICategory> {
        const fromBody = { name, deleted: false };

        const sql = await this.create(fromBody);
        const data = Database.getFirstResult<ICategory>(sql);

        if(data)
            return data;

        throw new Error(EErrors.CREATE_CATEGORY_FAIL);
    }

    static async editCategory(
        id: number,
        name: string
    ): Promise<ICategory> {
        const fromBody = { name };
        const sql = await this.update(fromBody, { where: { id } });
        const data = Database.getFirstResult<ICategory>(sql);

        if(data)
            return data;

        throw new Error(EErrors.EDIT_CATEGORY_FAIL);
    }

    static async deleteCategory(id: number): Promise<ICategory> {
        const fromBody = { deleted: true };
        const sql = await this.update(fromBody, { where: { id } });
        const data = Database.getFirstResult<ICategory>(sql);

        if(data)
            return data;

        throw new Error(EErrors.REMOVE_CATEGORY_FAIL);
    }
}