const { v4: uuidv4 } = require('uuid');

const receipts = {};

const processReceiptData = (receipt) => {

  if (!receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || !receipt.items || !receipt.total) {
    return { isValid: false, errorMessage: 'Missing required fields' };
  }

  const receiptId = uuidv4();

  receipts[receiptId] = receipt;

  return { isValid: true, errorMessage: null, receiptId };
};

module.exports = { processReceiptData };
