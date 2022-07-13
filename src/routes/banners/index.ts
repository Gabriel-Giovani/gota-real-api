import { useRoute } from "..";
import BannersController from '../../controllers/Banners';

const setBannersRoutes = () => {
    useRoute('get', '/banners/all', BannersController.index, true);
    useRoute('get', '/banner/:id', BannersController.get, true);
    useRoute('post', '/banner', BannersController.create, true);
    useRoute('put', '/banner/:id', BannersController.edit, true);
    useRoute('delete', '/banner/:id', BannersController.delete, true);
};

export default setBannersRoutes;