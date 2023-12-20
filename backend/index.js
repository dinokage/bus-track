const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()
// Replace this with your actual MongoDB connection details
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = 'busT';
const COLLECTION_NAME = 'drivers';

app.use(express.json());
app.use(cors());

let client;

// Connect to MongoDB on server start
(async () => {
  try {
    client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();

// Function to create a new driver
async function createDriver(routeID, location) {
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  try {
    if (!Array.isArray(location) || location.length !== 2) {
      throw new Error('Invalid coordinates provided!');
    }

    const driver = {
      routeID,
      location,
    };

    await collection.findOneAndUpdate(driver);
    console.log('Driver created successfully!');
  } catch (error) {
    console.error('Error creating driver:', error);
  }
}

// Function to fetch all drivers
async function getDrivers() {
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  try {
    const drivers = await collection.find({}).toArray();
    return drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
}

// API route for creating a new driver
app.post('/api/bus/new/:routeID', async (req, res) => {
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
  
    try {
      const routeID = req.params.routeID;
      const data = req.body;
      const location = data.coords;
  
      // Verify required data
      if (!Array.isArray(location) || location.length !== 2) {
        throw new Error('Invalid coordinates provided!');
      }
  
      // Update existing driver or create new if not found
      const update = {
        $set: {
          location,
        },
      };
      const options = { returnDocument: 'after' }; // Return updated document
  
      const driver = await collection.findOneAndUpdate({ routeID }, update, options);
  
      if (!driver) {
        // Driver not found, create new one
        console.log(`No driver found with routeID ${routeID}, creating new`);
        await collection.insertOne({ routeID, location });
        res.send('Added new driver successfully!');
      } else {
        // Driver updated successfully
        res.send('Driver updated successfully!');
      }
    } catch (error) {
      console.error('Error updating driver:', error);
      res.status(400).send({ message: error.message });
    }
  });

// API route for fetching all drivers
app.get('/api/bus/all', async (req, res) => {
  const drivers = await getDrivers();
  res.send(drivers);
});

//API route to fetch driver based on route ID 
app.get('/api/bus/:routeID', async (req, res) => {
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    try {
        const drivers = await collection.findOne({routeID: req.params.routeID});
        if (drivers == null) res.send("Invalid Route ID")
        else
    res.send(drivers);
} catch (error) {
    console.error('Error fetching drivers:', error);
}
})
app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));