// Import the express module
const express = require('express');

// Import the function to connect to MongoDB
const connectToMongo = require('./db');

// Import routes for user signup and posts
const signupRoutes = require('./routes/signupRoutes');
const postRoutes = require('./routes/postRoutes');
const resetRoute = require('./routes/resetRoute');

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    // Allow requests from http://localhost:3000
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // Allow specific headers in the request
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next(); // Move to the next middleware or route handler
});

// Connect to MongoDB database
connectToMongo();

// for signup routes
app.use('/api', signupRoutes);

// for post routes
app.use('/api', postRoutes);

//for the reset password route
app.use('/api', resetRoute);

// Define the port number
const PORT = 2000;

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!'); // Send 'Hello World!' as the response
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
