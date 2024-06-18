# Inventory Management API

This project is an updated version of inventory management API. It allows you to manage inventory items with expanded CRUD operations. The project is written in TypeScript and includes validation, error handling and support of more paramters.


## Setup

1. **Clone the repository：**

   ```bash
   git clone https://github.com/sty2000/fullstack_intern_assignment.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server in development mode:**

   ```bash
   npm run start
   ```

### Running Tests

1. **Install testing dependencies:**

   ```bash
   npm install --save-dev jest supertest @types/jest @types/supertest ts-jest
   ```

2. **Run the tests:**

   ```bash
   npm test
   ```

## Refactored Project Structure

The project has been refactored to improve maintainability and clarity. Below is a summary of the purpose of each new file and directory:

- **src/models/inventory.ts**: Defines the `InventoryItem` interface and holds the inventory data structure.
- **src/routes/inventory.ts**: Contains the API routes for inventory management, including creating, reading, updating, and deleting items.
- **src/app.ts**: Initializes the Express application, sets up middleware, and includes the inventory routes.
- **src/index.ts**: Entry point of the application, responsible for starting the server.
- **tests/inventory.test.ts**: Contains test cases for the inventory API using `jest` and `supertest`.
- **jest.config.js**: Configuration file for `jest` to enable TypeScript support and set the test environment.
- **package.json**: Manages project dependencies, scripts, and metadata.
- **tsconfig.json**: TypeScript configuration file that specifies compiler options and the structure of the project.

## Update of API Endpoints

### GET All Inventory Items

- **URL:** `/inventory-all`
- **Method:** `GET`
- **New Query Parameters:**
  - `category` (optional): Filter items by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
 

### POST a New Inventory Item

- **URL:** `/create-inventory`
- **Method:** `POST`
- **New Validation Measures:**
  - **Name:** Must be a non-empty string.
  - **Category:** Must be a non-empty string.
  - **Quantity:** Must be a number and greater than 0. String numbers can be converted automatically.
  - **Price:** Must be a number and greater than 0. String numbers can be converted automatically.

- **Error Handling:**
  - If validation fails, returns a `400 Bad Request` with an array of error messages.

### Update an Inventory Item

- **URL:** `/update-inventory/:id`
- **Method:** `PUT`
-  **Response:** Returns the updated inventory item

### DELETE an Inventory Item

- **URL:** `/delete-inventory/:id`
- **Method:** `DELETE`
- **Response:** Returns the inventory item with the specified ID

### GET a Single Inventory Item by ID

- **URL:** `/inventory/:id`
- **Method:** `GET`
- **Response:** Returns the inventory item with the specified ID

