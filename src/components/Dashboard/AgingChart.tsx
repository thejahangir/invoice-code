import React from "react";
import { formatKpiCurrency } from "../../utils/helpers";

const AgingChart = ({ arAgingTotal, donutArcs }) => {
  return (
    <div className="chart-widget-card">
      <div className="chart-widget-header">
        <h3>Accounts Receivable (A/R) Aging</h3>
        <span className="chart-subtitle">Distribution of receivables by collection maturity (INR)</span>
      </div>
      <div className="chart-container-donut">
        {arAgingTotal > 0 ? (
          <div className="donut-chart-layout">
            <div className="donut-svg-wrapper">
              <svg viewBox="0 0 120 120" width="100%" height="100%">
                {donutArcs.map((arc, i) => (
                  <circle
                    key={i}
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="11"
                    strokeDasharray={arc.strokeDasharray}
                    strokeDashoffset={arc.strokeDashoffset}
                    className="donut-segment"
                  />
                ))}
                <circle cx="60" cy="60" r="41" fill="var(--bg-card)" />
              </svg>
              <div className="donut-center-overlay">
                <span className="donut-center-label">Total Receivables</span>
                <span className="donut-center-value">{formatKpiCurrency(arAgingTotal)}</span>
              </div>
            </div>
            <div className="donut-legend-container">
              {donutArcs.map((arc, i) => (
                <div key={i} className="donut-legend-row" title={arc.label}>
                  <div className="donut-legend-info">
                    <span className="donut-legend-dot" style={{ backgroundColor: arc.color }} />
                    <span className="donut-legend-range">{arc.range}</span>
                  </div>
                  <div className="donut-legend-values">
                    <span className="donut-legend-amount">{formatKpiCurrency(arc.amount)}</span>
                    <span className="donut-legend-pct">({Math.round(arc.percent)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="chart-empty">No receivables data available</div>
        )}
      </div>
    </div>
  );
};

export default AgingChart;
