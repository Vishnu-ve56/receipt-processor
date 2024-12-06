const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const receiptRoutes = require('./routes/receipts');

app.use('/receipts', receiptRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
