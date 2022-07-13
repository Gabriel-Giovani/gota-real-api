import { logError, logInfo } from './logger';

import Users from '../database/models/users';
import Products from '../database/models/products';
import Categories from '../database/models/categories';
import Banner from '../database/models/banners';

const Sequelize = require('sequelize');
const config: any = require('../database/config');
class DatabaseService {
    static connection: any = null;
    /**
     * default is the table name
     */
    static models: any = {};

    static async create() {
        if (process.env.DB_SILENCE)
            config.logging = false;

        DatabaseService.connection = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, config);

        const err = await DatabaseService.connection.authenticate();

        if (err) {
            logError(`Error connecting to DB: ${err.message}. Retrying in 10 seconds...`);

            setTimeout(() => {
                DatabaseService.create();
            }, 10000);
        } else {
            logInfo('Connected to Database!');
            DatabaseService.loadModels();
        }

        return DatabaseService;
    }

    static loadModels() {
        // logInfo('Associating Models...');
        const models: any = {
            users: Users,
            products: Products,
            categories: Categories,
            banners: Banner
        };
        let keys = Object.keys(models);

        /**
         * initilizing models
         */
        keys.map((k) => {
            models[k].init(DatabaseService.connection);
        });

        /**
         * creating associations
         */
        keys.map((k) => {
            if (models[k].associate) {
                models[k].associate(models);
            }
        });

        DatabaseService.models = models;
        // logInfo('Associating Models done!');
    }

    static getResults<T = any>(sql: any) {
        let results: T[] = [];

        const extractRawData = (rawSubData: any) => {
            if (Array.isArray(rawSubData)) {
                for (let i = 0; i < rawSubData.length; i++) {
                    const subData = rawSubData[i];
                    const subDataRaw = getRawData(subData);
                    rawSubData[i] = subDataRaw;
                }
            } else if (rawSubData.sequelize && rawSubData.dataValues) {
                rawSubData = getRawData(rawSubData);
            }
        };

        const getRawData = (rowData: any) => {
            const rawData = rowData.dataValues;

            if (Array.isArray(rawData)) {
                let keys = Object.keys(rawData);
                keys.map((k: any) => {
                    let rawSubData = rawData[k];
                    rawData[k] = extractRawData(rawSubData);
                });
            }

            return Object.assign({}, rawData);
        };

        if (Array.isArray(sql)) {
            if (sql) {
                sql.map((row: any) => {
                    results.push(getRawData(row));
                });
            }
        } else {
            if (sql)
                results.push(getRawData(sql));
        }

        return results as T[];
    }

    static getFirstResult<T = any>(sql: any) : T | undefined {
        let results = DatabaseService.getResults<T>(sql);
        if (Array.isArray(results)) {
            if (results.length) {
                return results[0];
            }
        }
        return undefined;
    }
}

// const Database = new MySQLDatabase();
export default DatabaseService;