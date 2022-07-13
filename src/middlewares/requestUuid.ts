import { Request, Response } from 'express';
const crypto = require('crypto');

export default (req: Request, res: Response, next: any) => {
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