import React from "react";

const EscalationModal = ({ isOpen, onClose, invoice, notifForm, setNotifForm, onSubmit }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div id="notificationModal" className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-premium" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)" }}>
          <div className="modal-header-title">
            <span className="invoice-tag" style={{ color: "var(--secondary)" }}>ACTION ALERT</span>
            <h2>Send Vendor Alert</h2>
          </div>
          <button className="btn-close" id="btnCloseNotificationModal" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form id="notificationForm" onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="notifVendor">Vendor</label>
                <input 
                  type="text" 
                  id="notifVendor" 
                  readOnly 
                  value={invoice.vendor}
                  style={{ backgroundColor: "var(--bg-main)", color: "var(--text-muted)", cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notifInvoiceId">Invoice #</label>
                <input 
                  type="text" 
                  id="notifInvoiceId" 
                  readOnly 
                  value={invoice.id}
                  style={{ backgroundColor: "var(--bg-main)", color: "var(--text-muted)", cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notifTo">To (Vendor Email)</label>
              <input 
                type="email" 
                id="notifTo" 
                required 
                placeholder="e.g. billing@vendor.com"
                value={notifForm.to}
                onChange={(e) => setNotifForm(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notifSubject">Subject</label>
              <input 
                type="text" 
                id="notifSubject" 
                required 
                placeholder="Alert Subject"
                value={notifForm.subject}
                onChange={(e) => setNotifForm(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notifMessage">Message to Vendor</label>
              <textarea 
                id="notifMessage" 
                required 
                rows="5" 
                placeholder="Enter alert message details..." 
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-family-sans)",
                  resize: "vertical"
                }}
                value={notifForm.message}
                onChange={(e) => setNotifForm(prev => ({ ...prev, message: e.target.value }))}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" id="btnCancelNotif" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Send Alert</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EscalationModal;
