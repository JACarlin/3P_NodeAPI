import { Router } from 'express';
import { Request, Response } from 'express';
import { OrderController } from './controller';

export class OrderRoutes {

    static get routes(): Router {
        const router = Router();
        const orderController = new OrderController();
        router.post('/', orderController.createOrder);
        router.get('/:userId', orderController.getOrdersByUser);
        return router;
    }
}