import { Request, Response } from 'express';
import { OrderModel } from '../../data/models/order.model';
import { EmailService } from '../../domain/service/email.service';
import { generateOrderEmailTemplate } from '../../domain/templates/email.template';
import { UserModel } from '../../data/models/user.model';
import { ProductModel } from '../../data/models/product.model';

export class OrderController {
    // Crear una nueva orden
    public createOrder = async (req: Request, res: Response) => {
        try {
            const { userId, products, total, deliveryLocation } = req.body;

            if (!userId || !products || !total || !deliveryLocation) {
                return res.status(400).json({ error: 'Missing required fields.' });
            }

            // Crear nueva orden
            const newOrder = new OrderModel({
                userId,
                products,
                total,
                deliveryLocation,
            });

            await newOrder.save();
            const productDetails: any[] = await ProductModel.find({
                '_id': { $in: products.map((p: { productId: any; }) => p.productId) }
            });
            if (!productDetails.length) {
                return res.status(404).json({ error: 'Products not found.' });
            }
            const productsWithQuantity = productDetails.map(product => {
                const quantity = products.find((p: { productId: { toString: () => any; }; }) => p.productId.toString() === product._id.toString())?.quantity || 0;
                return {
                    ...product.toObject(),
                    quantity 
                };
            });

            const htmlBody = generateOrderEmailTemplate(
                userId,
                productsWithQuantity,
                total,
                deliveryLocation.lat,
                deliveryLocation.lng,
                newOrder.creationDate
            );
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const emailService = new EmailService();
            await emailService.sendEmail({
                to: user.email,
                subject: 'Orden creada exitosamente',
                htmlBody: htmlBody,
            });

            return res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    };

    // Obtener órdenes por usuario
    public getOrdersByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required.' });
            }

            const orders = await OrderModel.find({ userId }).populate('products.productId');

            if (!orders.length) {
                return res.status(404).json({ error: 'No orders found for this user.' });
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    };
}
