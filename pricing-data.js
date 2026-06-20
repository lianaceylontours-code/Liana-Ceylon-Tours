// pricing-data.js
// Centralized pricing data that can be updated in one place

const pricingData = {
  packages: {
    classic: {
      name: "Heritage & Nature Escape",
      price: 70,
      duration: "Per day",
      description: "Our bestselling package covering cultural and natural highlights"
    }
  },
  currency: "$"
};

// Function to format price with currency symbol
function formatPrice(amount) {
  return `${pricingData.currency}${amount}`;
}
