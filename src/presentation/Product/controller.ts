import { Request, Response } from 'express';
import { ProductModel } from '../../data/models/product.model';

export class ProductController {

    public getProducts = async (req: Request, res: Response) => {
        try {
            const products = await ProductModel.find();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public getProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public createProduct = async (req: Request, res: Response) => {
        try {
            const { name, description, price, url, category } = req.body;
            const creationDate = new Date();
            const newProduct = await ProductModel.create({
                name, description, price, url, category, creationDate
            });
            return res.json(newProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, description, price, url, category } = req.body;
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
                name, description, price, url, category
            }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(deletedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
