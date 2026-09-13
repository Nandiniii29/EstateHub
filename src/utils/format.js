// Formats a number as Indian Rupees, e.g. 8500000 -> "₹85,00,000"
export function formatCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

// Formats a large price into a compact label, e.g. 8500000 -> "₹85 L", 24500000 -> "₹2.45 Cr"
export function formatCompactPrice(value) {
  if (!value) return '₹0';
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2).replace(/\.00$/, '')} L`;
  }
  return formatCurrency(value);
}

export function formatArea(area) {
  return `${area.toLocaleString('en-IN')} sq.ft`;
}
