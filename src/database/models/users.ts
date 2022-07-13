import { EErrors } from './../../components/error';
import Sequelize, { Model } from 'sequelize';
import Database from "../../services/database";
import { IUser } from "../../helpers/interfaces";

export default class Users extends Model {
    static sequelize: any = null;

    static init(sequelize: any) {
        super.init({
            username: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
            name: Sequelize.STRING,
            master: Sequelize.BOOLEAN,
            deleted: Sequelize.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true,
            tableName: 'users'
        });

        this.sequelize = sequelize;
        return this;
    }

    static async getAllUsers(): Promise<IUser[]> {
        const sql = await this.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: { deleted: 0 }
        });

        return Database.getResults<IUser>(sql);
    }

    static async findByUsername(username: string): Promise<IUser> {
        const sql = await this.findOne({
            where: { username }
        });

        let data = Database.getFirstResult<IUser>(sql);

        if (data)
            return data;

        throw new Error(EErrors.USER_NOT_FOUND);
    }

    static async createUser(
        name: string,
        username: string,
        email: string,
        master: number,
        password: string
    ): Promise<IUser> {
        const fromBody = { name, username, email, master, password, deleted: 0 };

        const sql = await this.create(fromBody);
        const data = Database.getFirstResult<IUser>(sql);

        if(data)
            return data;

        throw new Error(EErrors.CREATE_USER_FAIL);
    }
}