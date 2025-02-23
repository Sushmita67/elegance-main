const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const request = require('request');

//cors
const cors = require('cors');

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();


app.use(express.json({ extended: false }));
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.options('*', cors()); 

const PORT = process.env.PORT || 5000;

// ROUTES

app.use('/api/auth', require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/address", require("./routes/address"));
app.use("", require("./routes/stripe"));
// In your Express.js server

app.get('/api/products/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug });
    res.json({ exists: !!product });
  } catch (err) {
    console.error('Error checking slug uniqueness:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/initiate-payment', (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://a.khalti.com/api/v2/epayment/initiate/',
    headers: {
      Authorization: 'key test_secret_key_bae210efa63945bc89a76c76afecf080', // Replace with your secret key
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body), // Use the request body from the frontend
  };

  request(options, (error, response) => {
    if (error) {
      return res.status(500).send({ error: 'Error initiating payment' });
    }
    res.send(JSON.parse(response.body));
  });
});



if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Route all other requests to the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
