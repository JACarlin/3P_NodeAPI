import { Router } from 'express';
import { Request, Response } from 'express';
import { ProductController } from './controller';

export class ProductRoutes {

    static get routes(): Router {
        const router = Router();
        const productController = new ProductController();
        router.get('/', productController.getProducts);
        router.get('/:id', productController.getProductById);
        router.post('/', productController.createProduct);
        router.put('/:id', productController.updateProduct);
        router.delete('/:id', productController.deleteProduct);
        return router;
    }
}