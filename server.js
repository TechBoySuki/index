const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Create a schema and model for Orders
const orderSchema = new mongoose.Schema({
    meal: String,
    quantity: Number,
    address: String
});
const Order = mongoose.model('Order', orderSchema);

// Use body-parser to parse HTTP POST data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true }));

// Handle form submissions to the '/order' endpoint
app.post('/order', (req, res) => {
    const newOrder = new Order({
        meal: req.body.meal,
        quantity: req.body.quantity,
        address: req.body.address
    });
    newOrder.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Order Received!");
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
