import { useState, useEffect, useRef } from "react";
import { initialInvoices, vendorItems, vendorEmails } from "../metadata/mockData";
import { formatDate } from "../utils/helpers";

export default function useInvoiceApp() {
  // Database States
  const [invoices, setInvoices] = useState(initialInvoices);
  const [toasts, setToasts] = useState([]);

  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard" | "invoices"

  // Filter & Search & Pagination States
  const [currentTab, setCurrentTab] = useState("all"); // "all" | "bad"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortColumn, setSortColumn] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc"); // "asc" | "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected states & Modals
  const [contextMenu, setContextMenu] = useState({ visible: false, top: 0, left: 0, invoice: null });
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  
  const [deletingInvoiceId, setDeletingInvoiceId] = useState(null);

  // Form states for notification
  const [notifForm, setNotifForm] = useState({ to: "", subject: "", message: "" });
  // Form states for upload (stub modal)
  const [uploadForm, setUploadForm] = useState({ id: "", vendor: "", date: "2026-06-04", amount: "", status: "Submitted", validation: "Valid" });

  const fileInputRef = useRef(null);

  // Set system date header
  const systemDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Calculate high-level KPIs based on the global invoices database state
  const totalInvoicesCount = invoices.length;
  const totalInvoicesAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  const processingCount = invoices.filter(inv => inv.status === "Processing").length;
  const processingAmount = invoices.filter(inv => inv.status === "Processing").reduce((sum, inv) => sum + inv.amount, 0);

  const processedCount = invoices.filter(inv => inv.status === "Approved").length;
  const processedAmount = invoices.filter(inv => inv.status === "Approved").reduce((sum, inv) => sum + inv.amount, 0);

  const invalidInvoicesCount = invoices.filter(inv => inv.validation === "Invalid").length;
  const invalidInvoicesAmount = invoices.filter(inv => inv.validation === "Invalid").reduce((sum, inv) => sum + inv.amount, 0);

  const validInvoicesCount = invoices.filter(inv => inv.validation === "Valid").length;

  const successPercentage = totalInvoicesCount ? Math.round((processedCount / totalInvoicesCount) * 100) : 0;

  // Accounts Receivable (A/R) Aging Stats grouping based on mock today baseDate (June 15, 2026)
  const arAgingStats = (() => {
    let currentSum = 0;
    let dueSum = 0;
    let overdueSum = 0;
    let criticalSum = 0;
    const baseDate = new Date("2026-06-15");
    
    invoices.forEach(inv => {
      const createdDate = new Date(inv.created);
      const diffTime = Math.abs(baseDate - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) {
        currentSum += inv.amount;
      } else if (diffDays <= 15) {
        dueSum += inv.amount;
      } else if (diffDays <= 30) {
        overdueSum += inv.amount;
      } else {
        criticalSum += inv.amount;
      }
    });
    
    return [
      { range: "Current (0-7d)", amount: currentSum, color: "#3b82f6", label: "Within normal collection cycle" },
      { range: "Due (8-15d)", amount: dueSum, color: "#f59e0b", label: "Expected receipt soon" },
      { range: "Overdue (16-30d)", amount: overdueSum, color: "#efb731", label: "Grace period active / follow-up" },
      { range: "Critical (30d+)", amount: criticalSum, color: "#ef4444", label: "Delinquent payment / collection action" }
    ];
  })();

  const arAgingTotal = arAgingStats.reduce((sum, item) => sum + item.amount, 0);

  const donutArcs = (() => {
    let cumulativePercent = 0;
    return arAgingStats.map(item => {
      const percent = arAgingTotal ? (item.amount / arAgingTotal) * 100 : 0;
      const strokeDasharray = `${(percent * 314.15) / 100} 314.15`;
      const strokeDashoffset = `${314.15 - ((cumulativePercent * 314.15) / 100) + 78.53}`; // start at top (90 deg offset)
      cumulativePercent += percent;
      return {
        ...item,
        percent,
        strokeDasharray,
        strokeDashoffset
      };
    });
  })();

  // Dashboard vendor outlays: sum of invoice amounts for top 5 vendors.
  const vendorStats = (() => {
    const vendors = {};
    invoices.forEach(inv => {
      vendors[inv.vendor] = (vendors[inv.vendor] || 0) + inv.amount;
    });
    return Object.keys(vendors)
      .map(name => ({ name, amount: vendors[name] }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  })();

  // Actionable Overdue Invoices logic
  const actionableOverdueInvoices = (() => {
    const baseDate = new Date("2026-06-15");
    return invoices
      .filter(inv => inv.status !== "Approved" && (inv.validation === "Invalid" || (Math.ceil(Math.abs(baseDate - new Date(inv.created)) / (1000 * 60 * 60 * 24)) > 15)))
      .map(inv => {
        const diffTime = Math.abs(baseDate - new Date(inv.created));
        const daysPending = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...inv, daysPending };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4);
  })();

  // A/R Ledger Health & Efficiency Metrics calculations
  const dso = (() => {
    const baseDate = new Date("2026-06-15");
    const unpaid = invoices.filter(inv => inv.status !== "Approved");
    if (unpaid.length === 0) return 0;
    const totalDays = unpaid.reduce((sum, inv) => {
      const diffTime = Math.abs(baseDate - new Date(inv.created));
      return sum + Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, 0);
    return (totalDays / unpaid.length).toFixed(1);
  })();

  const cei = (() => {
    const totalVal = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    if (totalVal === 0) return 100;
    const approvedVal = invoices
      .filter(inv => inv.status === "Approved")
      .reduce((sum, inv) => sum + inv.amount, 0);
    return ((approvedVal / totalVal) * 100).toFixed(1);
  })();

  const validationPassRate = (() => {
    if (invoices.length === 0) return 100;
    const validCount = invoices.filter(inv => inv.validation === "Valid").length;
    return ((validCount / invoices.length) * 100).toFixed(1);
  })();

  // Global handler to close context menu
  useEffect(() => {
    const handleGlobalClick = () => {
      setContextMenu(prev => prev.visible ? { ...prev, visible: false } : prev);
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Toast alert trigger
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Perform filtering & sorting on databases
  const getFilteredAndSortedInvoices = () => {
    let result = invoices.filter(invoice => {
      // Tab filter
      if (currentTab === "bad" && invoice.validation !== "Invalid") return false;

      // Search vendor/id filter
      const matchesSearch = invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Status filter
      if (selectedStatus !== "all" && invoice.status !== selectedStatus) return false;

      return true;
    });

    // Sorting logic
    result.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (sortColumn === "date" || sortColumn === "created") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  };

  const filteredAndSortedList = getFilteredAndSortedInvoices();
  const totalEntries = filteredAndSortedList.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

  // Pagination index bounds
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalEntries);
  const paginatedList = filteredAndSortedList.slice(startIdx, endIdx);

  // Reset page bounds when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab, searchQuery, selectedStatus, sortColumn, sortDirection]);

  // Sort toggle handler
  const handleSort = (field) => {
    if (sortColumn === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(field);
      setSortDirection("asc");
    }
  };

  // Action Menu Trigger Positioning
  const handleActionTrigger = (e, invoice) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    setContextMenu({
      visible: true,
      top: rect.bottom + scrollTop + 6,
      left: rect.left + scrollLeft - 108,
      invoice
    });
    setSelectedInvoice(invoice);
  };

  // Pull Invoices Simulation
  const handlePullInvoices = () => {
    showToast("Pulling external invoices from ledger server...", "success");
    setTimeout(() => {
      const pulls = [
        { id: `EXT-10${invoices.length + 1}`, vendor: "LTIMindtree", date: "2026-06-03", amount: 4800.00, status: "Submitted", validation: "Valid", created: "2026-06-04" },
        { id: `EXT-10${invoices.length + 2}`, vendor: "LTTS", date: "2026-06-02", amount: 1500.00, status: "Processing", validation: "Invalid", created: "2026-06-04" }
      ];
      setInvoices(prev => [...pulls, ...prev]);
      showToast("Successfully pulled 2 new invoices.", "success");
    }, 1200);
  };

  // Upload Input change handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showToast(`Uploading and analyzing ${file.name}...`, "success");

    setTimeout(() => {
      const randomVendor = ["TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "LTIMindtree"][Math.floor(Math.random() * 6)];
      const randomAmount = Math.floor(Math.random() * 8500) + 150;
      const randomValidation = Math.random() > 0.35 ? "Valid" : "Invalid";
      const invoiceId = `EXT-10${invoices.length + 1}`;

      const newInvoice = {
        id: invoiceId,
        vendor: randomVendor,
        date: new Date().toISOString().substring(0, 10),
        amount: randomAmount,
        status: "Submitted",
        validation: randomValidation,
        created: new Date().toISOString().substring(0, 10)
      };

      setInvoices(prev => [newInvoice, ...prev]);
      showToast(`File ${file.name} successfully parsed as invoice ${invoiceId}!`, "success");
      
      e.target.value = ""; // reset input
    }, 1200);
  };

  // Delete Action handler
  const handleDeleteInvoice = () => {
    if (!selectedInvoice) return;
    const inv = selectedInvoice;
    setContextMenu(prev => ({ ...prev, visible: false }));

    if (window.confirm(`Are you sure you want to delete invoice ${inv.id} for ${inv.vendor}?`)) {
      setDeletingInvoiceId(inv.id);
      
      setTimeout(() => {
        setInvoices(prev => prev.filter(item => item.id !== inv.id));
        showToast(`Invoice ${inv.id} deleted successfully.`, "danger");
        setDeletingInvoiceId(null);
        setSelectedInvoice(null);
      }, 400);
    }
  };

  // Refresh handler
  const handleRefresh = () => {
    showToast("Refreshing invoice list...", "success");
    setSearchQuery("");
    setSelectedStatus("all");
  };

  // Open Escalation Notification Modal
  const handleOpenNotification = (invoice) => {
    const vendorEmail = vendorEmails[invoice.vendor] || `billing@${invoice.vendor.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
    
    setNotifForm({
      to: vendorEmail,
      subject: `URGENT: Invoice validation issues for #${invoice.id}`,
      message: `Dear Client,\n\nWe are writing to inform you that invoice #${invoice.id} dated ${formatDate(invoice.date)} has been flagged as Invalid during our compliance review.\n\nPlease log in to the vendor portal and correct the validation discrepancies. Let us know if you have any questions.\n\nBest regards,\nJahangir A\nFinance Department`
    });
    setSelectedInvoice(invoice);
    setIsNotificationModalOpen(true);
  };

  // Submit Escalation Notification Form
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    const emailTo = notifForm.to;
    const vendor = selectedInvoice.vendor;
    const invId = selectedInvoice.id;

    showToast(`Sending escalation alert to ${emailTo}...`, "success");

    setTimeout(() => {
      setIsNotificationModalOpen(false);
      showToast(`Escalation alert sent to ${vendor} (${emailTo}) for invoice ${invId}!`, "success");
    }, 1000);
  };

  // Download PDF simulation
  const handleDownloadPDF = () => {
    if (selectedInvoice) {
      showToast(`Generating and downloading PDF copy of ${selectedInvoice.id}...`, "success");
    }
  };

  // Manual invoice submission form handler
  const handleManualUploadSubmit = (e) => {
    e.preventDefault();
    const newInvoice = {
      id: uploadForm.id,
      vendor: uploadForm.vendor,
      date: uploadForm.date,
      amount: parseFloat(uploadForm.amount) || 0,
      status: uploadForm.status,
      validation: uploadForm.validation,
      created: new Date().toISOString().substring(0, 10)
    };
    setInvoices(prev => [newInvoice, ...prev]);
    setIsUploadModalOpen(false);
    showToast(`Invoice ${newInvoice.id} created successfully!`, "success");
    setUploadForm({ id: "", vendor: "", date: "2026-06-04", amount: "", status: "Submitted", validation: "Valid" });
  };

  return {
    invoices,
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
    setSortColumn,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    contextMenu,
    setContextMenu,
    selectedInvoice,
    setSelectedInvoice,
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
    filteredAndSortedList,
    totalEntries,
    totalPages,
    startIdx,
    endIdx,
    paginatedList,
    vendorItems,
    vendorEmails,
    showToast,
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
  };
}
