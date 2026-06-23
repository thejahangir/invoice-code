import React from "react";
import { formatDate, formatDetailedCurrency } from "../../utils/helpers";

const InvoicesTable = ({
  paginatedList,
  deletingInvoiceId,
  handleOpenNotification,
  contextMenu,
  handleActionTrigger,
  totalEntries,
  startIdx,
  endIdx,
  currentPage,
  totalPages,
  setCurrentPage,
  handleSort,
  sortColumn,
  sortDirection
}) => {
  return (
    <>
      <div className="table-container">
        <table className="invoice-table" id="invoiceGrid">
          <thead>
            <tr>
              <th className="sortable" data-sort="id" onClick={() => handleSort("id")}>
                INVOICE # 
                <span className={`sort-icon ${sortColumn === "id" ? sortDirection : ""}`}></span>
              </th>
              <th className="sortable" data-sort="vendor" onClick={() => handleSort("vendor")}>
                VENDOR 
                <span className={`sort-icon ${sortColumn === "vendor" ? sortDirection : ""}`}></span>
              </th>
              <th className="sortable" data-sort="date" onClick={() => handleSort("date")}>
                DATE 
                <span className={`sort-icon ${sortColumn === "date" ? sortDirection : ""}`}></span>
              </th>
              <th className="sortable text-right" data-sort="amount" onClick={() => handleSort("amount")}>
                AMOUNT 
                <span className={`sort-icon ${sortColumn === "amount" ? sortDirection : ""}`}></span>
              </th>
              <th className="sortable" data-sort="status" onClick={() => handleSort("status")}>
                STATUS 
                <span className={`sort-icon ${sortColumn === "status" ? sortDirection : ""}`}></span>
              </th>
              <th className="sortable" data-sort="validation" onClick={() => handleSort("validation")}>
                VALIDATION 
                <span className={`sort-icon ${sortColumn === "validation" ? sortDirection : ""}`}></span>
              </th>
              <th className="sortable" data-sort="created" onClick={() => handleSort("created")}>
                CREATED 
                <span className={`sort-icon ${sortColumn === "created" ? sortDirection : ""}`}></span>
              </th>
              <th className="text-center">ESCALATE</th>
              <th className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody id="invoiceTableBody">
            {paginatedList.map(invoice => {
              const isDeleting = deletingInvoiceId === invoice.id;
              const dateFormatted = formatDate(invoice.date);
              const createdFormatted = formatDate(invoice.created);
              const amountFormatted = formatDetailedCurrency(invoice.amount);

              return (
                <tr 
                  key={invoice.id} 
                  className={`${invoice.validation === "Invalid" ? "row-invalid" : ""}`}
                  style={isDeleting ? {
                    transition: "all 0.4s ease",
                    opacity: 0,
                    transform: "translateX(20px)"
                  } : {}}
                >
                  <td>{invoice.id}</td>
                  <td><strong>{invoice.vendor}</strong></td>
                  <td>{dateFormatted}</td>
                  <td className="text-right"><strong>{amountFormatted}</strong></td>
                  <td>
                    <span className={`badge badge-${invoice.status.toLowerCase()}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <span className={`validation-badge val-${invoice.validation.toLowerCase()}`}>
                      <span className="val-dot"></span>{invoice.validation}
                    </span>
                  </td>
                  <td>{createdFormatted}</td>
                  <td className="text-center">
                    <button 
                      className="btn-notify-cta" 
                      disabled={invoice.validation !== 'Invalid'}
                      onClick={() => handleOpenNotification(invoice)}
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "2px", verticalAlign: "middle" }}>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Notify
                    </button>
                  </td>
                  <td className="text-center">
                    <button 
                      className={`btn-action-trigger ${contextMenu.visible && contextMenu.invoice?.id === invoice.id ? "active" : ""}`}
                      onClick={(e) => handleActionTrigger(e, invoice)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        <div className={`empty-state ${totalEntries > 0 ? "hidden" : ""}`} id="emptyState">
          <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--text-muted)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <h3>No Invoices Found</h3>
          <p>Try adjusting your filters or search term, or upload a new invoice.</p>
        </div>
      </div>

      {/* Pagination / Grid Footer */}
      <div className="table-footer">
        <div className="pagination-info">
          Showing <span id="showingStart">{totalEntries === 0 ? 0 : startIdx + 1}</span> to <span id="showingEnd">{endIdx}</span> of <span id="showingTotal">{totalEntries}</span> entries
        </div>
        <div className="pagination-controls">
          <button 
            className="btn btn-secondary btn-sm" 
            id="btnPrevPage" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <div className="page-numbers" id="pageNumbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button 
                key={pageNum}
                className={`page-num ${pageNum === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <button 
            className="btn btn-secondary btn-sm" 
            id="btnNextPage"
            disabled={currentPage === totalPages || totalEntries === 0}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default InvoicesTable;
