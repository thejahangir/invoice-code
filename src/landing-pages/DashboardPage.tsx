import React from "react";
import MetricCard from "../components/Dashboard/MetricCard";
import AgingChart from "../components/Dashboard/AgingChart";
import VendorOutlays from "../components/Dashboard/VendorOutlays";
import OverdueInvoices from "../components/Dashboard/OverdueInvoices";
import LedgerHealth from "../components/Dashboard/LedgerHealth";

const DashboardPage = ({
  totalInvoicesCount,
  totalInvoicesAmount,
  processingCount,
  processingAmount,
  processedCount,
  processedAmount,
  invalidInvoicesCount,
  invalidInvoicesAmount,
  successPercentage,
  arAgingTotal,
  donutArcs,
  vendorStats,
  actionableOverdueInvoices,
  dso,
  cei,
  validationPassRate,
  handleOpenNotification
}) => {
  return (
    <>
      {/* Dashboard metrics cards */}
      <section className="metrics-grid">
        {/* 1. Received Card */}
        <MetricCard
          title="Received"
          count={totalInvoicesCount}
          amount={totalInvoicesAmount}
          detailLabel="Total registered"
          cardClass="card-received"
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              <path d="M12 11v6"></path>
              <path d="M9 14l3 3 3-3"></path>
            </svg>
          }
          trendBadge={
            <span className="metric-trend-badge positive">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              +12%
            </span>
          }
        />

        {/* 2. Processing Card */}
        <MetricCard
          title="Processing"
          count={processingCount}
          amount={processingAmount}
          detailLabel="In digestion queue"
          cardClass="card-processing-kpi"
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          }
          trendBadge={
            <span className="metric-pulse-badge">
              <span className="pulse-dot"></span> Active
            </span>
          }
        />

        {/* 3. Processed Card */}
        <MetricCard
          title="Processed"
          count={processedCount}
          amount={processedAmount}
          detailLabel="Compliance rate"
          cardClass="card-processed-kpi"
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          }
          trendBadge={
            <span className="metric-trend-badge success">
              {successPercentage}%
            </span>
          }
        />

        {/* 4. Invalid Card */}
        <MetricCard
          title="Invalid Invoice"
          count={invalidInvoicesCount}
          amount={invalidInvoicesAmount}
          detailLabel="Failed check"
          cardClass="card-invalid-kpi"
          amountClass="text-invalid-amount"
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          }
          trendBadge={
            <span className="metric-trend-badge danger">
              Action Required
            </span>
          }
        />
      </section>

      {/* Dynamic SVG & HTML charts */}
      <div className="dashboard-charts-grid">
        <AgingChart arAgingTotal={arAgingTotal} donutArcs={donutArcs} />
        <VendorOutlays vendorStats={vendorStats} />
      </div>

      {/* Bottom widget row */}
      <div className="dashboard-widgets-row">
        <OverdueInvoices 
          actionableOverdueInvoices={actionableOverdueInvoices} 
          handleOpenNotification={handleOpenNotification} 
        />
        <LedgerHealth 
          dso={dso} 
          cei={cei} 
          validationPassRate={validationPassRate} 
          invalidInvoicesCount={invalidInvoicesCount} 
        />
      </div>
    </>
  );
};

export default DashboardPage;
