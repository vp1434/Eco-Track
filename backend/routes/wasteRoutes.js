const express = require('express');
const router = express.Router();
const { generateWasteData } = require('../data/dummyData');

// In-memory storage for waste data
let wasteData = generateWasteData();

// GET /api/waste - Get all waste data
router.get('/', (req, res) => {
  try {
    const { date } = req.query;

    let filteredData = wasteData;

    // Filter by date if provided
    if (date) {
      filteredData = filteredData.filter(item => item.date === date);
    }

    res.json({
      success: true,
      count: filteredData.length,
      data: filteredData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching waste data',
      error: error.message
    });
  }
});

// POST /api/waste - Add new waste data
router.post('/', (req, res) => {
  try {
    const { date, organic, recyclable, non_recyclable } = req.body;

    // Validate required fields
    if (!date || organic === undefined || recyclable === undefined || non_recyclable === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: date, organic, recyclable, non_recyclable'
      });
    }

    const newEntry = {
      date,
      organic: parseFloat(organic),
      recyclable: parseFloat(recyclable),
      non_recyclable: parseFloat(non_recyclable),
      timestamp: new Date().toISOString()
    };

    wasteData.push(newEntry);

    res.status(201).json({
      success: true,
      message: 'Waste data added successfully',
      data: newEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding waste data',
      error: error.message
    });
  }
});

module.exports = router;
