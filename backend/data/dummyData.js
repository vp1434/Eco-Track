// Dummy data generator for Energy and Waste Monitoring System

// Generate random number within range
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate dates for the last N days
const generateDates = (days = 7) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Department/Block names
const blocks = ['CSE', 'Hostel', 'Library', 'Labs'];

// Generate energy data
const generateEnergyData = () => {
  const dates = generateDates(7);
  const data = [];

  dates.forEach(date => {
    blocks.forEach(block => {
      data.push({
        date,
        block,
        energy: randomInRange(200, 500), // kWh
        timestamp: new Date(date).toISOString()
      });
    });
  });

  return data;
};

// Generate waste data
const generateWasteData = () => {
  const dates = generateDates(7);
  const data = [];

  dates.forEach(date => {
    data.push({
      date,
      organic: randomInRange(20, 50), // kg
      recyclable: randomInRange(15, 35), // kg
      non_recyclable: randomInRange(10, 25), // kg
      timestamp: new Date(date).toISOString()
    });
  });

  return data;
};

// Generate dashboard summary
const generateDashboardSummary = (days = 7) => {
  const today = new Date().toISOString().split('T')[0];
  const energyToday = randomInRange(800, 1200);
  const wasteToday = randomInRange(50, 100);

  return {
    date: today,
    totalEnergyToday: energyToday, // kWh
    totalWasteToday: wasteToday, // kg
    alertsCount: randomInRange(1, 5),
    sustainabilityScore: randomInRange(65, 95), // percentage
    energyTrend: generateDates(days).map(date => ({
      date,
      energy: randomInRange(800, 1200)
    })),
    wasteDistribution: {
      organic: randomInRange(30, 45),
      recyclable: randomInRange(20, 35),
      non_recyclable: randomInRange(15, 25)
    }
  };
};

// Generate alerts
const generateAlerts = () => {
  const alerts = [
    { id: 1, type: 'energy', message: 'High energy usage detected in Hostel Block', severity: 'warning', timestamp: new Date().toISOString() },
    { id: 2, type: 'waste', message: 'Waste bin overflow warning in CSE Block', severity: 'critical', timestamp: new Date().toISOString() },
    { id: 3, type: 'energy', message: 'Energy consumption 15% above average in Labs', severity: 'info', timestamp: new Date().toISOString() }
  ];

  return alerts.slice(0, randomInRange(1, 3));
};

// Generate AI predictions
const generatePredictions = () => {
  const energyData = generateEnergyData();
  const recentEnergy = energyData.slice(-7);
  const avgEnergy = recentEnergy.reduce((sum, item) => sum + item.energy, 0) / recentEnergy.length;
  const predictedEnergy = Math.round(avgEnergy * randomInRange(95, 105) / 100);

  return {
    nextDayEnergyPrediction: predictedEnergy,
    confidence: randomInRange(85, 95),
    suggestions: [
      'Schedule high-energy tasks during off-peak hours',
      'Consider installing motion-sensor lights in common areas',
      'Review HVAC settings in Hostel Block',
      'Implement waste segregation awareness program'
    ].slice(0, randomInRange(2, 4))
  };
};

module.exports = {
  generateEnergyData,
  generateWasteData,
  generateDashboardSummary,
  generateAlerts,
  generatePredictions
};
