import React from "react";
import InvoicesMetrics from "../components/Invoices/InvoicesMetrics";
import InvoicesToolbar from "../components/Invoices/InvoicesToolbar";
import InvoicesTable from "../components/Invoices/InvoicesTable";

const InvoicesPage = ({
  totalInvoicesCount,
  validInvoicesCount,
  invalidInvoicesCount,
  currentTab,
  setCurrentTab,
  fileInputRef,
  handleFileUpload,
  handlePullInvoices,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  handleRefresh,
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
      <InvoicesMetrics
        totalInvoicesCount={totalInvoicesCount}
        validInvoicesCount={validInvoicesCount}
        invalidInvoicesCount={invalidInvoicesCount}
      />

      <section className="invoice-panel">
        <InvoicesToolbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          totalInvoicesCount={totalInvoicesCount}
          invalidInvoicesCount={invalidInvoicesCount}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          handlePullInvoices={handlePullInvoices}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          handleRefresh={handleRefresh}
        />

        <InvoicesTable
          paginatedList={paginatedList}
          deletingInvoiceId={deletingInvoiceId}
          handleOpenNotification={handleOpenNotification}
          contextMenu={contextMenu}
          handleActionTrigger={handleActionTrigger}
          totalEntries={totalEntries}
          startIdx={startIdx}
          endIdx={endIdx}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
      </section>
    </>
  );
};

export default InvoicesPage;
