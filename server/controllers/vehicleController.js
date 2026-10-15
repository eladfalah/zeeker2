const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת הרכבים', error: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findOne({ licensePlate: id });

    if (!vehicle) {
      return res.status(404).json({ message: 'רכב לא נמצא' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת הרכב', error: error.message });
  }
};
