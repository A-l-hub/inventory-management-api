const express = require('express');
const router = express.Router();

// Temporary simple routes - we'll add proper controllers later
let inventoryItems = [
  {
    id: 1,
    name: "Sample Laptop",
    category: "Electronics",
    price: 999.99,
    quantity: 10
  }
];

// GET all inventory items
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: inventoryItems
  });
});

// GET single item
router.get('/:id', (req, res) => {
  const item = inventoryItems.find(item => item.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  res.json({
    success: true,
    data: item
  });
});

// CREATE new item
router.post('/', (req, res) => {
  const newItem = {
    id: inventoryItems.length + 1,
    ...req.body
  };
  inventoryItems.push(newItem);
  res.status(201).json({
    success: true,
    data: newItem
  });
});

// UPDATE item
router.put('/:id', (req, res) => {
  const index = inventoryItems.findIndex(item => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  inventoryItems[index] = { ...inventoryItems[index], ...req.body };
  res.json({
    success: true,
    data: inventoryItems[index]
  });
});

// DELETE item
router.delete('/:id', (req, res) => {
  const index = inventoryItems.findIndex(item => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Item not found'
    });
  }
  inventoryItems.splice(index, 1);
  res.json({
    success: true,
    data: {}
  });
});

module.exports = router;