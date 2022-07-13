"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = require("./logger");
// TODO - importar models aqui
const Sequelize = require('sequelize');
const config = require('../database/config');
class DatabaseService {
    static create() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (process.env.DB_SILENCE)
                config.logging = false;
            DatabaseService.connection = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, config);
            const err = yield DatabaseService.connection.authenticate();
            if (err) {
                logger_1.logError(`Error connecting to DB: ${err.message}. Retrying in 10 seconds...`);
                setTimeout(() => {
                    DatabaseService.create();
                }, 10000);
            }
            else {
                logger_1.logInfo('Connected to Database!');
                DatabaseService.loadModels();
            }
            return DatabaseService;
        });
    }
    static loadModels() {
        // logInfo('Associating Models...');
        const models = {
        // model : model
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
    static getResults(sql) {
        let results = [];
        const extractRawData = (rawSubData) => {
            if (Array.isArray(rawSubData)) {
                for (let i = 0; i < rawSubData.length; i++) {
                    const subData = rawSubData[i];
                    const subDataRaw = getRawData(subData);
                    rawSubData[i] = subDataRaw;
                }
            }
            else if (rawSubData.sequelize && rawSubData.dataValues) {
                rawSubData = getRawData(rawSubData);
            }
        };
        const getRawData = (rowData) => {
            const rawData = rowData.dataValues;
            if (Array.isArray(rawData)) {
                let keys = Object.keys(rawData);
                keys.map((k) => {
                    let rawSubData = rawData[k];
                    rawData[k] = extractRawData(rawSubData);
                });
            }
            return Object.assign({}, rawData);
        };
        if (Array.isArray(sql)) {
            if (sql) {
                sql.map((row) => {
                    results.push(getRawData(row));
                });
            }
        }
        else {
            if (sql)
                results.push(getRawData(sql));
        }
        return results;
    }
    static getFirstResult(sql) {
        let results = DatabaseService.getResults(sql);
        if (Array.isArray(results)) {
            if (results.length) {
                return results[0];
            }
        }
        return undefined;
    }
}
DatabaseService.connection = null;
/**
 * default is the table name
 */
DatabaseService.models = {};
// const Database = new MySQLDatabase();
exports.default = DatabaseService;
//# sourceMappingURL=database.js.map