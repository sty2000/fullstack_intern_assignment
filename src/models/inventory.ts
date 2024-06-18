// this file contains the model and initial data for the inventory items
export interface InventoryItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
}

export let inventory: InventoryItem[] = [
    { id: 1, name: 'T-Shirt', category: 'Apparel', quantity: 100, price: 19.99 },
    { id: 2, name: 'Jeans', category: 'Apparel', quantity: 50, price: 49.99 },
    { id: 3, name: 'Sneakers', category: 'Footwear', quantity: 75, price: 89.99 },
];
