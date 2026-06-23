import React from "react";

const UploadModal = ({ isOpen, onClose, uploadForm, setUploadForm, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div id="uploadModal" className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload New Invoice</h2>
          <button className="btn-close" id="btnCloseUploadModal" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form id="uploadForm" onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="invoiceNum">Invoice #</label>
                <input 
                  type="text" 
                  id="invoiceNum" 
                  required 
                  placeholder="e.g. EXT-1003"
                  value={uploadForm.id}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, id: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="invoiceVendor">Vendor</label>
                <input 
                  type="text" 
                  id="invoiceVendor" 
                  required 
                  placeholder="e.g. Acme Corp"
                  value={uploadForm.vendor}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, vendor: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <input 
                  type="date" 
                  id="invoiceDate" 
                  required 
                  value={uploadForm.date}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="invoiceAmount">Amount (₹)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="invoiceAmount" 
                  required 
                  placeholder="e.g. 1250.00"
                  value={uploadForm.amount}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="invoiceStatus">Status</label>
                <select 
                  id="invoiceStatus"
                  value={uploadForm.status}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Processing">Processing</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="invoiceValidation">Validation</label>
                <select 
                  id="invoiceValidation"
                  value={uploadForm.validation}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, validation: e.target.value }))}
                >
                  <option value="Valid">Valid</option>
                  <option value="Invalid">Invalid</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" id="btnCancelUpload" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
