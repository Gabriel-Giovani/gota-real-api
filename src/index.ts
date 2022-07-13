import App from "./app";

require('dotenv').config({
    path: `${process.cwd()}/.env`
});

let app = new App();
app.start();