# Inventory Management API

This project is an inventory management API built with Node.js and Express. It allows you to manage inventory items with features such as listing, creating, updating, and deleting items. The project is written in TypeScript and includes validation and error handling.


## Setup

1. **Clone the repository**


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

## Refactoring
Sure, here's the refactored section of the README with concise English explanations:

---

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

### List All Inventory Items

- **URL:** `/inventory-all`
- **Method:** `GET`
- **New Query Parameters:**
  - `category` (optional): Filter items by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
  ```

### Create a New Inventory Item

- **URL:** `/create-inventory`
- **Method:** `POST`
- **New Validation Measures:
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

### Delete an Inventory Item

- **URL:** `/delete-inventory/:id`
- **Method:** `DELETE`
- **Response:** Returns the inventory item with the specified ID

### Get a Single Inventory Item by ID

- **URL:** `/inventory/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "id": 4,
    "name": "Hat",
    "category": "Apparel",
    "quantity": 25,
    "price": 15.99
  }
  ```

## New Features

- **Validation and Error Handling:** 
  - Added validation for request payloads using `express-validator` to ensure data integrity.
  - Implemented error handling middleware to manage unexpected errors gracefully.
  
- **Filtering and Pagination:**
  - Support for filtering inventory items by category.
  - Pagination support to limit the number of items returned per request.
  
- **CRUD Operations:**
  - Create, update, delete, and retrieve inventory items.
  - Comprehensive tests to ensure API endpoints function correctly.

## Development

- **Install nodemon:** Automatically restart the server on code changes.
  ```bash
  npm install --save-dev nodemon
  ```

- **Development script in `package.json`:**
  ```json
  "scripts": {
    "dev": "nodemon --watch src --exec ts-node src/index.ts"
  }
  ```
