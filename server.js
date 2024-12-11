const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3008;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const apiKey = process.env.API_KEY;

  const apiEndpoint = 'https://api.web3forms.com/submit';

  axios.post(apiEndpoint, {
    access_key: apiKey,
    name,
    email,
    message
  })
  .then(response => {
    res.send('Form submitted successfully');
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Error submitting form');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
