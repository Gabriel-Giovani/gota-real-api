import { useRoute } from "..";
import CategoriesController from '../../controllers/Categories';

const setCategoriesRoutes = () => {
    useRoute('get', '/categories/all', CategoriesController.index, true);
    useRoute('get', '/category/:id', CategoriesController.get, true);
    useRoute('post', '/category', CategoriesController.create, true);
    useRoute('put', '/category/:id', CategoriesController.edit, true);
    useRoute('delete', '/category/:id', CategoriesController.delete, true);
};

export default setCategoriesRoutes;