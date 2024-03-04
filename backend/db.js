// Import the mongoose module
const mongoose = require('mongoose');

// MongoDB Atlas connection URI
const mongoURI = 'mongodb+srv://vishalmishra270799:yK5elxZN2eVfHdxa@cluster0.mgbw55b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB Atlas
const connectToMongo = async () => {
    try {
        // Attempt to connect to the MongoDB Atlas cluster
        await mongoose.connect(mongoURI);
        console.log('MongoDB Atlas connected successfully'); // Log success message if connection is successful
    } catch (err) {
        console.log("Mongo Error", err); // Log error message if connection fails
    }
};

// Export the connectToMongo function to be used in other files
module.exports = connectToMongo;
