import React from "react";

// Layout & Navigation components
import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";

// Pages
import DashboardPage from "./landing-pages/DashboardPage";
import InvoicesPage from "./landing-pages/InvoicesPage";

// Modals & Overlays
import ViewDetailsModal from "./components/Modals/ViewDetailsModal";
import UploadModal from "./components/Modals/UploadModal";
import EscalationModal from "./components/Modals/EscalationModal";

// State hook
import useInvoiceApp from "./hooks/useInvoiceApp";

export default function App() {
  const {
    toasts,
    currentView,
    setCurrentView,
    currentTab,
    setCurrentTab,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    sortColumn,
    sortDirection,
    currentPage,
    setCurrentPage,
    contextMenu,
    setContextMenu,
    selectedInvoice,
    isViewModalOpen,
    setIsViewModalOpen,
    isUploadModalOpen,
    setIsUploadModalOpen,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
    deletingInvoiceId,
    notifForm,
    setNotifForm,
    uploadForm,
    setUploadForm,
    fileInputRef,
    systemDate,
    totalInvoicesCount,
    totalInvoicesAmount,
    processingCount,
    processingAmount,
    processedCount,
    processedAmount,

    invalidInvoicesCount,
    invalidInvoicesAmount,
    validInvoicesCount,

    successPercentage,
    arAgingTotal,

    donutArcs,
    vendorStats,
    actionableOverdueInvoices,
    dso,
    cei,
    validationPassRate,
    totalEntries,
    totalPages,
    startIdx,
    endIdx,
    paginatedList,
    vendorItems,
    handleSort,
    handleActionTrigger,
    handlePullInvoices,
    handleFileUpload,
    handleDeleteInvoice,
    handleRefresh,
    handleOpenNotification,
    handleNotificationSubmit,
    handleDownloadPDF,
    handleManualUploadSubmit
  } = useInvoiceApp();

  return (
    <>
      {/* Toast Notification System */}
      <div id="toastContainer" className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.type === "danger" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <Layout
        sidebar={
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        }
        header={
          <Header currentView={currentView} systemDate={systemDate} />
        }
      >
        {currentView === "dashboard" ? (
          <DashboardPage
            totalInvoicesCount={totalInvoicesCount}
            totalInvoicesAmount={totalInvoicesAmount}
            processingCount={processingCount}
            processingAmount={processingAmount}
            processedCount={processedCount}
            processedAmount={processedAmount}
            invalidInvoicesCount={invalidInvoicesCount}
            invalidInvoicesAmount={invalidInvoicesAmount}
            successPercentage={successPercentage}
            arAgingTotal={arAgingTotal}
            donutArcs={donutArcs}
            vendorStats={vendorStats}
            actionableOverdueInvoices={actionableOverdueInvoices}
            dso={dso}
            cei={cei}
            validationPassRate={validationPassRate}
            handleOpenNotification={handleOpenNotification}
          />
        ) : (
          <InvoicesPage
            totalInvoicesCount={totalInvoicesCount}
            validInvoicesCount={validInvoicesCount}
            invalidInvoicesCount={invalidInvoicesCount}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            handlePullInvoices={handlePullInvoices}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleRefresh={handleRefresh}
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
        )}
      </Layout>

      {/* Context Menu (Populated/positioned dynamically) */}
      {contextMenu.visible && (
        <div 
          id="customContextMenu" 
          className="context-menu"
          style={{
            position: "absolute",
            top: `${contextMenu.top}px`,
            left: `${contextMenu.left}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="context-item" 
            id="contextView"
            onClick={() => {
              setContextMenu(prev => ({ ...prev, visible: false }));
              setIsViewModalOpen(true);
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>View Details</span>
          </button>
          <div className="context-divider"></div>
          <button 
            className="context-item text-danger" 
            id="contextDelete"
            onClick={handleDeleteInvoice}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Invoice View Details Overlay Modal */}
      <ViewDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoice={selectedInvoice}
        vendorItems={vendorItems}
        handleDownloadPDF={handleDownloadPDF}
      />

      {/* Upload Invoice Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        uploadForm={uploadForm}
        setUploadForm={setUploadForm}
        onSubmit={handleManualUploadSubmit}
      />

      {/* Send Notification Modal */}
      <EscalationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        invoice={selectedInvoice}
        notifForm={notifForm}
        setNotifForm={setNotifForm}
        onSubmit={handleNotificationSubmit}
      />
    </>
  );
}
