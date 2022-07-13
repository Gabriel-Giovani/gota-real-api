import { EErrors } from '../components/error';
import * as Settings from '../settings';
import * as jwt from 'jsonwebtoken';
import Utils from '../helpers/utils';
import { Request, Response } from 'express';

export default class TokenService {
	static generateUserToken(data: any): string {
		let tokenData = {
			...data,
			exp: this.expirationDate(3600)
		};

		let token = jwt.sign(tokenData, Settings.API_SECRET);
		return token;
	}

	static expirationDate(minutes: number): number {
		let now = Date.now();
		let till = now + (minutes * 60) * 1000 * 24 * 7;
		return till;
	}

	static async authorizeToken(req: Request, res: Response, next: any) {
		let token = req.headers['token'];
		if (!token || Array.isArray(token)) {
			Utils.sendErrorJSON(req, res, 403, 'NO_TOKEN');
			return;
		}
		jwt.verify(token, Settings.API_SECRET, (err: any, decoded: any) => {
			if (err) {
				Utils.sendErrorJSON(req, res, 403, 'INVALID_TOKEN');
				return;
			}

			req.userId = decoded.id;
			req.token = token as string;
			next();
		});
	}

	static async getDecodedToken(token: string) {
		const decoded = await new Promise<any>((res, rej) => {
			jwt.verify(token, Settings.API_SECRET, async function (err: any, decoded: any) {
			if (err)
				rej({ err });
			res(decoded);
			});
		});
		
		return decoded;
	}
}