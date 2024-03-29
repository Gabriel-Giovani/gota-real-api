import { useRoute } from "..";
import ProductsController from '../../controllers/Products';

const setProductsRoutes = () => {
    useRoute('get', '/products/all', ProductsController.index, false);
    useRoute('get', '/product/:id', ProductsController.get, true);
    useRoute('get', '/products/category/:category_id', ProductsController.getByCategory, false);
    useRoute('post', '/product', ProductsController.create, true);
    useRoute('put', '/product/:id', ProductsController.edit, true);
    useRoute('delete', '/product/:id', ProductsController.delete, true);
};

export default setProductsRoutes;