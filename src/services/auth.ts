import TokenService from './token';
import { IUser } from '../helpers/interfaces';

export default class AuthService {
    static async authenticate(userdata: IUser): Promise<any> {
        const token = await TokenService.generateUserToken(userdata);

        const user = {
            id: userdata.id,
            email: userdata.email,
            name: userdata.name,
            master: userdata.master,
            token,
        };

        return user;
    }

    static async destroySession(resolve: any, reject: any): Promise<string> {
        return resolve(true);
    }
}