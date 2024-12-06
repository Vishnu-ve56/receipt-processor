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

const storeReceipt = (receiptId, receipt) => {
  receipts[receiptId] = receipt;
};

const calculatePoints = (receipt) => {
  let points = 0;

  // Rule 1: 1 point for every alphanumeric character in the retailer name
  const retailerPoints = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
  points += retailerPoints;
  console.log(`Rule 1: Retailer name "${receipt.retailer}" has ${retailerPoints} alphanumeric characters.`);

  // Rule 2: 50 points if total is a round dollar amount (no cents)
  const total = parseFloat(receipt.total);
  const isRoundDollar = total.toFixed(2) === parseInt(receipt.total).toString();
  if (isRoundDollar) {
    points += 50;
  }
  console.log(`Rule 2: Total "${receipt.total}" is round dollar: ${isRoundDollar ? 'Yes' : 'No'}. Points: ${isRoundDollar ? 50 : 0}`);

  // Rule 3: 25 points if total is a multiple of 0.25
  const isMultipleOf25 = total % 0.25 === 0;
  if (isMultipleOf25) {
    points += 25;
  }
  console.log(`Rule 3: Total "${receipt.total}" is multiple of 0.25: ${isMultipleOf25 ? 'Yes' : 'No'}. Points: ${isMultipleOf25 ? 25 : 0}`);

  // Rule 4: 5 points for every 2 items
  const itemPairs = Math.floor(receipt.items.length / 2);
  points += itemPairs * 5;
  console.log(`Rule 4: ${receipt.items.length} items, ${itemPairs} pairs. Points: ${itemPairs * 5}`);

  // Rule 5: If item description length is a multiple of 3, multiply the price by 0.2 and round up
  receipt.items.forEach(item => {
    const itemLength = item.shortDescription.trim().length;
    if (itemLength % 3 === 0) {
      const itemPoints = Math.ceil(parseFloat(item.price) * 0.2);
      points += itemPoints;
      console.log(`Rule 5: Item "${item.shortDescription}" has description length ${itemLength}. Points: ${itemPoints}`);
    }
  });

  // Rule 6: 6 points if the day in purchase date is odd
  const purchaseDay = new Date(receipt.purchaseDate).getDate();
  if (purchaseDay % 2 !== 0) {
    points += 6;
  }
  console.log(`Rule 6: Purchase day "${purchaseDay}" is odd: ${purchaseDay % 2 !== 0 ? 'Yes' : 'No'}. Points: ${purchaseDay % 2 !== 0 ? 6 : 0}`);

  // Rule 7: 10 points if purchase time is between 2:00 PM and 4:00 PM
  const purchaseTime = parseInt(receipt.purchaseTime.split(':')[0]);
  if (purchaseTime >= 14 && purchaseTime < 16) {
    points += 10;
  }
  console.log(`Rule 7: Purchase time "${receipt.purchaseTime}" is between 2:00 PM and 4:00 PM: ${purchaseTime >= 14 && purchaseTime < 16 ? 'Yes' : 'No'}. Points: ${purchaseTime >= 14 && purchaseTime < 16 ? 10 : 0}`);

  console.log(`Total Points: ${points}`);
  return points;
};

module.exports = { processReceiptData, storeReceipt, calculatePoints, receipts };
