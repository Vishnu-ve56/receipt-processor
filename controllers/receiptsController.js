const { processReceiptData, receipts } = require('../services/receiptService');
const { calculatePoints, storeReceipt } = require('../services/receiptService');

// Function to process the receipt and return a receipt ID
const processReceipt = (req, res) => {
  const receipt = req.body;

  const { isValid, errorMessage, receiptId } = processReceiptData(receipt);

  if (!isValid) {
    return res.status(400).json({ error: errorMessage });
  }

  //In-memory store
  storeReceipt(receiptId, receipt);

  res.status(200).json({ id: receiptId });
};

// Function to get the points for a receipt by its ID
const getPoints = (req, res) => {
  const { id } = req.params;

  const receipt = receipts[id];

  if (!receipt) {
    return res.status(404).json({ error: 'Receipt not found' });
  }

  const points = calculatePoints(receipt);

  return res.status(200).json({ points });
};

module.exports = { processReceipt, getPoints };
