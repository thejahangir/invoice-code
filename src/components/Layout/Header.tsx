import React from "react";

const Header = ({ currentView, systemDate }) => {
  return (
    <header className="header">
      <div className="header-title-area">
        <h1 className="page-title">
          {currentView === "dashboard" ? "Analytics Dashboard" : "List of Invoice"}
        </h1>
        <p className="page-subtitle">
          {currentView === "dashboard" 
            ? "High-level performance analysis, metrics, and ledger visualization" 
            : "Manage, track, and validate your corporate invoice processing pipeline"}
        </p>
      </div>
      <div className="header-actions">
        <div className="notification-badge">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="badge-dot"></span>
        </div>
        <div className="divider-v"></div>
        <div className="current-date">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span id="dateDisplay">{systemDate}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
