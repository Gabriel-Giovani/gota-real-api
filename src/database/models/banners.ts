import { EErrors } from './../../components/error';
import Sequelize, { Model } from 'sequelize';
import Database from "../../services/database";
import { IBanner } from "../../helpers/interfaces";

export default class Banner extends Model {
    static sequelize: any = null;

    static init(sequelize: any) {
        super.init({
            title: Sequelize.STRING,
            link: Sequelize.STRING,
            photo: Sequelize.STRING,
            deleted: Sequelize.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'banners'
        });

        this.sequelize = sequelize;
        return this;
    }

    static async getAllBanners(): Promise<IBanner[]> {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });

        return Database.getResults<IBanner>(sql);
    }

    static async getBanner(id: Number): Promise<IBanner | undefined> {
        const sql = await this.findOne({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0, id }
        });

        return Database.getFirstResult<IBanner>(sql);
    }

    static async createBanner(title: string, link: string, photo: string): Promise<IBanner> {
        const fromBody = { title, link, photo, deleted: false };

        const sql = await this.create(fromBody);
        const data = Database.getFirstResult<IBanner>(sql);

        if(data)
            return data;

        throw new Error(EErrors.CREATE_BANNER_FAIL);
    }

    static async editBanner(
        id: number,
        title: string,
        link: string,
        photo: string
    ): Promise<IBanner> {
        const fromBody = { title, link, photo };
        const sql = await this.update(fromBody, { where: { id } });
        const data = Database.getFirstResult<IBanner>(sql);

        if(data)
            return data;

        throw new Error(EErrors.EDIT_BANNER_FAIL);
    }

    static async deleteBanner(id: number): Promise<IBanner> {
        const fromBody = { deleted: true };
        const sql = await this.update(fromBody, { where: { id } });
        const data = Database.getFirstResult<IBanner>(sql);

        if(data)
            return data;

        throw new Error(EErrors.REMOVE_BANNER_FAIL);
    }
}