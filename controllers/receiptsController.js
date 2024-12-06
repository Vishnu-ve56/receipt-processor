const { processReceiptData } = require('../services/receiptService');

const processReceipt = (req, res) => {
  const receipt = req.body;

  const { isValid, errorMessage, receiptId } = processReceiptData(receipt);

  if (!isValid) {
    return res.status(400).json({ error: errorMessage });
  }

  res.status(200).json({ id: receiptId });
};

module.exports = { processReceipt };
