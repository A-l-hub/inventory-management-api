# Inventory Management API

A simple RESTful API for inventory management built with Node.js, Express.

## Features

- CRUD operations for inventory items
- RESTful API design
- JSON responses
- CORS enabled

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/inventory` - Get all items
- `POST /api/inventory` - Create new item
- `GET /api/inventory/:id` - Get single item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Test with Postman on `http://localhost:5000`

## Technologies Used

- Node.js
- Express.js
- MongoDB (optional)
- Postman for testing