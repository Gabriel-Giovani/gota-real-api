const path = require('path');
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env"
require('dotenv').config({ path: path.join(__dirname, `../${envFile}`) });

export const DB_SQL_LOG = true;

export const API_SECRET = 'iYzZkltBjYqmVIMcGTXoO7SG15ckGxwN';

export const FILES_PATH = process.env.FILES_PATH ? process.env.FILES_PATH : 'file';
export const FILES_API_URL = process.env.FILES_API_URL ? process.env.FILES_API_URL : 'http://localhost:8659';