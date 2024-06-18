import express, { Request, Response, NextFunction } from 'express';
import inventoryRoutes from './routes/inventory';

// create an express app and use the inventory routes
const app = express();
app.use(express.json());
app.use(inventoryRoutes);

// middleware to handle errors 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
