"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../services/logger");
class Utils {
    static sendJSON(res, status, payload) {
        res.status(status).json({
            success: true,
            payload
        });
    }
    static sendErrorJSON(req, res, status, withMessage) {
        if (process.env.NODE_ENV !== 'test') {
            console.error(` ---------------------------------------`);
            console.error(`|  route: ${req ? req.originalUrl : ''}`);
            console.error(`|  method: ${req ? req.method.toUpperCase() : ''}`);
            console.error(`|  error:`);
            console.error(`|  `);
            console.error(`|  ${withMessage}`);
            console.error(` ---------------------------------------`);
        }
        res.status(status).json({
            success: false,
            payload: {
                message: withMessage,
            }
        });
    }
    static toBrazilianDecimal(num) {
        let numero = num.toFixed(2).split('.');
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
    static overrideDefaults() {
        // JavaScript
        // Array
        Array.prototype.mapAsync = async function (callbackfn) {
            for (let i = 0; i < this.length; i++) {
                await callbackfn(this[i], i, this);
            }
            return this;
        };
        // Text
        String.prototype.replaceAt = function (index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        };
        String.prototype.getNumberValue = function () {
            let val = this;
            if (typeof val !== `string`)
                val = val.toString();
            let lis = val.lastIndexOf(',');
            let lip = val.lastIndexOf('.');
            if (lis < 0 && lip < 0) {
                val = val + "00";
            }
            if (lis === val.length - 1 || lip === val.length - 1) {
                val = val + "00";
            }
            if (lis === val.length - 2 || lip === val.length - 2) {
                val = val + "0";
            }
            val = val.replace(/\./g, '');
            val = val.replace(/\,/g, '');
            let num = Number.parseInt(val.toString());
            num = num * 0.01;
            num = Math.round((num) * 100) / 100;
            return num;
        };
        // Date
        Date.prototype.isValid = function () {
            // An invalid date object returns NaN for getTime() and NaN is the only
            // object not strictly equal to itself.
            return this.getTime() === this.getTime();
        };
    }
    static validateId(id) {
        let num = Number.parseInt(id);
        if (Number.isNaN(num))
            throw new Error(`INVALID_ID`);
        return num;
    }
    static findId(exp) {
        for (let i = 0; i < 2147483648; i++) {
            let mod = exp >> i;
            if (mod === 1)
                return i + 1;
        }
        return 0;
    }
    static onlyNumberString(text) {
        if (!text)
            return text;
        text = text.replace(/[^0-9]/g, '');
        return text;
    }
    static async threadDelay(time) {
        return await new Promise((r, rj) => setTimeout(() => r(true), time));
    }
    static getMimeType(mimetype) {
        try {
            let mime = mimetype.split('/');
            if (mime.length > 1) {
                let type = mime.pop();
                if (type) {
                    let types = type.split(';');
                    return types[0];
                }
            }
            return mime[0];
        }
        catch (err) {
            (0, logger_1.logError)(err);
            return mimetype;
        }
    }
    ;
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map