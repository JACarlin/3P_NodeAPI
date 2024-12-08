import {Router} from 'express';
import { ProductRoutes } from './Product/routes';
import { UserRoutes } from './User/routes';
import { OrderRoutes } from './Order/routes';

export class AppRoutes {
    static get routes() : Router{
        const router = Router();
        router.use("/api/products",ProductRoutes.routes)
        router.use("/api/users",UserRoutes.routes)
        router.use("/api/orders",OrderRoutes.routes)
        return router
    }
}