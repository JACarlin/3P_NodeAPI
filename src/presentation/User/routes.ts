import { Router } from 'express';
import { Request, Response } from 'express';
import { UserController } from './controller';

export class UserRoutes {

    static get routes(): Router {
        const router = Router();
        const userController = new UserController();
        router.post('/register', userController.registerUser);
        router.post('/login', userController.loginUser);
        router.get('/profile/:id', userController.getUserProfile);
        return router;
    }
}