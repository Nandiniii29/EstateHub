// Calculates the monthly EMI using the standard reducing-balance formula.
// loanAmount: principal in rupees, annualRate: percentage (e.g. 8.5), years: loan tenure
export function calculateEmi(loanAmount, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) {
    return loanAmount / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (loanAmount * monthlyRate * factor) / (factor - 1);
  return emi;
}

// Returns a full EMI breakdown: monthly EMI, total interest and total payment.
export function getEmiBreakdown({ propertyPrice, downPayment, annualRate, years }) {
  const loanAmount = Math.max(propertyPrice - downPayment, 0);
  const emi = calculateEmi(loanAmount, annualRate, years);
  const totalPayment = emi * years * 12;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount,
    emi,
    totalInterest: Math.max(totalInterest, 0),
    totalPayment,
  };
}

// Builds a simplified year-by-year amortization series (principal paid vs interest paid so far),
// used to draw the amortization line chart without a charting library.
export function getAmortizationSeries({ loanAmount, annualRate, years }) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const emi = calculateEmi(loanAmount, annualRate, years);

  let balance = loanAmount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;
  const yearlyPoints = [];

  for (let month = 1; month <= months; month += 1) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = emi - interestForMonth;

    balance = Math.max(balance - principalForMonth, 0);
    cumulativePrincipal += principalForMonth;
    cumulativeInterest += interestForMonth;

    if (month % 12 === 0 || month === months) {
      yearlyPoints.push({
        year: Math.ceil(month / 12),
        principalPaid: cumulativePrincipal,
        interestPaid: cumulativeInterest,
      });
    }
  }

  return yearlyPoints;
}
