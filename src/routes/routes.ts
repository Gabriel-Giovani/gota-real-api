import { useRoute } from '.';
import ControllerConstructor from '../controllers';
import UsersController from '../controllers/Users';
import FileUploadController from '../controllers/FileUploadController2';
import setUsersRoutes from './users';
import setProductsRoutes from './products';
import setCategoriesRoutes from './categories';
import setBannersRoutes from './banners';

/**
 * englobes the controller function with default route behavior.
 * @param fn is the controller function callback
 * @returns route middleware englobed in default behavior function.
 */
export const routeFn = (fn: any) => {
	return (req: any, res: any) => {
		ControllerConstructor.RouteConstructor(req, res, fn);
	};
};

/**
 * enable routes for api consumption
 */
export function setRoutesUp() {
	/**
	 * login / auth routes
	 */
	useRoute('post', '/login', UsersController.postLogin, false);

	/**
	 * create user route
	 */
	useRoute('post', '/user/create', UsersController.postUser, false);

	/**
	 * file upload routes
	 */
	useRoute('post', '/upload/file', FileUploadController.uploadFile, false);

	/**
	 * user routes
	 */
	setUsersRoutes();

	/**
	 * product routes
	 */
	setProductsRoutes();

	/**
	 * category routes
	 */
	setCategoriesRoutes();

	/**
	 * Banner routes
	 */
	setBannersRoutes();
}