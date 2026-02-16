const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const { generateDashboardSummary, generateAlerts, generatePredictions } = require('../data/dummyData');

// GET /api/dashboard/summary - Get dashboard summary
router.get('/summary', (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const summary = generateDashboardSummary(days);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard summary',
      error: error.message
    });
  }
});

// GET /api/dashboard/alerts - Get alerts
router.get('/alerts', (req, res) => {
  try {
    const alerts = generateAlerts();

    res.json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alerts',
      error: error.message
    });
  }
});

// GET /api/dashboard/predictions - Get AI predictions
router.get('/predictions', (req, res) => {
  // Path to python script
  const scriptPath = path.join(__dirname, '../ml/forecast.py');

  // Spawn python process
  const pythonProcess = spawn('python', [scriptPath]);

  let dataString = '';
  let errorString = '';

  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorString += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error(`Error: ${errorString}`);

      // Fallback to dummy data if ML fails
      console.log('Falling back to dummy predictions...');
      const fallbackData = generatePredictions();
      return res.json({
        success: true,
        source: 'fallback',
        data: fallbackData
      });
    }

    try {
      // Parse output from Python script
      // The script prints formatted JSON
      // We need to find the JSON part if there are warnings
      const jsonStart = dataString.indexOf('{');
      const jsonEnd = dataString.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonContent = dataString.substring(jsonStart, jsonEnd + 1);
        const result = JSON.parse(jsonContent);

        if (result.success) {
          return res.json({
            success: true,
            source: 'ml',
            data: result.data
          });
        }
      }

      throw new Error('Invalid output format from ML script');

    } catch (parseError) {
      console.error('Error parsing Python output:', parseError);
      const fallbackData = generatePredictions();
      return res.json({
        success: true,
        source: 'fallback',
        data: fallbackData
      });
    }
  });

  // Handle spawn error (e.g., python not found)
  pythonProcess.on('error', (err) => {
    console.error('Failed to start Python process:', err);
    const fallbackData = generatePredictions();
    return res.json({
      success: true,
      source: 'fallback',
      data: fallbackData
    });
  });
});

module.exports = router;
