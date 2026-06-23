import React from "react";
import AnimatedCounter from "../UI/AnimatedCounter";
import { formatKpiCurrency } from "../../utils/helpers";

const MetricCard = ({ title, count, amount, icon, detailLabel, trendBadge, cardClass, amountClass = "" }) => {
  return (
    <div className={`metric-card ${cardClass}`}>
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        <div className="metric-icon">
          {icon}
        </div>
      </div>
      <div className="metric-content">
        <div className="metric-value-wrapper">
          <span className="metric-value">
            <AnimatedCounter value={count} />
          </span>
          <span className="metric-value-label">Invoices</span>
        </div>
        <div className={`metric-amount ${amountClass}`}>
          {formatKpiCurrency(amount)}
        </div>
        <div className="metric-badge-footer">
          {trendBadge}
          <span className="metric-detail-label">{detailLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
