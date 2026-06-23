import React from "react";

const InvoicesToolbar = ({
  currentTab,
  setCurrentTab,
  totalInvoicesCount,
  invalidInvoicesCount,
  fileInputRef,
  handleFileUpload,
  handlePullInvoices,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  handleRefresh
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="tab-filters">
          <button 
            className={`tab-btn ${currentTab === "all" ? "active" : ""}`} 
            id="tabAll"
            onClick={() => setCurrentTab("all")}
          >
            All Invoices <span className="tab-count" id="countAll">{totalInvoicesCount}</span>
          </button>
          <button 
            className={`tab-btn ${currentTab === "bad" ? "active" : ""}`} 
            id="tabBad"
            onClick={() => setCurrentTab("bad")}
          >
            Bad Invoices <span className="tab-count count-bad" id="countBad">{invalidInvoicesCount}</span>
          </button>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" id="btnUpload" onClick={() => fileInputRef.current.click()}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload Invoice
          </button>
          <input 
            type="file" 
            id="fileInput" 
            ref={fileInputRef}
            accept=".pdf,.xml,.json,.png,.jpg,.jpeg" 
            style={{ display: "none" }} 
            onChange={handleFileUpload}
          />
          <button className="btn btn-secondary" id="btnPull" onClick={handlePullInvoices}>
            Pull Invoices
          </button>
        </div>
      </div>

      <div className="toolbar-right">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Search vendor or invoice #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-select-wrapper">
          <select 
            id="statusFilter" 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Processing">Processing</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <button className="btn btn-icon-only" id="btnRefresh" title="Refresh list" onClick={handleRefresh}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InvoicesToolbar;
