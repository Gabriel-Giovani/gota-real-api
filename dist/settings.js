"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILES_API_URL = exports.FILES_PATH = exports.API_SECRET = exports.DB_SQL_LOG = void 0;
const path = require('path');
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
require('dotenv').config({ path: path.join(__dirname, `../${envFile}`) });
exports.DB_SQL_LOG = true;
exports.API_SECRET = 'iYzZkltBjYqmVIMcGTXoO7SG15ckGxwN';
exports.FILES_PATH = process.env.FILES_PATH ? process.env.FILES_PATH : 'file';
exports.FILES_API_URL = process.env.FILES_API_URL ? process.env.FILES_API_URL : 'http://localhost:8659';
//# sourceMappingURL=settings.js.map