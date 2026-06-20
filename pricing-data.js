// pricing-data.js
// Centralized pricing data that can be updated in one place

const pricingData = {
  packages: {
    essential: {
      name: "Essential Tour",
      price: 500,
      duration: "5 days",
      description: "Perfect for travelers on a budget who want to experience the highlights"
    },
    classic: {
      name: "Classic Explorer",
      price: 899,
      duration: "8 days",
      description: "Our bestselling package covering cultural and natural highlights"
    },
    luxury: {
      name: "Luxury Escape",
      price: 1599,
      duration: "12 days",
      description: "The ultimate Sri Lankan experience with luxury accommodations"
    }
  },
  currency: "$"
};

// Function to format price with currency symbol
function formatPrice(amount) {
  return `${pricingData.currency}${amount}`;
}