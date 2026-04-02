let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

function printReceipt(order) {
  let receipt = [];
  let total = 0;
  receipt.push(`
      QTY   ITEM                 TOTAL`);
  order.forEach((item) => {
    const { itemName, quantity, unitPricePence } = item;
    const itemTotal = (quantity * unitPricePence) / 100;
    total += itemTotal;
    receipt.push(`
      ${quantity}     ${itemName.padEnd(20)} ${itemTotal.toFixed(2)}`);
  });
  receipt.push(`

      Total: ${total.toFixed(2)}`);
  console.log(...receipt);
}

printReceipt(order);
