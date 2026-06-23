import React from "react";
import AnimatedCounter from "../UI/AnimatedCounter";

const InvoicesMetrics = ({ totalInvoicesCount, validInvoicesCount, invalidInvoicesCount }) => {
  return (
    <section className="invoice-metrics-grid">
      <div className="invoice-metric-card invoice-card-primary">
        <div className="metric-header">
          <span className="metric-title">Total Invoices</span>
          <div className="metric-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
        </div>
        <div className="metric-content">
          <span className="metric-value">
            <AnimatedCounter value={totalInvoicesCount} />
          </span>
          <span className="metric-change positive">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            12% from last week
          </span>
        </div>
      </div>

      <div className="invoice-metric-card invoice-card-valid">
        <div className="metric-header">
          <span className="metric-title">Valid Invoices</span>
          <div className="metric-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        <div className="metric-content">
          <span className="metric-value">
            <AnimatedCounter value={validInvoicesCount} />
          </span>
          <span className="metric-label text-valid">No validation errors</span>
        </div>
      </div>

      <div className="invoice-metric-card invoice-card-invalid-kpi">
        <div className="metric-header">
          <span className="metric-title">Invalid Invoices</span>
          <div className="metric-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        </div>
        <div className="metric-content">
          <span className="metric-value">
            <AnimatedCounter value={invalidInvoicesCount} />
          </span>
          <span className="metric-label text-invalid">Requires attention</span>
        </div>
      </div>
    </section>
  );
};

export default InvoicesMetrics;
