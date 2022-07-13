import TokenService from '../services/token';
import { Response } from 'express';
import { routeFn, setRoutesUp } from './routes';

import App from '../app';
import { logError, logInfo } from '../services/logger';

export default function setRouter(): any {
    setRoutesUp();

    useRoute('get', '/healthz', healthCheck, false);

    App.instance.get('/', (req: any, res: any) => {
        res.status(200).send('powered by Greencave.co.');
    });
}

export function useRoute(method: string, route: string, func: any, locked: boolean = true) {
    const app = App.instance;
    let registerRoute: any = app.get.bind(app);

    switch (method) {
        case "post": {
            registerRoute = app.post.bind(app);
            break;
        }
        case "put": {
            registerRoute = app.put.bind(app);
            break;
        }
        case "delete": {
            registerRoute = app.delete.bind(app);
            break;
        }
    }

    if (locked) {
        registerRoute(route, TokenService.authorizeToken, routeFn(func));
        registerRoute(`${route}`, TokenService.authorizeToken, routeFn(func));
    }
    else {
        registerRoute(route, routeFn(func));
        registerRoute(`${route}`, routeFn(func));
    }

}

function healthCheck(req: any, res: any) {
    if (App.fullyLoaded) {
        res.json({
            healthy: true,
        });
    } else {
        res.status(404).send();
    }
}

export async function denyAccess(res: Response) {
    logError('Access Denied.');
    res.status(401).send();
}