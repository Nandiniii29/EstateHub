import { useState, useMemo } from 'react';
import { getEmiBreakdown, getAmortizationSeries } from '../utils/calculations.js';
import { formatCurrency } from '../utils/format.js';
import { EmiDonut, AmortizationChart } from './EmiChart.jsx';
import './EmiCalculatorPanel.css';

export default function EmiCalculatorPanel({ initialPrice = 5000000 }) {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // useMemo: recompute the breakdown and amortization series only when an
  // input actually changes, not on every unrelated re-render.
  const { loanAmount, emi, totalInterest, totalPayment } = useMemo(
    () =>
      getEmiBreakdown({
        propertyPrice: Number(propertyPrice) || 0,
        downPayment: Number(downPayment) || 0,
        annualRate: Number(interestRate) || 0,
        years: Number(tenure) || 1,
      }),
    [propertyPrice, downPayment, interestRate, tenure],
  );

  const amortizationSeries = useMemo(
    () =>
      getAmortizationSeries({
        loanAmount,
        annualRate: Number(interestRate) || 0,
        years: Number(tenure) || 1,
      }),
    [loanAmount, interestRate, tenure],
  );

  return (
    <div className="emi-panel">
      <div className="emi-panel-inputs card">
        <h3>EMI Calculator</h3>
        <p>Calculate your estimated monthly home loan payment.</p>

        <div className="emi-input-grid">
          <div className="field">
            <label htmlFor="emi-price">Property Price (₹)</label>
            <input
              id="emi-price"
              type="number"
              min="0"
              value={propertyPrice}
              onChange={(event) => setPropertyPrice(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="emi-down">Down Payment (₹)</label>
            <input
              id="emi-down"
              type="number"
              min="0"
              value={downPayment}
              onChange={(event) => setDownPayment(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="emi-rate">Interest Rate (% p.a.)</label>
            <input
              id="emi-rate"
              type="number"
              min="0"
              step="0.1"
              value={interestRate}
              onChange={(event) => setInterestRate(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="emi-tenure">Loan Tenure</label>
            <select id="emi-tenure" value={tenure} onChange={(event) => setTenure(Number(event.target.value))}>
              {[5, 10, 15, 20, 25, 30].map((years) => (
                <option key={years} value={years}>
                  {years} Years
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="emi-panel-results">
        <div className="emi-result-hero card">
          <span>Estimated Monthly EMI</span>
          <strong>{formatCurrency(emi)}</strong>
        </div>

        <div className="emi-stat-row">
          <div className="emi-stat card">
            <span>Loan Amount</span>
            <strong>{formatCurrency(loanAmount)}</strong>
          </div>
          <div className="emi-stat card">
            <span>Total Interest</span>
            <strong>{formatCurrency(totalInterest)}</strong>
          </div>
          <div className="emi-stat card">
            <span>Total Payment</span>
            <strong>{formatCurrency(totalPayment)}</strong>
          </div>
        </div>

        <div className="emi-visual-grid">
          <div className="card emi-visual-card">
            <h4>Payment Breakdown</h4>
            <EmiDonut principal={loanAmount} interest={totalInterest} />
          </div>
          <div className="card emi-visual-card">
            <h4>Amortization Overview</h4>
            <p className="emi-visual-subtitle">Principal vs interest paid over the loan tenure</p>
            <AmortizationChart series={amortizationSeries} />
          </div>
        </div>

        <div className="card emi-summary">
          <h4>Loan Summary</h4>
          <dl>
            <div><dt>Property Price</dt><dd>{formatCurrency(propertyPrice)}</dd></div>
            <div><dt>Down Payment</dt><dd>{formatCurrency(downPayment)}</dd></div>
            <div><dt>Loan Amount</dt><dd>{formatCurrency(loanAmount)}</dd></div>
            <div><dt>Interest Rate</dt><dd>{interestRate}%</dd></div>
            <div><dt>Loan Tenure</dt><dd>{tenure} years</dd></div>
            <div><dt>Monthly EMI</dt><dd>{formatCurrency(emi)}</dd></div>
            <div><dt>Total Interest</dt><dd>{formatCurrency(totalInterest)}</dd></div>
            <div><dt>Total Payment</dt><dd>{formatCurrency(totalPayment)}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}
