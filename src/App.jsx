import React, { useState, useEffect, useRef } from "react";
import LogoIaI from "./assets/Logo-IAmInterviewed-white.png" ;
import UserAvatar from "./assets/1.png"

// ==========================================================================
// Mock Database State & Constants
// ==========================================================================
const initialInvoices = [
  { id: "EXT-1001", vendor: "TCS", date: "2026-06-01", amount: 1450.50, status: "Submitted", validation: "Valid", created: "2026-06-04" },
  { id: "EXT-1002", vendor: "Infosys", date: "2026-06-03", amount: 980.00, status: "Processing", validation: "Invalid", created: "2026-06-04" },
  { id: "EXT-1003", vendor: "Wipro", date: "2026-05-28", amount: 4500.00, status: "Approved", validation: "Valid", created: "2026-05-29" },
  { id: "EXT-1004", vendor: "HCLTech", date: "2026-05-29", amount: 320.75, status: "Submitted", validation: "Valid", created: "2026-06-01" },
  { id: "EXT-1005", vendor: "TCS", date: "2026-06-02", amount: 890.00, status: "Processing", validation: "Valid", created: "2026-06-03" },
  { id: "EXT-1006", vendor: "Tech Mahindra", date: "2026-05-25", amount: 1200.00, status: "Submitted", validation: "Invalid", created: "2026-05-27" },
  { id: "EXT-1007", vendor: "LTIMindtree", date: "2026-06-01", amount: 15400.00, status: "Approved", validation: "Valid", created: "2026-06-02" },
  { id: "EXT-1008", vendor: "Infosys", date: "2026-05-30", amount: 75.50, status: "Processing", validation: "Valid", created: "2026-06-01" },
  { id: "EXT-1009", vendor: "Wipro", date: "2026-06-02", amount: 6200.00, status: "Submitted", validation: "Invalid", created: "2026-06-04" },
  { id: "EXT-1010", vendor: "Cognizant", date: "2026-05-15", amount: 9800.00, status: "Approved", validation: "Invalid", created: "2026-05-18" },
  { id: "EXT-1011", vendor: "Mphasis", date: "2026-06-03", amount: 24500.00, status: "Processing", validation: "Valid", created: "2026-06-04" },
  { id: "EXT-1012", vendor: "Persistent Systems", date: "2026-05-22", amount: 3750.25, status: "Approved", validation: "Valid", created: "2026-05-23" },
  { id: "EXT-1013", vendor: "Zoho Corporation", date: "2026-05-18", amount: 18500.00, status: "Submitted", validation: "Valid", created: "2026-05-20" },
  { id: "EXT-1014", vendor: "LTTS", date: "2026-05-20", amount: 640.00, status: "Processing", validation: "Invalid", created: "2026-05-21" },
  { id: "EXT-1015", vendor: "Tata Elxsi", date: "2026-06-01", amount: 8900.00, status: "Submitted", validation: "Valid", created: "2026-06-03" }
];

const vendorItems = {
  "TCS": [
    { desc: "AWS Infrastructure Hosting (May 2026)", qty: 1, price: 1000.00 },
    { desc: "DevOps Consulting Services", qty: 5, price: 90.10 }
  ],
  "Infosys": [
    { desc: "Office Supplies & Filing Folders", qty: 20, price: 15.00 },
    { desc: "Printer Toner Cartridges", qty: 4, price: 170.00 }
  ],
  "Wipro": [
    { desc: "Nucleus Platform Enterprise License", qty: 1, price: 4000.00 },
    { desc: "Premium Support SLA", qty: 1, price: 500.00 }
  ],
  "HCLTech": [
    { desc: "Anvil Shipments", qty: 2, price: 150.00 },
    { desc: "Tether Rope Bundle", qty: 1, price: 20.75 }
  ],
  "Tech Mahindra": [
    { desc: "Raw Organic Matter Processing", qty: 10, price: 120.00 }
  ],
  "LTIMindtree": [
    { desc: "Advanced Prototyping Alloys", qty: 2, price: 7000.00 },
    { desc: "Tactical Fabric Samples", qty: 4, price: 350.00 }
  ],
  "Cognizant": [
    { desc: "Viral Research Subscriptions", qty: 1, price: 9800.00 }
  ],
  "Mphasis": [
    { desc: "Replicant Maintenance Services", qty: 2, price: 12250.00 }
  ],
  "Persistent Systems": [
    { desc: "Quantum Telemetry Consulting", qty: 10, price: 375.025 }
  ],
  "Zoho Corporation": [
    { desc: "Corporate Restructuring Audits", qty: 1, price: 18500.00 }
  ],
  "LTTS": [
    { desc: "Confectionary Research Lab Supplies", qty: 4, price: 160.00 }
  ],
  "Tata Elxsi": [
    { desc: "Neural Net Processor Blueprints", qty: 1, price: 8900.00 }
  ]
};

const vendorEmails = {
  "TCS": "billing@tcs.com",
  "Infosys": "accounting@infosys.com",
  "Wipro": "accounts-payable@wipro.com",
  "HCLTech": "billing@hcltech.com",
  "Tech Mahindra": "finance@techmahindra.com",
  "LTIMindtree": "invoices@ltimindtree.com",
  "Cognizant": "ap@cognizant.com",
  "Mphasis": "nexus-billing@mphasis.com",
  "Persistent Systems": "finance@persistent.com",
  "Zoho Corporation": "billing@zoho.com",
  "LTTS": "treasury@ltts.com",
  "Tata Elxsi": "accounts@tataelxsi.com"
};

// ==========================================================================
// Subcomponent: AnimatedCounter
// Animates metric values smoothly over `duration` ms.
// ==========================================================================
const AnimatedCounter = ({ value, duration = 400 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    let startTimestamp = null;
    const start = prevValueRef.current;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        prevValueRef.current = end;
      }
    };
    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  return <>{displayValue}</>;
};

// Helper: formats dates exactly as vanilla (`formatDate`)
function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

export default function App() {
  // Database States
  const [invoices, setInvoices] = useState(initialInvoices);
  const [toasts, setToasts] = useState([]);

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
  // Form states for upload (stub modal, not normally opened via upload button unless we enable it)
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
  const validInvoicesCount = invoices.filter(inv => inv.validation === "Valid").length;
  const invalidInvoicesCount = invoices.filter(inv => inv.validation === "Invalid").length;

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
    // Resets filters or just forces refresh
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

  // Manual invoice submission form handler (stub modal functionality)
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

      <div className="dashboard-container">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <div className="brand">
            <img src={LogoIaI} className="logo-iai" />
          </div>

          <nav className="nav-links">
            <a href="#" className="nav-link">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-link active">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Invoices</span>
            </a>
            <a href="#" className="nav-link">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Clients</span>
            </a>
            <a href="#" className="nav-link">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span>Analytics</span>
            </a>
            <a href="#" className="nav-link">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Settings</span>
            </a>
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <img src={UserAvatar} alt="User Avatar" className="avatar" />
              <div className="user-info">
                <span className="user-name">Jahangir A</span>
                <span className="user-role">Finance Director</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="main-content">
          {/* Top Header */}
          <header className="header">
            <div className="header-title-area">
              <h1 className="page-title">List of Invoice</h1>
              <p className="page-subtitle">Manage, track, and validate your corporate invoice processing pipeline</p>
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

          {/* KPI Metrics Cards */}
          <section className="metrics-grid">
            <div className="metric-card card-primary">
              <div className="metric-header">
                <span className="metric-title">Total Invoices</span>
                <div className="metric-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className="metric-content">
                <span className="metric-value" id="kpiTotal">
                  <AnimatedCounter value={totalInvoicesCount} />
                </span>
                <span className="metric-change positive">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                  12% from last week
                </span>
              </div>
            </div>

            <div className="metric-card card-valid">
              <div className="metric-header">
                <span className="metric-title">Valid Invoices</span>
                <div className="metric-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <div className="metric-content">
                <span className="metric-value" id="kpiValid">
                  <AnimatedCounter value={validInvoicesCount} />
                </span>
                <span className="metric-label text-valid">No validation errors</span>
              </div>
            </div>

            <div className="metric-card card-invalid-kpi">
              <div className="metric-header">
                <span className="metric-title">Invalid Invoices</span>
                <div className="metric-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
              </div>
              <div className="metric-content">
                <span className="metric-value" id="kpiInvalid">
                  <AnimatedCounter value={invalidInvoicesCount} />
                </span>
                <span className="metric-label text-invalid">Requires attention</span>
              </div>
            </div>
          </section>

          {/* Main Panel: Invoices Table Panel */}
          <section className="invoice-panel">
            {/* Filter and Search Toolbar */}
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

            {/* Invoices Data Grid / Table */}
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
                    const amountFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(invoice.amount);

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
          </section>
        </main>
      </div>

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
      {isViewModalOpen && selectedInvoice && (() => {
        const invoice = selectedInvoice;
        const items = vendorItems[invoice.vendor] || [
          { desc: "General Consultation & Operations Services", qty: 1, price: invoice.amount }
        ];
        
        let subtotal = 0;
        items.forEach(item => {
          subtotal += item.qty * item.price;
        });
        const tax = subtotal * 0.1;
        const grandTotal = subtotal + tax;

        return (
          <div id="viewModal" className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header-premium">
                <div className="modal-header-title">
                  <span className="invoice-tag">INVOICE PREVIEW</span>
                  <h2 id="modalInvoiceId">{invoice.id}</h2>
                </div>
                <button className="btn-close" id="btnCloseModal" onClick={() => setIsViewModalOpen(false)}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <div className="invoice-details-header">
                  <div className="company-info">
                    <span className="corp-title">Antern Technologies</span>
                    <span className="corp-address">100 Ft Road, HRBR Layout,<br />Kalyan Nagar, Bangalore - 560 043.</span>
                  </div>
                  <div className="invoice-meta-info">
                    <div className="meta-row">
                      <span className="meta-label">Status:</span>
                      <span className={`meta-val badge badge-${invoice.status.toLowerCase()}`} id="modalStatus">
                        {invoice.status}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Validation:</span>
                      <span className={`meta-val validation-badge val-${invoice.validation.toLowerCase()}`} id="modalValidation">
                        <span className="val-dot"></span>{invoice.validation}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Date Issued:</span>
                      <span className="meta-val" id="modalDate">{formatDate(invoice.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="invoice-bill-to">
                  <h4>Billed To:</h4>
                  <p className="bill-vendor" id="modalVendor">{invoice.vendor}</p>
                  <p className="bill-address">123 HRBR Layout,<br />Kalyan Nagar, Bangalore - 560 043</p>
                </div>

                <div className="invoice-items-table-wrapper">
                  <table className="invoice-items-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th className="text-right">Qty</th>
                        <th className="text-right">Unit Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody id="modalInvoiceItems">
                      {items.map((item, idx) => {
                        const itemTotal = item.qty * item.price;
                        return (
                          <tr key={idx}>
                            <td>{item.desc}</td>
                            <td className="text-right">{item.qty}</td>
                            <td className="text-right">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</td>
                            <td className="text-right">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(itemTotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="invoice-summary-section">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span id="modalSubtotal">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%)</span>
                    <span id="modalTax">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(tax)}</span>
                  </div>
                  <div className="summary-row grand-total">
                    <span>Grand Total</span>
                    <span id="modalGrandTotal">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" id="btnCloseModalFooter" onClick={() => setIsViewModalOpen(false)}>Close</button>
                <button className="btn btn-primary" id="btnDownloadPDF" onClick={handleDownloadPDF}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Upload Invoice Modal (Stub display, could be triggered if we want to expose manually) */}
      {isUploadModalOpen && (
        <div id="uploadModal" className="modal-overlay">
          <div className="modal-card modal-medium">
            <div className="modal-header">
              <h2>Upload New Invoice</h2>
              <button className="btn-close" id="btnCloseUploadModal" onClick={() => setIsUploadModalOpen(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form id="uploadForm" onSubmit={handleManualUploadSubmit}>
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
                <button type="button" className="btn btn-secondary" id="btnCancelUpload" onClick={() => setIsUploadModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Notification Modal */}
      {isNotificationModalOpen && selectedInvoice && (
        <div id="notificationModal" className="modal-overlay">
          <div className="modal-card modal-medium">
            <div className="modal-header-premium" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)" }}>
              <div className="modal-header-title">
                <span className="invoice-tag" style={{ color: "var(--secondary)" }}>ACTION ALERT</span>
                <h2>Send Vendor Alert</h2>
              </div>
              <button className="btn-close" id="btnCloseNotificationModal" onClick={() => setIsNotificationModalOpen(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form id="notificationForm" onSubmit={handleNotificationSubmit}>
              <div className="modal-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="notifVendor">Vendor</label>
                    <input 
                      type="text" 
                      id="notifVendor" 
                      readOnly 
                      value={selectedInvoice.vendor}
                      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-muted)", cursor: "not-allowed" }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="notifInvoiceId">Invoice #</label>
                    <input 
                      type="text" 
                      id="notifInvoiceId" 
                      readOnly 
                      value={selectedInvoice.id}
                      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-muted)", cursor: "not-allowed" }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notifTo">To (Vendor Email)</label>
                  <input 
                    type="email" 
                    id="notifTo" 
                    required 
                    placeholder="e.g. billing@vendor.com"
                    value={notifForm.to}
                    onChange={(e) => setNotifForm(prev => ({ ...prev, to: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notifSubject">Subject</label>
                  <input 
                    type="text" 
                    id="notifSubject" 
                    required 
                    placeholder="Alert Subject"
                    value={notifForm.subject}
                    onChange={(e) => setNotifForm(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notifMessage">Message to Vendor</label>
                  <textarea 
                    id="notifMessage" 
                    required 
                    rows="5" 
                    placeholder="Enter alert message details..." 
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-family-sans)",
                      resize: "vertical"
                    }}
                    value={notifForm.message}
                    onChange={(e) => setNotifForm(prev => ({ ...prev, message: e.target.value }))}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" id="btnCancelNotification" onClick={() => setIsNotificationModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "var(--primary)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
