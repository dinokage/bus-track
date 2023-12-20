const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  routeID: String,
  // Define GeoJSON point for location
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [[Number]], // Array of [longitude, latitude]
  },
})

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver