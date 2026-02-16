const express = require('express');
const router = express.Router();
const { generateEnergyData } = require('../data/dummyData');

// In-memory storage for energy data
let energyData = generateEnergyData();

// GET /api/energy - Get all energy data
router.get('/', (req, res) => {
  try {
    const { block, date } = req.query;

    let filteredData = energyData;

    // Filter by block if provided
    if (block) {
      filteredData = filteredData.filter(item => item.block === block);
    }

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
      message: 'Error fetching energy data',
      error: error.message
    });
  }
});

// POST /api/energy - Add new energy data
router.post('/', (req, res) => {
  try {
    const { date, block, energy } = req.body;

    // Validate required fields
    if (!date || !block || energy === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: date, block, energy'
      });
    }

    const newEntry = {
      date,
      block,
      energy: parseFloat(energy),
      timestamp: new Date().toISOString()
    };

    energyData.push(newEntry);

    res.status(201).json({
      success: true,
      message: 'Energy data added successfully',
      data: newEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding energy data',
      error: error.message
    });
  }
});

module.exports = router;
