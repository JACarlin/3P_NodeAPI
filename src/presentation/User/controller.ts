import { Request, Response } from 'express';
import { UserModel } from '../../data/models/user.model';

export class UserController {
    // Método para registrar un nuevo usuario
    public registerUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password, address } = req.body;
            const creationDate = new Date();
            const newUser = await UserModel.create({
                name, email, password, address, creationDate
            });
            return res.json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Método para hacer login (simulando un login básico)
    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            // Aquí se puede agregar una validación más compleja para el login
            const user = await UserModel.findOne({ email, password });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            return res.json({ message: 'Login successful', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Método para obtener el perfil de un usuario
    public getUserProfile = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
