import { formatCurrency } from '../utils/format.js';
import './EmiChart.css';

// Donut breakdown built with a CSS conic-gradient (no chart library).
export function EmiDonut({ principal, interest }) {
  const total = principal + interest || 1;
  const principalPercent = (principal / total) * 100;

  const style = {
    background: `conic-gradient(var(--gold) 0% ${principalPercent}%, var(--navy) ${principalPercent}% 100%)`,
  };

  return (
    <div className="emi-donut-wrap">
      <div className="emi-donut" style={style}>
        <div className="emi-donut-hole">
          <span className="emi-donut-label">Total Payment</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </div>
      <div className="emi-donut-legend">
        <div className="legend-row">
          <span className="legend-dot" style={{ background: 'var(--gold)' }} />
          Principal Amount
          <strong>{formatCurrency(principal)}</strong>
          <span className="legend-percent">{principalPercent.toFixed(0)}%</span>
        </div>
        <div className="legend-row">
          <span className="legend-dot" style={{ background: 'var(--navy)' }} />
          Total Interest
          <strong>{formatCurrency(interest)}</strong>
          <span className="legend-percent">{(100 - principalPercent).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

// Amortization line chart drawn as raw SVG polylines — principal paid vs
// interest paid, accumulated year by year. No charting library involved.
export function AmortizationChart({ series }) {
  if (!series || series.length === 0) return null;

  const width = 640;
  const height = 220;
  const paddingLeft = 46;
  const paddingBottom = 28;
  const paddingTop = 12;

  const maxValue = Math.max(...series.map((point) => point.principalPaid + point.interestPaid));
  const years = series.map((point) => point.year);
  const maxYear = years[years.length - 1];

  const xFor = (year) => paddingLeft + ((year - 1) / Math.max(maxYear - 1, 1)) * (width - paddingLeft - 12);
  const yFor = (value) => height - paddingBottom - (value / maxValue) * (height - paddingBottom - paddingTop);

  const principalPoints = series.map((point) => `${xFor(point.year)},${yFor(point.principalPaid)}`).join(' ');
  const interestPoints = series.map((point) => `${xFor(point.year)},${yFor(point.interestPaid)}`).join(' ');

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => Math.round(maxValue * fraction));

  return (
    <div className="amortization-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Principal paid versus interest paid over the loan tenure">
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={paddingLeft}
              x2={width - 8}
              y1={yFor(tick)}
              y2={yFor(tick)}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text x="4" y={yFor(tick) + 4} fontSize="10" fill="var(--text-muted)">
              {tick >= 100000 ? `${Math.round(tick / 100000)}L` : tick}
            </text>
          </g>
        ))}

        {years
          .filter((year) => year === 1 || year % 5 === 0)
          .map((year) => (
            <text key={year} x={xFor(year)} y={height - 8} fontSize="10" fill="var(--text-muted)" textAnchor="middle">
              {year}
            </text>
          ))}

        <polyline points={principalPoints} fill="none" stroke="var(--gold)" strokeWidth="2.5" />
        <polyline points={interestPoints} fill="none" stroke="var(--navy)" strokeWidth="2.5" />
      </svg>

      <div className="amortization-legend">
        <span><span className="legend-dot" style={{ background: 'var(--gold)' }} /> Principal Paid</span>
        <span><span className="legend-dot" style={{ background: 'var(--navy)' }} /> Interest Paid</span>
        <span className="amortization-axis-label">Years →</span>
      </div>
    </div>
  );
}
