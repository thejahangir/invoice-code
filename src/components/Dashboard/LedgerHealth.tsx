import React from "react";

const LedgerHealth = ({ dso, cei, validationPassRate, invalidInvoicesCount }) => {
  return (
    <div className="widget-card ledger-health-widget">
      <div className="widget-header-premium">
        <h3>A/R Ledger Health</h3>
        <span className="badge badge-submitted">Live KPIs</span>
      </div>
      <div className="ledger-health-grid">
        <div className="health-metric-card">
          <span className="health-metric-label">Days Sales Outstanding (DSO)</span>
          <div className="health-metric-val-wrapper">
            <span className="health-metric-val">{dso}</span>
            <span className="health-metric-unit">Days</span>
          </div>
          <span className="health-metric-desc">Avg pending time of unpaid invoices</span>
        </div>

        <div className="health-metric-card">
          <span className="health-metric-label">Collection Effect. Index (CEI)</span>
          <div className="health-metric-val-wrapper">
            <span className="health-metric-val">{cei}%</span>
          </div>
          <span className="health-metric-desc">Percentage of total value approved</span>
        </div>

        <div className="health-metric-card">
          <span className="health-metric-label">Validation Pass Rate</span>
          <div className="health-metric-val-wrapper">
            <span className="health-metric-val">{validationPassRate}%</span>
          </div>
          <span className="health-metric-desc">Compliant vs total registered count</span>
        </div>

        <div className="health-metric-card">
          <span className="health-metric-label">Active Escalations</span>
          <div className="health-metric-val-wrapper">
            <span className="health-metric-val text-invalid-amount">{invalidInvoicesCount}</span>
          </div>
          <span className="health-metric-desc">Flagged invalid invoices requiring audit</span>
        </div>
      </div>
    </div>
  );
};

export default LedgerHealth;
