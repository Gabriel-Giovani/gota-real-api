"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
exports.default = (req, res, next) => {
    /**
     * generate uuid
     */
    const uuid = crypto.randomBytes(8).toString('hex');
    /**
     * setup prefixes
     */
    const reqPrefix = 'req-';
    const resPrefix = 'res-';
    /**
     * assign request
     */
    req.uuid = `${reqPrefix}${uuid}`;
    req.resUuid = `${resPrefix}${uuid}`;
    /**
     * execute next in the flux
     */
    next();
};
//# sourceMappingURL=requestUuid.js.map