import React from "react";
import { formatKpiCurrency } from "../../utils/helpers";

const OverdueInvoices = ({ actionableOverdueInvoices, handleOpenNotification }) => {
  return (
    <div className="widget-card overdue-invoices-widget">
      <div className="widget-header-premium">
        <h3>Actionable Overdue Invoices</h3>
        <span className="badge badge-danger">Follow-up Required</span>
      </div>
      <div className="overdue-invoices-list">
        {actionableOverdueInvoices.length > 0 ? (
          actionableOverdueInvoices.map((inv, idx) => (
            <div key={idx} className="overdue-invoice-item">
              <div className="overdue-invoice-main">
                <div className="overdue-invoice-details">
                  <span className="overdue-invoice-id">{inv.id}</span>
                  <span className="overdue-invoice-vendor">{inv.vendor}</span>
                </div>
                <div className="overdue-invoice-meta">
                  <span className="overdue-invoice-amount">{formatKpiCurrency(inv.amount)}</span>
                  <span className={`badge ${inv.validation === "Invalid" ? "badge-danger" : "badge-processing"}`}>
                    {inv.validation === "Invalid" ? "Invalid Check" : `${inv.daysPending}d Pending`}
                  </span>
                </div>
              </div>
              <button 
                className="btn btn-primary btn-sm btn-followup"
                onClick={() => handleOpenNotification(inv)}
              >
                Follow Up
              </button>
            </div>
          ))
        ) : (
          <div className="chart-empty">No critical overdue invoices found.</div>
        )}
      </div>
    </div>
  );
};

export default OverdueInvoices;
