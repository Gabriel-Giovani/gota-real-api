import { Request, Response } from 'express';
import Utils from '../helpers/utils';

export default class ControllerConstructor {
	static async RouteConstructor(req: Request, res: Response, next: any) {
		try {
			const payload = await next(req, res);
			Utils.sendJSON(res, 200, payload);
		} catch (err) {
			if (typeof err === 'object' && err !== null) {
				Utils.sendErrorJSON(req, res, 200, err.toString());
			} else {
				console.log('Unexpected error', err);
			}
		}
	}
}