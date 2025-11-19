const asyncHandler = require('../middleware/asyncHandler');
const Inventory = require('../models/inventory');

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Public
const getInventory = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;

  // Build query
  let query = { isActive: true };

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Search in name and description
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Execute query with pagination
  const inventory = await Inventory.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  // Get total count for pagination
  const total = await Inventory.countDocuments(query);

  res.status(200).json({
    success: true,
    count: inventory.length,
    total,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / limit)
    },
    data: inventory
  });
});

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Public
const getInventoryItem = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);

  if (!inventory) {
    return res.status(404).json({
      success: false,
      error: 'Inventory item not found'
    });
  }

  res.status(200).json({
    success: true,
    data: inventory
  });
});

// @desc    Create new inventory item
// @route   POST /api/inventory
// @access  Public
const createInventoryItem = asyncHandler(async (req, res) => {
  const inventory = await Inventory.create(req.body);

  res.status(201).json({
    success: true,
    data: inventory
  });
});

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Public
const updateInventoryItem = asyncHandler(async (req, res) => {
  let inventory = await Inventory.findById(req.params.id);

  if (!inventory) {
    return res.status(404).json({
      success: false,
      error: 'Inventory item not found'
    });
  }

  inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: inventory
  });
});

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Public
const deleteInventoryItem = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);

  if (!inventory) {
    return res.status(404).json({
      success: false,
      error: 'Inventory item not found'
    });
  }

  // Soft delete by setting isActive to false
  await Inventory.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get low stock items
// @route   GET /api/inventory/low-stock
// @access  Public
const getLowStockItems = asyncHandler(async (req, res) => {
  const lowStockItems = await Inventory.find({
    quantity: { $lte: '$reorderLevel' },
    isActive: true
  });

  res.status(200).json({
    success: true,
    count: lowStockItems.length,
    data: lowStockItems
  });
});

module.exports = {
  getInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getLowStockItems
};