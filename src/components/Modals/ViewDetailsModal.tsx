import React from "react";
import { formatDate, formatDetailedCurrency } from "../../utils/helpers";

const ViewDetailsModal = ({ isOpen, onClose, invoice, vendorItems, handleDownloadPDF }) => {
  if (!isOpen || !invoice) return null;

  const items = vendorItems[invoice.vendor] || [
    { desc: "General Consultation & Operations Services", qty: 1, price: invoice.amount }
  ];
  
  let subtotal = 0;
  items.forEach(item => {
    subtotal += item.qty * item.price;
  });
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  return (
    <div id="viewModal" className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-premium">
          <div className="modal-header-title">
            <span className="invoice-tag">INVOICE PREVIEW</span>
            <h2 id="modalInvoiceId">{invoice.id}</h2>
          </div>
          <button className="btn-close" id="btnCloseModal" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="invoice-details-header">
            <div className="company-info">
              <span className="corp-title">Antern Technologies</span>
              <span className="corp-address">100 Ft Road, HRBR Layout,<br />Kalyan Nagar, Bangalore - 560 043.</span>
            </div>
            <div className="invoice-meta-info">
              <div className="meta-row">
                <span className="meta-label">Status:</span>
                <span className={`meta-val badge badge-${invoice.status.toLowerCase()}`} id="modalStatus">
                  {invoice.status}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Validation:</span>
                <span className={`meta-val validation-badge val-${invoice.validation.toLowerCase()}`} id="modalValidation">
                  <span className="val-dot"></span>{invoice.validation}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Date Issued:</span>
                <span className="meta-val" id="modalDate">{formatDate(invoice.date)}</span>
              </div>
            </div>
          </div>

          <div className="invoice-bill-to">
            <h4>Billed To:</h4>
            <p className="bill-vendor" id="modalVendor">{invoice.vendor}</p>
            <p className="bill-address">123 HRBR Layout,<br />Kalyan Nagar, Bangalore - 560 043</p>
          </div>

          <div className="invoice-items-table-wrapper">
            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Unit Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody id="modalInvoiceItems">
                {items.map((item, idx) => {
                  const itemTotal = item.qty * item.price;
                  return (
                    <tr key={idx}>
                      <td>{item.desc}</td>
                      <td className="text-right">{item.qty}</td>
                      <td className="text-right">{formatDetailedCurrency(item.price)}</td>
                      <td className="text-right">{formatDetailedCurrency(itemTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="invoice-summary-section">
            <div className="summary-row">
              <span>Subtotal</span>
              <span id="modalSubtotal">{formatDetailedCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span id="modalTax">{formatDetailedCurrency(tax)}</span>
            </div>
            <div className="summary-row grand-total">
              <span>Grand Total</span>
              <span id="modalGrandTotal">{formatDetailedCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" id="btnCloseModalFooter" onClick={onClose}>Close</button>
          <button className="btn btn-primary" id="btnDownloadPDF" onClick={handleDownloadPDF}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
