import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { InventoryItem, inventory } from '../models/inventory';

const router = Router();

/**
 * POST /create-inventory
 * Create a new inventory item
 * 
 * Request body:
 * - name: Name of the inventory item (required)
 * - category: Category of the inventory item (required)
 * - quantity: Quantity of the inventory item (required, must be a positive number)
 * - price: Price of the inventory item (required, must be a positive number)
 * 
 * Response:
 * - Returns the created inventory item
 */
router.post('/create-inventory', [
    // adding validation rules for parameters
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').toFloat(),
    body('price').isNumeric().withMessage('Price must be a number').toFloat()
], (req: Request, res: Response, next: NextFunction) => {
    // if there are validation errors, return a 400 response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newItem: InventoryItem = req.body;
        newItem.id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
        inventory.push(newItem);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
});

/**
 * GET /inventory-all
 * Get the list of inventory items, supports category filtering and pagination
 * 
 * Necessory parameters:
 * - category: Category to filter inventory items by (optional)
 * - page: Current page number (optional, default is 1)
 * - limit: Number of inventory items per page (optional, default is 10)
 * 
 * Response:
 * - Returns the filtered and paginated list of inventory items
 */
router.get('/inventory-all', (req: Request, res: Response, next: NextFunction) => {
    try {
        // add new query parameters: category, page, and limit 
        const { category, page = 1, limit = 10 } = req.query;
        let result = inventory;

        // filtering by category
        if (category) {
            result = result.filter(item => item.category === category);
        }

        // calculating pagination start and end indexes
        const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
        const endIndex = startIndex + parseInt(limit as string);
        // getting the paginated result
        const paginatedResult = result.slice(startIndex, endIndex);

        // returning the paginated result
        res.json(paginatedResult);
    } catch (error) {
        next(error);
    }
});

/**
 * DELETE /delete-inventory/:id
 * Delete an inventory item by its ID
 * 
 * Response:
 * - Returns the deleted inventory item
 */
router.delete('/delete-inventory/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const itemIndex = inventory.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            const [deletedItem] = inventory.splice(itemIndex, 1);
            res.json(deletedItem); 
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        next(error);
    }
});


/**
 * PUT /update-inventory/:id
 * Update an inventory item by its ID
 * 
 * Request body (optional fields, at least one is required):
 * - name: Name of the inventory item
 * - category: Category of the inventory item
 * - quantity: Quantity of the inventory item (must be a positive number)
 * - price: Price of the inventory item (must be a positive number)
 * 
 * Response:
 * - Returns the updated inventory item
 */
router.put('/update-inventory/:id', [
    // adding validation rules for parameters
    body('name').optional().notEmpty().withMessage('Name must be a non-empty string'),
    body('category').optional().notEmpty().withMessage('Category must be a non-empty string'),
    body('quantity').optional().isNumeric().withMessage('Quantity must be a number').toFloat(),
    body('price').optional().isNumeric().withMessage('Price must be a number').toFloat()
], (req: Request, res: Response, next: NextFunction) => {
    // if there are validation errors, return a 400 response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = parseInt(req.params.id);
        const itemIndex = inventory.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            inventory[itemIndex] = { ...inventory[itemIndex], ...req.body };
            res.json(inventory[itemIndex]);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        next(error);
    }
});

/**
 * GET /inventory/:id
 * Get an inventory item by its ID
 * 
 * Response:
 * - Returns the inventory item with the specified ID
 */
router.get('/inventory/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const item = inventory.find(item => item.id === id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        next(error);
    }
});

export default router;
