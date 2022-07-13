"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require('dotenv').config({
    path: `${process.cwd()}/.env`
});
let app = new app_1.default();
app.start();
//# sourceMappingURL=index.js.map