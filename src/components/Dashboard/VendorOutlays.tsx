import React from "react";
import { formatKpiCurrency } from "../../utils/helpers";

const VendorOutlays = ({ vendorStats }) => {
  return (
    <div className="chart-widget-card">
      <div className="chart-widget-header">
        <h3>Top Vendor Outlays</h3>
        <span className="chart-subtitle">Direct invoice allocation value (INR)</span>
      </div>
      <div className="chart-container-html">
        {vendorStats.length > 0 ? (() => {
          const maxVendorVal = Math.max(...vendorStats.map(v => v.amount), 1);
          return (
            <div className="vendor-bar-list">
              {vendorStats.map((v, i) => {
                const percent = (v.amount / maxVendorVal) * 100;
                return (
                  <div key={i} className="vendor-bar-row">
                    <div className="vendor-bar-header">
                      <span className="vendor-bar-name">{v.name}</span>
                      <span className="vendor-bar-value">{formatKpiCurrency(v.amount)}</span>
                    </div>
                    <div className="vendor-bar-track">
                      <div 
                        className="vendor-bar-fill" 
                        style={{ 
                          width: `${percent}%`, 
                          background: `linear-gradient(90deg, var(--primary) 0%, #4f46e5 100%)` 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })() : (
          <div className="chart-empty">No vendor data available</div>
        )}
      </div>
    </div>
  );
};

export default VendorOutlays;
