import { userCreate } from './validations/create';
import { userLogin } from './validations/login';
import { Request, Response } from 'express';
import Utils from '../../helpers/utils';
import Users from '../../database/models/users';
import CryptoService from '../../services/crypto';
import AuthService from '../../services/auth';
import { EErrors } from '../../components/error';

export default class UsersController {
    static async index(req: Request, res: Response) {
        try {
            const users = await Users.getAllUsers();

            return { users };
        } catch(err) {
            if (typeof err === 'object' && err !== null) {
				Utils.sendErrorJSON(req, res, 200, err.toString());
			} else {
				console.log('Unexpected error', err);
			}

            return [];
        }
    }

    static async postUser(req: Request){
        const { body } = req;
        const {name, username, email, password, repeatedPassword } = body;
        const obj = userCreate(name, username, email, password, repeatedPassword);
        const passwordHash = CryptoService.sha512Of(obj.password);
        const master = 0;

        await Users.createUser(obj.name, obj.username, obj.email, master, passwordHash);
        return true;
    }

    static async postLogin(req: Request, res: Response) {
        const { body } = req;
        const { username, password } = body;

        const obj = userLogin(username, password);
        let user = await Users.findByUsername(obj.username);

        if (user) {
            const passwordHash = CryptoService.sha512Of(obj.password);

            if (user.password === passwordHash)
                return await AuthService.authenticate(user);
        }

        throw new Error(EErrors.INVALID_LOGIN);
    }
}