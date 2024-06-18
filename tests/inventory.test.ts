import request from 'supertest';
import app from '../src/app';

describe('Inventory API', () => {
    // test to list all inventory items
    it('should list all inventory items', async () => {
        const response = await request(app).get('/inventory-all');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new inventory item', async () => {
        const newItem = { name: 'Hat', category: 'Apparel', quantity: 25, price: 15.99 };

        const initialResponse = await request(app).get('/inventory-all');
        const initialLength = initialResponse.body.length;

        const response = await request(app).post('/create-inventory').send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newItem);

        const finalResponse = await request(app).get('/inventory-all');
        expect(finalResponse.body.length).toBe(initialLength + 1);
    });

    // test to handle invalid input data
    it('should return 400 for invalid input data', async () => {
        const invalidItem = { name: '', category: 'Apparel', quantity: 'invalid', price: -10 };
        const response = await request(app).post('/create-inventory').send(invalidItem);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeInstanceOf(Array);
    });

    // test to update an inventory item
    it('should update an inventory item', async () => {
        const updateData = { name: 'Updated Hat', quantity: 50 };
        const newItem = { name: 'Hat', category: 'Apparel', quantity: 25, price: 15.99 };
        const createResponse = await request(app).post('/create-inventory').send(newItem);
        const itemId = createResponse.body.id;

        const response = await request(app).put(`/update-inventory/${itemId}`).send(updateData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updateData.name);
        expect(response.body.quantity).toBe(updateData.quantity);
    });

    // test to delete an inventory item
    it('should delete an inventory item', async () => {
        const newItem = { name: 'Hat', category: 'Apparel', quantity: 25, price: 15.99 };
        const createResponse = await request(app).post('/create-inventory').send(newItem);
        const itemId = createResponse.body.id;

        const response = await request(app).delete(`/delete-inventory/${itemId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(itemId);

        const getResponse = await request(app).get(`/inventory/${itemId}`);
        expect(getResponse.status).toBe(404);
    });

    // test to get a single inventory item by id
    it('should get a single inventory item by id', async () => {
        const newItem = { name: 'Hat', category: 'Apparel', quantity: 25, price: 15.99 };
        const createResponse = await request(app).post('/create-inventory').send(newItem);
        const itemId = createResponse.body.id;

        const response = await request(app).get(`/inventory/${itemId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(itemId);
        expect(response.body).toMatchObject(newItem);
    });
});
