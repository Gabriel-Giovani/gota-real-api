"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging = process.env.NODE_ENV === "test" ? false : true;

let envFile = ".env";
if (process.env.NODE_ENV === "test")
    envFile = ".env.test";
if (process.env.NODE_ENV === "production")
    envFile = ".env.production";

require('dotenv').config({ path: `${process.cwd()}/${envFile}` });

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging,
};