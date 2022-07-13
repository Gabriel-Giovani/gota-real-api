import { useRoute } from '..';
import UsersController from '../../controllers/Users';

const setUsersRoutes = () => {
    useRoute('get', '/users/all', UsersController.index, false);
};

export default setUsersRoutes;